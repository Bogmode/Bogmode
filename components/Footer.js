import Link from "next/link";

export default function Footer({ site }) {
  const { links = {}, contact = {} } = site || {};
  return (
    <footer id="contact">
      <div className="foot-in">
        <div className="links">
          {links.linkedin && <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
          {links.youtube && <a href={links.youtube} target="_blank" rel="noreferrer">YouTube</a>}
          {links.github && <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>}
          {contact.email && <a href={`mailto:${contact.email}`}>Email</a>}
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy & cookies</Link>
          <Link href="/terms">Site terms</Link>
        </div>
        <div className="signoff">БОГMODE · bogmode.ca — built by hand</div>
      </div>
    </footer>
  );
}
