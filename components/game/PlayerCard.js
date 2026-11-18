"use client";
import { useSkin } from "../SkinProvider";
import TotemMark from "../TotemMark";
import { TOTEM_CARDS } from "./totemData";

// About-page player card: studio photo with the selected form marker.
export default function PlayerCard({ portrait }) {
  const { skin } = useSkin();
  const card = TOTEM_CARDS.find((c) => c.skin === skin) || TOTEM_CARDS[0];
  const rows = [
    ["CLASS", "Builder"],
    ["BASE", "Winnipeg, MB"],
    ["LANGUAGES", "EN · UA · RU"],
    ["SIDE QUESTS", "FPV drones · Muay Thai"],
    ["STATUS", "Open to good ideas"],
  ];
  return (
    <figure className="player-card">
      <div className="pc-head"><span>PLAYER PROFILE</span><span>LVL ∞</span></div>
      <div className="pc-photo">
        {portrait && <img src={portrait} alt="Bogdan, studio portrait in orange-tinted glasses and a navy work jacket" />}
        <span key={card.skin} className="pc-form-mark" role="img" aria-label={`Current profile mark: ${card.totem}`}>
          <TotemMark totem={card.totem} size={44} />
        </span>
      </div>
      <dl className="pc-stats">
        {rows.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
      </dl>
    </figure>
  );
}
