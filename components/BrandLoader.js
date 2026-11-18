// On-brand loading screen: framed БОГMODE wordmark with a scan line and a ticking readout. CSS only.
export default function BrandLoader({ label = "LOADING" }) {
  return (
    <div className="brand-loader" role="status" aria-live="polite">
      <div className="brand-loader-frame" aria-hidden="true">
        <span className="bl-corner tl" /><span className="bl-corner tr" /><span className="bl-corner bl" /><span className="bl-corner br" />
        <span className="bl-scan" />
        <span className="bl-word"><span className="cy">БОГ</span>MODE</span>
      </div>
      <span className="bl-label">{label}<span className="bl-dots" aria-hidden="true" /></span>
    </div>
  );
}
