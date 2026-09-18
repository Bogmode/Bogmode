"use client";

import { useMemo, useRef, useState } from "react";
import Script from "next/script";
import styles from "./GmailOutreachStudio.module.css";

const MAX_RECIPIENTS = 25;
const MAX_ATTACHMENT_BYTES = 18 * 1024 * 1024;
const DEFAULT_SUBJECT = "A practical idea for $company";
const DEFAULT_TEXT = `Hi $first_name,

I noticed the work $company is doing and wanted to reach out with one focused idea.

[Write the useful, specific reason for contacting this person here.]

Worth a short conversation?

Bogdan`;
const DEFAULT_HTML = `<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#17171b;line-height:1.6">
  <p>Hi <strong>$first_name</strong>,</p>
  <p>I noticed the work <strong>$company</strong> is doing and wanted to reach out with one focused idea.</p>
  <div style="border-left:3px solid #ff5a1f;padding:12px 16px;margin:24px 0;background:#f7f6f2">
    Write the useful, specific reason for contacting this person here.
  </div>
  <p>Worth a short conversation?</p>
  <p>— Bogdan</p>
</div>`;

function parseCsv(source) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell);
  if (row.some((value) => value.trim())) rows.push(row);
  if (rows.length < 2) return [];

  const headers = rows[0].map((header) =>
    header.trim().toLowerCase().replace(/^\ufeff/, "").replace(/[\s-]+/g, "_")
  );

  return rows.slice(1).map((values, rowIndex) => {
    const record = { id: `csv-${Date.now()}-${rowIndex}` };
    headers.forEach((header, index) => {
      if (header) record[header] = (values[index] || "").trim();
    });
    return record;
  });
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function recipientValues(recipient) {
  const name = recipient.name || recipient.first_name || "there";
  return {
    ...recipient,
    name,
    first_name: recipient.first_name || name.split(/\s+/)[0] || "there",
    company: recipient.company || "your team",
    email: recipient.email || "",
  };
}

function renderTemplate(template, recipient, html = false) {
  const values = recipientValues(recipient);
  return template.replace(/\{\{\s*([\w-]+)\s*\}\}|\$([a-zA-Z_][\w-]*)/g, (match, bracesKey, dollarKey) => {
    const key = bracesKey || dollarKey;
    if (!(key in values)) return match;
    return html ? escapeHtml(values[key]) : String(values[key]);
  });
}

function bytesToBase64(bytes) {
  let binary = "";
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }
  return btoa(binary);
}

function utf8Base64(value) {
  return bytesToBase64(new TextEncoder().encode(value));
}

function wrapBase64(value) {
  return value.match(/.{1,76}/g)?.join("\r\n") || "";
}

