"use client";

import { useRef, useState } from "react";
import { useSkin } from "./SkinProvider";
import TotemMark from "./TotemMark";
import { TOTEM_CARDS } from "./game/totemData";

const optionPositions = TOTEM_CARDS.map((_, index) => {
  const angle = (index / TOTEM_CARDS.length) * 2 * Math.PI;
  return {
    "--wheel-x": `${50 + 36 * Math.sin(angle)}%`,
    "--wheel-y": `${50 - 36 * Math.cos(angle)}%`,
  };
});

export default function SkinToggle() {
  const { skin, setSkin } = useSkin();
  const selected = Math.max(0, TOTEM_CARDS.findIndex((card) => card.skin === skin));
  const [preview, setPreview] = useState(null);
  const current = TOTEM_CARDS[selected];
  const featured = TOTEM_CARDS[preview ?? selected];
  const dialog = useRef(null);
  const trigger = useRef(null);
  const options = useRef([]);

  function openWheel() {
    setPreview(null);
    dialog.current.showModal();
    options.current[selected]?.focus();
  }

  function selectForm(form) {
    setSkin(form);
    dialog.current.close();
  }

  function moveFocus(event, index) {
    const direction = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    }[event.key];
    if (!direction) return;
    event.preventDefault();
    const count = TOTEM_CARDS.length;
    options.current[(index + direction + count) % count]?.focus();
  }

  return (
    <div className="form-bar">
      <button
        type="button"
        ref={trigger}
        className="form-trigger"
        aria-haspopup="dialog"
        aria-controls="form-wheel"
        aria-label={`Change form. Current form: ${current.skin}`}
        onClick={openWheel}
      >
        <span className="form-trigger-icon"><TotemMark totem={current.totem} size={20} /></span>
        <span>FORM <strong>{current.skin}</strong></span>
        <span aria-hidden="true">⌄</span>
      </button>
      <dialog
        ref={dialog}
        id="form-wheel"
        className="form-dialog"
        aria-labelledby="form-wheel-title"
        onClose={() => trigger.current?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current.close();
        }}
      >
        <div className="form-panel">
          <header className="form-heading">
            <h2 id="form-wheel-title">Choose a form</h2>
            <button type="button" className="form-close" aria-label="Close form picker" onClick={() => dialog.current.close()}>×</button>
          </header>
          <div className="form-wheel">
            <div className="form-orbits" aria-hidden="true" />
            <div className="form-core" data-form={featured.skin} aria-hidden="true">
              <TotemMark totem={featured.totem} size={52} />
              <strong>{featured.totem}</strong>
              <span>{featured.division}</span>
            </div>
            {TOTEM_CARDS.map((card, index) => (
              <button
                type="button"
                key={card.skin}
                ref={(element) => { options.current[index] = element; }}
                className="form-option"
                style={optionPositions[index]}
                data-form={card.skin}
                aria-label={`${card.skin}, ${card.totem}, ${card.division}`}
                aria-pressed={index === selected}
                onFocus={() => setPreview(index)}
                onPointerEnter={(event) => { if (event.pointerType === "mouse") setPreview(index); }}
                onPointerLeave={() => {
                  const focused = options.current.indexOf(document.activeElement);
                  setPreview(focused === -1 ? null : focused);
                }}
                onKeyDown={(event) => moveFocus(event, index)}
                onClick={() => selectForm(card.skin)}
              >
                <TotemMark totem={card.totem} size={32} />
                <span>{card.skin}</span>
              </button>
            ))}
          </div>
          <p className="form-detail">{featured.line}</p>
        </div>
      </dialog>
    </div>
  );
}
