"use client";
import { useSkin } from "../SkinProvider";
import TotemMark from "../TotemMark";
import { TOTEM_CARDS } from "./totemData";

// About-page player card. The totem follows whichever skin the visitor picked.
export default function PlayerCard({ portrait }) {
  const { skin } = useSkin();
  const card = TOTEM_CARDS.find((c) => c.skin === skin) || TOTEM_CARDS[0];
  const rows = [
    ["CLASS", "Builder"],
    ["BASE", "Winnipeg, MB"],
    ["TOTEM", `${card.totem[0].toUpperCase()}${card.totem.slice(1)} (yours, not mine)`],
    ["LANGUAGES", "EN · UA · RU"],
    ["SIDE QUESTS", "FPV drones · Muay Thai"],
    ["STATUS", "Open to good ideas"],
  ];
  return (
    <figure className="player-card">
      <div className="pc-head"><span>PLAYER PROFILE</span><span>LVL ∞</span></div>
      <div className="pc-photo">
        {portrait && <img src={portrait} alt="Bogdan in orange glasses" />}
        <TotemMark totem={card.totem} size={58} className="pc-totem" />
      </div>
      <dl className="pc-stats">
        {rows.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
      </dl>
    </figure>
  );
}
