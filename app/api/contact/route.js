import { Resend } from "resend";

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) return Response.json({ error: "Bad request." }, { status: 400 });

  const { name = "", email = "", message = "", company_site = "" } = body;

  // Honeypot: silently accept and drop.
  if (company_site) return Response.json({ ok: true });

  const clean = (s, max) => String(s).trim().slice(0, max);
  const n = clean(name, 120);
  const e = clean(email, 200);
  const m = clean(message, 4000);

  if (!n || !m || m.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
    return Response.json({ error: "Fill in name, a real email, and a message." }, { status: 422 });
  }

  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) {
    return Response.json(
      { error: "Please email me directly; online sending is unavailable." },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      replyTo: e,
      subject: `[bogmode.ca] ${n}`,
      text: `From: ${n} <${e}>\n\n${m}`,
    });
    if (error) throw new Error(error.message || "Send failed.");
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact delivery failed.");
    return Response.json({ error: "Could not send — email direct instead." }, { status: 502 });
  }
}
