"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Crosshair from "./Crosshair";

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main navigation">
      <div className="nav-in">
        <Link href="/" className="mark">
          <span className="xh"><Crosshair size={15} /></span>
          <span><span className="cy">БОГ</span>MODE</span>
        </Link>
        <div className="nav-links">
          <Link href="/systems" aria-current={pathname === "/systems" || pathname.startsWith("/systems/") ? "page" : undefined}>WORK</Link>
          <Link href="/about" aria-current={pathname === "/about" || pathname.startsWith("/about/") ? "page" : undefined}>ABOUT</Link>
          <Link href="/contact" aria-current={pathname === "/contact" || pathname.startsWith("/contact/") ? "page" : undefined}>CONTACT</Link>
        </div>
        <div className="stat"><span className="xh"><Crosshair size={13} /></span>OPERATIONAL</div>
      </div>
    </nav>
  );
}
