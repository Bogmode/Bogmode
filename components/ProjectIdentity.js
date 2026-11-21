import DroneFlight from "./DroneFlight";
import TotemMark from "./TotemMark";

const DIVISION_TOTEM = { swarm: "wolf", worlds: "dragon", lab: "hare", tools: "bear", ventures: "manticore" };

// Card art per project: colour, wordmark, tagline, one motif. Falls back to the division totem.
export default function ProjectIdentity({ kind, title, division, banner = false, thumb = false }) {
  const cls = (name) => `project-art ${name}${banner ? " project-art-banner" : ""}${thumb ? " project-art-thumb" : ""}`;

  if (kind === "upstreams") return <div className={cls("upstream-art")} aria-hidden="true"><span>Upstreams</span><small>WASTE → POSSIBILITY</small><div className="upstream-flow"><i /><i /><i /></div></div>;
  if (kind === "fiend") return <div className={cls("fiend-art")} aria-hidden="true"><span>Fiend<b>.</b></span><small>NOTICE THE PATTERN.</small><div className="fiend-bars"><i /><i /><i /><i /><i /><i /><i /></div></div>;
  if (kind === "dronewashers") return <div className={cls("drone-placeholder-art")} aria-hidden="true"><span>A cleaner approach.</span><small>DRONE / CLEANING / CONCEPT</small><DroneFlight /></div>;

  if (kind === "scales-of-existence") return (
    <div className={cls("id-scales")} aria-hidden="true">
      <span>Scales<b>.</b></span><small>ATOM → COSMOS</small>
      <svg className="id-motif" viewBox="0 0 240 90"><g fill="none" strokeWidth="1.2">
        <circle cx="16" cy="45" r="4" /><circle cx="48" cy="45" r="10" /><circle cx="98" cy="45" r="20" /><circle cx="180" cy="45" r="38" />
      </g><g className="id-dot"><circle cx="16" cy="45" r="2" /><circle cx="58" cy="45" r="2" /><circle cx="118" cy="45" r="2.4" /><circle cx="218" cy="45" r="3" /></g></svg>
    </div>
  );

  if (kind === "drone-sim") return (
    <div className={cls("id-dronesim")} aria-hidden="true">
      <span>Drone Sim</span><small>SWARM · SIMULATE</small>
      <svg className="id-motif" viewBox="0 0 240 90"><g fill="none" strokeWidth="1">
        <path d="M0 70 H240" /><path d="M120 70 L40 90 M120 70 L90 90 M120 70 L150 90 M120 70 L200 90" opacity=".5" />
        <circle cx="120" cy="34" r="18" strokeDasharray="3 3" /><path d="M120 10 V22 M120 46 V58 M96 34 H108 M132 34 H144" />
      </g><g className="id-dot"><path d="M112 30 l16 8 M128 30 l-16 8" strokeWidth="2.2" fill="none" /><circle cx="112" cy="30" r="3" /><circle cx="128" cy="30" r="3" /><circle cx="112" cy="38" r="3" /><circle cx="128" cy="38" r="3" /></g></svg>
    </div>
  );

  if (kind === "multi-drone-mission-planner") return (
    <div className={cls("id-planner")} aria-hidden="true">
      <span>Mission Planner</span><small>SWARM · PLAN</small>
      <svg className="id-motif" viewBox="0 0 240 90"><g fill="none" strokeWidth="1.4">
        <path d="M10 70 L60 30 L120 55 L175 18 L230 46" strokeDasharray="5 4" />
        <path d="M10 80 L70 52 L130 74 L190 40 L230 64" strokeDasharray="5 4" opacity=".55" />
      </g><g className="id-dot"><circle cx="10" cy="70" r="4" /><circle cx="60" cy="30" r="4" /><circle cx="120" cy="55" r="4" /><circle cx="175" cy="18" r="4" /><rect x="225" y="41" width="10" height="10" /></g></svg>
    </div>
  );

  if (kind === "label-ingestion-pipeline") return (
    <div className={cls("id-label")} aria-hidden="true">
      <span>Label Pipeline</span><small>PHOTO → VERIFIED DATA</small>
      <svg className="id-motif" viewBox="0 0 240 90"><g className="id-bars">
        {[0,6,10,18,22,30,36,40,48,54,58,66,72,76,84,90,96,100,108,114].map((x, i) => <rect key={x} x={20 + x} y="18" width={i % 3 ? 2 : 4} height="54" />)}
      </g><g fill="none" strokeWidth="2" className="id-scan"><path d="M10 10 H26 M10 10 V26 M150 10 H134 M150 10 V26 M10 80 H26 M10 80 V64 M150 80 H134 M150 80 V64" /></g>
      <g className="id-dot"><rect x="172" y="22" width="58" height="8" /><rect x="172" y="40" width="40" height="8" /><rect x="172" y="58" width="50" height="8" /></g></svg>
    </div>
  );

  if (kind === "bogmode-video-system") return (
    <div className={cls("id-video")} aria-hidden="true">
      <span>Video System</span><small>COLOUR · TYPE · MOTION · GRADE</small>
      <svg className="id-motif" viewBox="0 0 240 90"><g fill="none" strokeWidth="1.2">
        <rect x="6" y="8" width="128" height="72" /><path d="M18 18 H30 M18 18 V30 M122 18 H110 M122 18 V30 M18 70 H30 M18 70 V58 M122 70 H110 M122 70 V58" className="id-accent-stroke" />
      </g><g className="id-dot"><path d="M60 32 L80 44 L60 56 Z" /></g>
      <g className="id-ticks">{Array.from({ length: 16 }).map((_, i) => <rect key={i} x={150 + i * 5.5} y={i % 4 ? 52 : 44} width="1.5" height={i % 4 ? 12 : 20} />)}</g>
      <rect className="id-dot" x="184" y="40" width="2.5" height="28" /></svg>
    </div>
  );

  if (kind === "social-video-dataset") return (
    <div className={cls("id-social")} aria-hidden="true">
      <span>Social Dataset</span><small>VIDEO → ROWS</small>
      <svg className="id-motif" viewBox="0 0 240 90"><g className="id-dot"><path d="M14 22 L54 45 L14 68 Z" /></g>
      <path d="M70 45 H96" fill="none" strokeWidth="1.4" strokeDasharray="3 3" />
      <g fill="none" strokeWidth="1"><rect x="108" y="12" width="124" height="66" /><path d="M108 28 H232 M108 44 H232 M108 60 H232 M150 12 V78 M192 12 V78" /></g>
      <g className="id-dot"><rect x="112" y="31" width="34" height="10" /><rect x="154" y="47" width="34" height="10" /><rect x="196" y="63" width="32" height="10" /></g></svg>
    </div>
  );

  if (kind === "application-tracker") return (
    <div className={cls("id-tracker")} aria-hidden="true">
      <span>Tracker</span><small>5 / WEEK · AUTO FOLLOW-UPS</small>
      <svg className="id-motif" viewBox="0 0 240 90"><g>
        {[0,1,2,3,4].map((i) => <rect key={i} x={10 + i * 40} y="34" width="32" height="22" className={i < 3 ? "id-dot" : "id-empty"} />)}
      </g><path d="M212 44 l7 7 l14 -16" fill="none" strokeWidth="3" className="id-accent-stroke" /></svg>
    </div>
  );

  if (kind === "claude-code-skill-library") return (
    <div className={cls("id-spellbook")} aria-hidden="true">
      <span>Spellbook</span><small>RULES ONCE. EVERY SESSION.</small>
      <svg className="id-motif" viewBox="0 0 240 90"><g fill="none" strokeWidth="1.2">
        <rect x="22" y="14" width="56" height="70" transform="rotate(-8 50 49)" opacity=".45" /><rect x="40" y="10" width="56" height="70" transform="rotate(4 68 45)" opacity=".7" /><rect x="58" y="8" width="56" height="70" />
      </g><g className="id-dot"><path d="M86 26 L92 40 L106 43 L95 52 L98 66 L86 58 L74 66 L77 52 L66 43 L80 40 Z" /></g>
      <g fill="none" strokeWidth="1" opacity=".6"><path d="M134 24 H226 M134 40 H210 M134 56 H222 M134 72 H196" /></g></svg>
    </div>
  );

  // ── News art ─────────────────────────────────────────────────────
  if (kind === "provensky") return (
    <div className={cls("id-provensky")} aria-hidden="true">
      <span>Proven<b>Sky</b></span><small>PLAN · SIMULATE · FLY</small>
      <svg className="id-motif" viewBox="0 0 240 90"><g fill="none" strokeWidth="1">
        <path d="M0 78 H240" opacity=".45" /><path d="M20 78 V70 M60 78 V72 M100 78 V70 M140 78 V72 M180 78 V70 M220 78 V72" opacity=".45" />
        <path d="M14 66 C60 20, 110 60, 150 30 S 220 12, 232 18" strokeDasharray="4 4" />
        <path d="M14 66 C70 44, 120 72, 160 50 S 214 40, 232 44" strokeDasharray="4 4" opacity=".55" />
        <rect x="196" y="6" width="40" height="24" className="id-accent-stroke" />
      </g><g className="id-dot"><circle cx="14" cy="66" r="4" /><circle cx="88" cy="42" r="3.2" /><circle cx="150" cy="30" r="3.2" /><circle cx="216" cy="18" r="4" /><circle cx="120" cy="58" r="2.6" /></g></svg>
    </div>
  );

  if (kind === "game-layer") return (
    <div className={cls("id-gamelayer")} aria-hidden="true">
      <span>Press <b>Start</b></span><small>TOTEMS · QUESTS · ACHIEVEMENTS</small>
      <svg className="id-motif" viewBox="0 0 240 90"><g fill="none" strokeWidth="1.2">
        <circle cx="45" cy="45" r="36" /><circle cx="45" cy="45" r="24" opacity=".55" /><circle cx="45" cy="45" r="12" opacity=".35" />
        <rect x="100" y="16" width="132" height="12" /><rect x="100" y="40" width="132" height="12" /><rect x="100" y="64" width="132" height="12" />
      </g><g className="id-dot">
        <circle cx="45" cy="9" r="4" /><circle cx="79" cy="34" r="3" /><circle cx="66" cy="74" r="3" /><circle cx="24" cy="74" r="3" /><circle cx="11" cy="34" r="3" />
        <rect x="102" y="18" width="108" height="8" /><rect x="102" y="42" width="74" height="8" /><rect x="102" y="66" width="38" height="8" />
      </g></svg>
    </div>
  );

  // Fallback: division totem on the studio block, with the project's name.
  if (title) return (
    <div className={cls("id-totem")} aria-hidden="true">
      <span>{title}</span><small>{(division || "БОГMODE").toUpperCase()}</small>
      <TotemMark totem={DIVISION_TOTEM[division] || "wolf"} size={86} className="id-totem-mark" />
    </div>
  );
  return null;
}
