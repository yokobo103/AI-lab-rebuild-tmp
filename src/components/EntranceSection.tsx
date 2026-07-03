import { entrances } from "../data/entrances";
import { assets } from "../data/assets";
import { EntranceCard } from "./EntranceCard";

export function EntranceSection() {
  return (
    <section className="entrances-section" aria-label="研究所の入口">
      <div className="top-page-shell">
        <div className="entrances-section__connector" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="section-heading">
          <img src={assets.icons.paw} alt="" aria-hidden="true" />
          <p>研究所の入口</p>
        </div>
        <div className="entrance-grid">
          {entrances.map((entrance) => (
            <EntranceCard key={entrance.id} entrance={entrance} />
          ))}
        </div>
      </div>
    </section>
  );
}
