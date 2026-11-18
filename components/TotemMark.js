import { TOTEMS } from "./totems";

// Small line-art totem drawn from the same silhouettes the hero core gathers into.
export default function TotemMark({ totem = "wolf", size = 40, className = "" }) {
  const pts = (TOTEMS[totem] || TOTEMS.wolf).map(([x, y]) => `${x},${y}`).join(" ");
  return (
    <svg className={`totem-mark ${className}`} width={size} height={size} viewBox="-4 -4 108 108" aria-hidden="true">
      <polygon points={pts} />
    </svg>
  );
}
