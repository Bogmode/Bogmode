import Link from "next/link";
import Crosshair from "./Crosshair";

export default function Nav() {
  return (
    <nav>
      <div className="nav-in">
        <Link href="/" className="mark">
          <span className="xh"><Crosshair size={15} /></span>
          <span><span className="cy">БОГ</span>MODE</span>
        </Link>
        <div className="nav-links">
          <Link href="/systems">SYSTEMS</Link>
          <Link href="/playground">PLAYGROUND</Link>
          <Link href="/about">ABOUT</Link>
          <Link href="/contact">CONTACT</Link>
        </div>
        <div className="stat"><span className="xh"><Crosshair size={13} /></span>OPERATIONAL</div>
      </div>
    </nav>
  );
}
