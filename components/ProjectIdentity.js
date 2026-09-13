import DroneFlight from "./DroneFlight";
export default function ProjectIdentity({ kind }) {
  if (kind === "upstreams") return <div className="project-art upstream-art" aria-hidden="true"><span>Upstreams</span><small>WASTE → POSSIBILITY</small><div className="upstream-flow"><i /><i /><i /></div></div>;
  if (kind === "fiend") return <div className="project-art fiend-art" aria-hidden="true"><span>Fiend<b>.</b></span><small>NOTICE THE PATTERN.</small><div className="fiend-bars"><i /><i /><i /><i /><i /><i /><i /></div></div>;
  if (kind === "dronewashers") return <div className="project-art drone-placeholder-art" aria-hidden="true"><span>A cleaner approach.</span><small>DRONE / CLEANING / CONCEPT</small><DroneFlight /></div>;
  return null;
}
