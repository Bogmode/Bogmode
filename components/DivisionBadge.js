import Link from "next/link";
import TotemMark from "./TotemMark";

export default function DivisionBadge({ division }) {
  if (!division) return null;
  return (
    <Link href={`/divisions/${division.slug}`} className="division-badge">
      <TotemMark totem={division.totem} size={22} />
      <span>PART OF <b>{division.name.toUpperCase()}</b></span>
    </Link>
  );
}
