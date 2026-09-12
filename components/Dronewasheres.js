import DroneFlight from "./DroneFlight";

export default function Dronewasheres({ url }) {
  return (
    <aside className="drone-feature" aria-labelledby="drone-title">
      <div className="drone-viewfinder" aria-hidden="true">
        <DroneFlight />
        <span className="drone-format">DRONE / CLEANING / CONCEPT</span>
      </div>
      <div className="drone-copy">
        <span className="drone-kicker">PART OF БОГMODE</span>
        <h2 id="drone-title">DroneWashers</h2>
        <p>A drone-cleaning service website concept. Explore the brand, services, and interactive quote journey.</p>
        {url ? <a className="action secondary" href={url}>EXPLORE DRONEWASHERS →</a> : <span className="drone-pending">PROJECT LINK COMING SOON</span>}
      </div>
    </aside>
  );
}