function safeFileName(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

function safeHeader(value) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

async function buildMime({ recipient, subject, textBody, htmlBody, files }) {
  const mixedBoundary = `mixed-${crypto.randomUUID()}`;
  const altBoundary = `alternative-${crypto.randomUUID()}`;
  const renderedSubject = renderTemplate(recipient.subject || subject, recipient);
  const renderedText = renderTemplate(recipient.body || textBody, recipient);
  const renderedHtml = renderTemplate(recipient.html || htmlBody, recipient, true);
  const headers = [
    `To: ${recipient.email}`,
    `Subject: =?UTF-8?B?${utf8Base64(safeHeader(renderedSubject))}?=`,
    "MIME-Version: 1.0",
  ];
  const parts = [];

  if (files.length) {
    headers.push(`Content-Type: multipart/mixed; boundary="${mixedBoundary}"`);
    parts.push(`--${mixedBoundary}`);
    if (renderedHtml.trim()) parts.push(`Content-Type: multipart/alternative; boundary="${altBoundary}"`, "");
  } else if (renderedHtml.trim()) {
    headers.push(`Content-Type: multipart/alternative; boundary="${altBoundary}"`);
  } else {
    headers.push('Content-Type: text/plain; charset="UTF-8"', "Content-Transfer-Encoding: base64");
  }

  if (renderedHtml.trim()) {
    parts.push(`--${altBoundary}`, 'Content-Type: text/plain; charset="UTF-8"', "Content-Transfer-Encoding: base64", "", wrapBase64(utf8Base64(renderedText)));
    parts.push(`--${altBoundary}`, 'Content-Type: text/html; charset="UTF-8"', "Content-Transfer-Encoding: base64", "", wrapBase64(utf8Base64(renderedHtml)));
    parts.push(`--${altBoundary}--`);
  } else if (files.length) {
    parts.push('Content-Type: text/plain; charset="UTF-8"', "Content-Transfer-Encoding: base64", "", wrapBase64(utf8Base64(renderedText)));
  } else {
    parts.push(wrapBase64(utf8Base64(renderedText)));
  }

  for (const file of files) {
    const attachment = bytesToBase64(new Uint8Array(await file.arrayBuffer()));
    parts.push(
      `--${mixedBoundary}`,
      `Content-Type: ${file.type || "application/octet-stream"}; name="${safeFileName(file.name)}"`,
      "Content-Transfer-Encoding: base64",
      `Content-Disposition: attachment; filename="${safeFileName(file.name)}"`,
      "",
      wrapBase64(attachment)
    );
  }

  if (files.length) parts.push(`--${mixedBoundary}--`);
  return `${headers.join("\r\n")}\r\n\r\n${parts.join("\r\n")}`;
}

function makePreviewDocument(html) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: cid:; style-src 'unsafe-inline'"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:24px;background:#fff">${html}</body></html>`;
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export default function GmailOutreachStudio() {
  const [recipients, setRecipients] = useState([]);
  const [manual, setManual] = useState({ email: "", name: "", company: "" });
  const [subject, setSubject] = useState(DEFAULT_SUBJECT);
  const [textBody, setTextBody] = useState(DEFAULT_TEXT);
  const [htmlBody, setHtmlBody] = useState(DEFAULT_HTML);
  const [files, setFiles] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dryRun, setDryRun] = useState(true);
  const [rateSeconds, setRateSeconds] = useState(20);
  const [reviewed, setReviewed] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [activity, setActivity] = useState(["Ready. Nothing has been sent."]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState({ sent: 0, total: 0 });
  const stopRequested = useRef(false);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  const selected = recipients[selectedIndex] || { email: "preview@example.com", name: "Alex Morgan", company: "Example Co." };
  const attachmentBytes = files.reduce((sum, file) => sum + file.size, 0);
  const issues = useMemo(() => {
    const list = [];
    if (!recipients.length) list.push("Add at least one recipient.");
    if (recipients.length > MAX_RECIPIENTS) list.push(`Keep the campaign to ${MAX_RECIPIENTS} recipients or fewer.`);
    const invalid = recipients.filter((recipient) => !isValidEmail(recipient.email));
    if (invalid.length) list.push(`${invalid.length} recipient${invalid.length === 1 ? " has" : "s have"} an invalid email address.`);
    const seen = new Set();
    const duplicates = new Set();
    recipients.forEach((recipient) => {
      const email = (recipient.email || "").toLowerCase();
      if (email && seen.has(email)) duplicates.add(email);
      seen.add(email);
    });
    if (duplicates.size) list.push(`${duplicates.size} duplicate email address${duplicates.size === 1 ? "" : "es"} found.`);
    const missingSubjects = recipients.length ? recipients.some((recipient) => !(recipient.subject || subject).trim()) : !subject.trim();
    const missingBodies = recipients.length ? recipients.some((recipient) => !(recipient.body || textBody).trim() && !(recipient.html || htmlBody).trim()) : !textBody.trim() && !htmlBody.trim();
    if (missingSubjects) list.push("Write a subject line for every recipient.");
    if (missingBodies) list.push("Write a message body for every recipient.");
    if (attachmentBytes > MAX_ATTACHMENT_BYTES) list.push("Attachments exceed the 18 MiB safety limit.");
    return list;
  }, [recipients, subject, textBody, htmlBody, attachmentBytes]);

  const renderedSubject = renderTemplate(selected.subject || subject, selected);
  const renderedText = renderTemplate(selected.body || textBody, selected);
  const renderedHtml = renderTemplate(selected.html || htmlBody, selected, true);
  const command = `SEND ${recipients.length}`;
  const liveReady = !dryRun && !issues.length && reviewed && confirmation === command && accessToken;

  function addLog(message) {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setActivity((current) => [`${time} — ${message}`, ...current].slice(0, 12));
  }

  function addManualRecipient(event) {
    event.preventDefault();
    if (!manual.email.trim()) return;
    if (recipients.length >= MAX_RECIPIENTS) {
      addLog(`Recipient cap reached (${MAX_RECIPIENTS}).`);
      return;
    }
    setRecipients((current) => [...current, { id: crypto.randomUUID(), ...manual, email: manual.email.trim() }]);
    setManual({ email: "", name: "", company: "" });
    addLog("Recipient added locally.");
  }

  async function importRecipients(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const parsed = parseCsv(await file.text());
    if (!parsed.length || !Object.prototype.hasOwnProperty.call(parsed[0], "email")) {
      addLog("CSV rejected: include an email header and at least one data row.");
      event.target.value = "";
      return;
    }
    const next = parsed.slice(0, MAX_RECIPIENTS);
    setRecipients(next);
    setSelectedIndex(0);
    setReviewed(false);
    setConfirmation("");
    addLog(`Loaded ${next.length} recipient${next.length === 1 ? "" : "s"} from ${file.name}.`);
    if (parsed.length > MAX_RECIPIENTS) addLog(`Only the first ${MAX_RECIPIENTS} rows were loaded.`);
    event.target.value = "";
  }

  function loadDemo() {
    setRecipients([
      { id: crypto.randomUUID(), email: "alex@example.com", first_name: "Alex", company: "Northstar Labs" },
      { id: crypto.randomUUID(), email: "sam@example.com", first_name: "Sam", company: "Fieldwork Studio" },
    ]);
    setSelectedIndex(0);
    setReviewed(false);
    setConfirmation("");
    addLog("Loaded two safe example.com recipients. Demo only.");
  }

  function downloadCsvTemplate() {
    const template = "email,first_name,company,subject,body,html\n";
    const url = URL.createObjectURL(new Blob([template], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "bogmode-outreach-template.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    addLog("Downloaded the CSV starter template.");
  }

  function removeRecipient(index) {
    setRecipients((current) => current.filter((_, itemIndex) => itemIndex !== index));
    setSelectedIndex(0);
    setReviewed(false);
    setConfirmation("");
  }

  function chooseAttachments(event) {
    const next = [...event.target.files].slice(0, 8);
    setFiles(next);
    addLog(`${next.length} attachment${next.length === 1 ? "" : "s"} staged locally.`);
    event.target.value = "";
  }

  function runDryCheck() {
    setDryRun(true);
    if (issues.length) {
      addLog(`Dry run stopped: ${issues[0]}`);
      return;
    }
    addLog(`Dry run passed for ${recipients.length} recipient${recipients.length === 1 ? "" : "s"}. Zero emails sent.`);
  }

  async function downloadEml() {
    const mime = await buildMime({ recipient: selected, subject, textBody, htmlBody, files });
    const url = URL.createObjectURL(new Blob([mime], { type: "message/rfc822" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${safeFileName(renderedSubject || "message")}.eml`;
    anchor.click();
    URL.revokeObjectURL(url);
    addLog(`Downloaded a local .eml draft for ${selected.email}.`);
  }

  function connectGmail() {
    if (!clientId) {
      addLog("Gmail OAuth is not configured on this deployment yet.");
      return;
    }
    if (!window.google?.accounts?.oauth2) {
      addLog("Google sign-in is still loading. Try again in a moment.");
      return;
    }
    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "https://www.googleapis.com/auth/gmail.send",
      callback: (response) => {
        if (response.error) {
          addLog(`Gmail connection failed: ${response.error}.`);
          return;
        }
        setAccessToken(response.access_token);
        addLog("Gmail connected for this browser session only.");
      },
    });
    tokenClient.requestAccessToken({ prompt: accessToken ? "" : "consent" });
  }

  async function sendCampaign() {
    if (!liveReady || busy) return;
    const approved = window.confirm(`Send ${recipients.length} real email${recipients.length === 1 ? "" : "s"} now? This cannot be undone.`);
    if (!approved) {
      addLog("Live send cancelled. Nothing sent.");
      return;
    }

    setBusy(true);
    stopRequested.current = false;
    setProgress({ sent: 0, total: recipients.length });
    addLog("Live send started.");

    try {
      for (let index = 0; index < recipients.length; index += 1) {
        if (stopRequested.current) {
          addLog("Send stopped by operator.");
          break;
        }
        const recipient = recipients[index];
        const mime = await buildMime({ recipient, subject, textBody, htmlBody, files });
        const raw = bytesToBase64(new TextEncoder().encode(mime)).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
        const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
          body: JSON.stringify({ raw }),
        });
        if (!response.ok) {
          const detail = await response.json().catch(() => ({}));
          throw new Error(detail.error?.message || `Gmail returned ${response.status}`);
        }
        setProgress({ sent: index + 1, total: recipients.length });
        addLog(`Sent ${index + 1}/${recipients.length} to ${recipient.email}.`);
        if (index < recipients.length - 1) await wait(rateSeconds * 1000);
      }
    } catch (error) {
      addLog(`Send halted: ${error.message}.`);
    } finally {
      setBusy(false);
      setDryRun(true);
      setReviewed(false);
      setConfirmation("");
    }
  }

  const gmailDraftUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(selected.email)}&su=${encodeURIComponent(renderedSubject)}&body=${encodeURIComponent(renderedText)}`;

  return (
    <div className={styles.studio}>
      {clientId && <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />}
      <div className={styles.systemBar}>
        <div><span className={styles.signal} />CAMPAIGN SYSTEM / LOCAL-FIRST</div>
        <div>{recipients.length.toString().padStart(2, "0")} / {MAX_RECIPIENTS} RECIPIENTS</div>
        <div className={styles.safe}>● SAFE MODE {dryRun ? "ON" : "OFF"}</div>
      </div>

      <div className={styles.workflow} aria-label="Campaign workflow">
        <span><b>01</b> Load</span><i />
        <span><b>02</b> Write</span><i />
        <span><b>03</b> Check</span><i />
        <span><b>04</b> Send</span>
      </div>

      <section className={styles.section} aria-labelledby="load-title">
        <div className={styles.sectionHead}>
          <div><span>01 / LOAD</span><h2 id="load-title">Who is this for?</h2></div>
          <p>Nothing leaves your browser.</p>
        </div>
        <div className={styles.twoCol}>
          <div className={styles.card}>
            <label className={styles.dropZone}>
              <input type="file" accept=".csv,text/csv" onChange={importRecipients} />
              <strong>IMPORT CSV</strong>
              <span>Required: email · Optional: first_name, company, subject, body, html</span>
            </label>
            <div className={styles.templateActions}>
              <button className={styles.textButton} type="button" onClick={loadDemo}>LOAD SAFE DEMO →</button>
              <button className={styles.textButton} type="button" onClick={downloadCsvTemplate}>DOWNLOAD CSV TEMPLATE ↓</button>
            </div>
          </div>
          <form className={styles.card} onSubmit={addManualRecipient}>
            <div className={styles.cardLabel}>ADD ONE PERSON</div>
            <div className={styles.compactFields}>
              <label>Email<input type="email" value={manual.email} onChange={(event) => setManual({ ...manual, email: event.target.value })} placeholder="person@company.com" required /></label>
              <label>First name<input value={manual.name} onChange={(event) => setManual({ ...manual, name: event.target.value })} placeholder="Alex" /></label>
              <label>Company<input value={manual.company} onChange={(event) => setManual({ ...manual, company: event.target.value })} placeholder="Company" /></label>
            </div>
            <button className={styles.secondaryButton} type="submit">ADD RECIPIENT</button>
          </form>
        </div>

        <div className={styles.recipientTable}>
          <div className={styles.tableHead}><span>RECIPIENT</span><span>COMPANY</span><span>STATUS</span><span /></div>
          {recipients.length ? recipients.map((recipient, index) => (
            <div className={`${styles.recipientRow} ${index === selectedIndex ? styles.selected : ""}`} key={recipient.id}>
              <button className={styles.recipientSelect} type="button" onClick={() => setSelectedIndex(index)} aria-label={`Preview ${recipient.email}`}>
                <span><b>{recipient.first_name || recipient.name || "Unnamed"}</b><small>{recipient.email}</small></span>
                <span>{recipient.company || "—"}</span>
                <span className={isValidEmail(recipient.email) ? styles.valid : styles.invalid}>{isValidEmail(recipient.email) ? "READY" : "CHECK"}</span>
              </button>
              <button className={styles.remove} type="button" aria-label={`Remove ${recipient.email}`} onClick={() => removeRecipient(index)}>×</button>
            </div>
          )) : <div className={styles.empty}>NO RECIPIENTS LOADED</div>}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="write-title">
        <div className={styles.sectionHead}>
          <div><span>02 / WRITE</span><h2 id="write-title">Build the message.</h2></div>
          <p>Use <code>$first_name</code>, <code>$company</code>, or any CSV column.</p>
        </div>
        <div className={styles.composeGrid}>
          <div className={styles.editor}>
            <label>SUBJECT<input value={subject} onChange={(event) => setSubject(event.target.value)} /></label>
            <label>PLAIN-TEXT FALLBACK<textarea rows="9" value={textBody} onChange={(event) => setTextBody(event.target.value)} /></label>
            <label>HTML LAYOUT<textarea className={styles.codeArea} rows="13" value={htmlBody} onChange={(event) => setHtmlBody(event.target.value)} spellCheck="false" /></label>
            <div className={styles.attachments}>
              <label className={styles.attachmentButton}>+ ADD ATTACHMENTS<input type="file" multiple onChange={chooseAttachments} /></label>
              <span>{(attachmentBytes / 1024 / 1024).toFixed(2)} / 18 MiB</span>
            </div>
            {files.length > 0 && <ul className={styles.fileList}>{files.map((file, index) => <li key={`${file.name}-${index}`}><span>{file.name}</span><button type="button" onClick={() => setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index))}>REMOVE</button></li>)}</ul>}
          </div>

          <div className={styles.previewPane}>
            <div className={styles.previewHead}><span>LIVE PREVIEW</span><span>{selectedIndex + 1} / {Math.max(recipients.length, 1)}</span></div>
            <div className={styles.previewMeta}><span>TO</span><b>{selected.email}</b><span>SUBJECT</span><b>{renderedSubject}</b></div>
            {renderedHtml.trim() ? <iframe title="Rendered email preview" sandbox="" srcDoc={makePreviewDocument(renderedHtml)} /> : <pre>{renderedText}</pre>}
            <div className={styles.previewNav}>
              <button type="button" onClick={() => setSelectedIndex((current) => Math.max(0, current - 1))} disabled={selectedIndex === 0}>← PREVIOUS</button>
              <button type="button" onClick={() => setSelectedIndex((current) => Math.min(recipients.length - 1, current + 1))} disabled={!recipients.length || selectedIndex >= recipients.length - 1}>NEXT →</button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="check-title">
        <div className={styles.sectionHead}>
          <div><span>03 / CHECK</span><h2 id="check-title">Inspect before action.</h2></div>
          <p>Dry-run never sends.</p>
        </div>
        <div className={styles.checkGrid}>
          <div className={styles.issuePanel} data-ready={!issues.length}>
            <div className={styles.cardLabel}>{issues.length ? `${issues.length} ISSUE${issues.length === 1 ? "" : "S"}` : "ALL CHECKS PASSED"}</div>
            {issues.length ? <ul>{issues.map((issue) => <li key={issue}>{issue}</li>)}</ul> : <p>Addresses, duplicates, message content, campaign size, and attachments look ready.</p>}
          </div>
          <div className={styles.draftActions}>
            <button className={styles.primaryButton} type="button" onClick={runDryCheck}>RUN DRY CHECK</button>
            <button className={styles.secondaryButton} type="button" onClick={downloadEml}>DOWNLOAD CURRENT .EML</button>
            <a className={styles.secondaryButton} href={gmailDraftUrl} target="_blank" rel="noreferrer">OPEN CURRENT IN GMAIL ↗</a>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sendSection}`} aria-labelledby="send-title">
        <div className={styles.sectionHead}>
          <div><span>04 / SEND</span><h2 id="send-title">Deliberate by design.</h2></div>
          <p>One last human checkpoint.</p>
        </div>
        <div className={styles.sendGrid}>
          <div className={styles.safetyPanel}>
            <label className={styles.switchRow}>
              <span><b>DRY-RUN MODE</b><small>Keep this on while preparing and testing.</small></span>
              <input type="checkbox" checked={dryRun} onChange={(event) => { setDryRun(event.target.checked); setConfirmation(""); }} />
            </label>
            <label className={styles.switchRow}>
              <span><b>RECIPIENTS REVIEWED</b><small>I have a legitimate reason to contact each person.</small></span>
              <input type="checkbox" checked={reviewed} onChange={(event) => setReviewed(event.target.checked)} />
            </label>
            <label className={styles.rate}>SECONDS BETWEEN EMAILS<input type="number" min="10" max="120" value={rateSeconds} onChange={(event) => setRateSeconds(Math.min(120, Math.max(10, Number(event.target.value) || 10)))} /></label>
            {!dryRun && <label className={styles.confirm}>TYPE <b>{command}</b> TO UNLOCK<input value={confirmation} onChange={(event) => setConfirmation(event.target.value)} autoComplete="off" /></label>}
          </div>
          <div className={styles.connectionPanel}>
            <div className={styles.cardLabel}>GMAIL CONNECTION</div>
            <p>{clientId ? (accessToken ? "Connected for this session. The access token is kept in memory only." : "Connect with Google's OAuth window. No Gmail password is stored.") : "OAuth-ready. Add NEXT_PUBLIC_GOOGLE_CLIENT_ID to enable direct sending on this deployment."}</p>
            <button className={styles.secondaryButton} type="button" onClick={connectGmail} disabled={!clientId || busy}>{accessToken ? "RECONNECT GMAIL" : "CONNECT GMAIL"}</button>
            {busy ? <button className={styles.stopButton} type="button" onClick={() => { stopRequested.current = true; }}>STOP AFTER CURRENT EMAIL</button> : <button className={styles.sendButton} type="button" disabled={!liveReady} onClick={sendCampaign}>SEND {recipients.length || 0} REAL EMAIL{recipients.length === 1 ? "" : "S"}</button>}
            <div className={styles.progress} aria-live="polite"><span style={{ width: `${progress.total ? (progress.sent / progress.total) * 100 : 0}%` }} />{progress.total ? `${progress.sent} / ${progress.total} SENT` : "NO LIVE SEND STARTED"}</div>
          </div>
        </div>
      </section>

      <aside className={styles.log} aria-live="polite">
        <div className={styles.logHead}><span>ACTIVITY LOG</span><span>LOCAL SESSION</span></div>
        {activity.map((entry, index) => <div key={`${entry}-${index}`}>{entry}</div>)}
      </aside>
    </div>
  );
}
