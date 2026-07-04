// HUD-framed photo slot. When `src` is empty it renders a placeholder panel
// telling you where to drop the file — upload via /keystatic (Site → photos)
// or put a file in public/photos/ and set the path in content/site.json.
import Crosshair from "./Crosshair";

export default function PhotoFrame({ src, alt = "", label = "PHOTO", ratio = "4 / 5" }) {
  return (
    <figure className="photo" style={{ aspectRatio: ratio }}>
      <span className="pf-corner tl" /><span className="pf-corner tr" />
      <span className="pf-corner bl" /><span className="pf-corner br" />
      {src ? (
        // Plain <img>: files live in public/, no remote loader needed.
        <img src={src} alt={alt} loading="lazy" />
      ) : (
        <div className="photo-empty">
          <Crosshair size={26} />
          <span className="pe-label">{label}</span>
          <span className="pe-hint">UPLOAD VIA /KEYSTATIC → SITE</span>
        </div>
      )}
      <figcaption className="photo-cap">{label}</figcaption>
    </figure>
  );
}
