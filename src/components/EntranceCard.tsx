import type { Entrance } from "../data/entrances";
import { LabButton } from "./LabButton";

const variantMap = {
  play: "primary",
  read: "log",
  random: "random",
} as const;

export function EntranceCard({ entrance }: { entrance: Entrance }) {
  return (
    <article className={`entrance-card entrance-card--${entrance.id}`}>
      <img className="entrance-card__image" src={entrance.image} alt="" aria-hidden="true" />
      <picture className="entrance-card__frame" aria-hidden="true">
        <source media="(max-width: 767px)" srcSet="/assets/entrances/door-frame-mobile.png" />
        <img src="/assets/entrances/door-frame-pc.png" alt="" />
      </picture>
      <div className="entrance-card__gate-frame" aria-hidden="true">
        <span className="entrance-card__gate-arch" />
        <span className="entrance-card__gate-rail entrance-card__gate-rail--left" />
        <span className="entrance-card__gate-rail entrance-card__gate-rail--right" />
        <span className="entrance-card__gate-dock" />
      </div>
      <img className="entrance-card__icon" src={entrance.icon} alt="" aria-hidden="true" />
      <div className="entrance-card__content">
        <div className="entrance-card__copy">
          <h3>{entrance.title}</h3>
          <p>{entrance.body}</p>
        </div>
        <LabButton href={entrance.href} label={entrance.buttonLabel} icon={entrance.icon} variant={variantMap[entrance.id]} />
      </div>
    </article>
  );
}
