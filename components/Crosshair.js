export default function Crosshair({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" aria-hidden="true" style={{ display: "block" }}>
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <line x1="12" y1="1.5" x2="12" y2="5.5" />
      <line x1="12" y1="18.5" x2="12" y2="22.5" />
      <line x1="1.5" y1="12" x2="5.5" y2="12" />
      <line x1="18.5" y1="12" x2="22.5" y2="12" />
    </svg>
  );
}
