export default function DroneFlight({ className = "" }) {
  return (
    <svg className={`drone-flight ${className}`} viewBox="0 0 220 118" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g className="drone-flight-body">
        <line x1="72" y1="62" x2="28" y2="38" /><line x1="148" y1="62" x2="192" y2="38" /><line x1="72" y1="62" x2="28" y2="88" /><line x1="148" y1="62" x2="192" y2="88" />
        <ellipse cx="28" cy="38" rx="22" ry="4.5" /><ellipse cx="192" cy="38" rx="22" ry="4.5" /><ellipse cx="28" cy="88" rx="22" ry="4.5" /><ellipse cx="192" cy="88" rx="22" ry="4.5" />
        <rect x="66" y="50" width="88" height="26" rx="10" /><rect className="drone-body-line" x="66" y="50" width="88" height="26" rx="10" /><rect x="99" y="76" width="22" height="12" rx="4" /><circle cx="110" cy="82" r="3.5" /><rect x="107" y="88" width="7" height="10" rx="2" /><circle className="drone-light" cx="76" cy="63" r="2.5" /><circle className="drone-light cool" cx="144" cy="63" r="2.5" />
      </g>
      <path className="drone-flight-path" d="M6 94C54 92 65 42 113 55s55 36 101-25" />
    </svg>
  );
}
