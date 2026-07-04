import { useMemo, useState } from "react";
import { assets } from "../data/assets";
import { labCategories, labExperiments } from "../data/labExperiments";
import { routes } from "../data/routes";
import { LabExperimentCard } from "./LabExperimentCard";
import type { CSSProperties } from "react";

const featuredExperiment = labExperiments.find((experiment) => experiment.featured) ?? labExperiments[0];
const deviceCount = labExperiments.length;
// TODO: §7 の将来機能は、実ログと十分な母数がそろうまで表示しない。

const particles = Array.from({ length: 18 }, (_, index) => index);

type ParticleStyle = CSSProperties & {
  "--particle-index": number;
  "--particle-left": string;
};

function LabEmptyState() {
  return (
    <div className="log-state lab-empty-state" aria-live="polite">
      <img src={assets.characters.nyabit} alt="" aria-hidden="true" />
      <p>この分類の装置は、まだ準備中みたい。</p>
    </div>
  );
}

export function LabExperimentPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof labCategories)[number]>("すべて");
  const visibleExperiments = useMemo(
    () =>
      labExperiments.filter((experiment) => activeCategory === "すべて" || experiment.category === activeCategory),
    [activeCategory],
  );
  const visibleFeaturedExperiment = visibleExperiments.find((experiment) => experiment.id === featuredExperiment.id);
  const standardExperiments = visibleExperiments.filter((experiment) => experiment.id !== featuredExperiment.id);

  return (
    <div className="lab-page">
      <div className="lab-page__particles" aria-hidden="true">
        {particles.map((particle) => (
          <span
            key={particle}
            style={
              {
                "--particle-index": particle,
                "--particle-left": `${(particle * 17 + 8) % 96}%`,
              } as ParticleStyle
            }
          />
        ))}
      </div>

      <main className="lab-page__main">
        <section className="lab-hero" aria-labelledby="lab-title">
          <div className="lab-hero__media" aria-hidden="true">
            <img className="lab-hero__bg" src="/assets/hero/lab-room-bg-new.jpg" alt="" />
            <div className="lab-holo-unit">
              <span className="lab-holo-unit__beam" />
              <img className="lab-holo-unit__cylinder" src="/assets/hero/holo-cylinder.png" alt="" />
              <span className="lab-holo-unit__scan" />
              <span className="lab-holo-unit__particles" />
              <span className="lab-holo-unit__nyabit">
                <img className="lab-holo-unit__nyabit-img" src="/assets/hero/holo-nyabit-clean.png" alt="" />
              </span>
              <span className="lab-holo-unit__aura" />
            </div>
            <span className="lab-hero__shade" />
          </div>
          <div className="lab-hero__layout">
            <div className="lab-hero__copy">
              <div className="lab-hero__breadcrumb">ラボ 〉 実験室</div>
              <p className="lab-hero__eyebrow">すべての実験装置が、いま動いているよ。</p>
              <h1 id="lab-title">実験室</h1>
              <p className="lab-hero__lead">気になる実験を選んで、すぐに起動してみよう！</p>
            </div>

            <aside className="lab-growth-panel" aria-label={`稼働状況 ${deviceCount}台 稼働中`}>
              <img className="lab-growth-panel__frame" src={assets.lab.statusFrame} alt="" aria-hidden="true" />
              <div className="lab-growth-panel__screen">
                <span className="lab-growth-panel__silhouette" aria-hidden="true" />
                <div className="lab-growth-panel__count" aria-label={`稼働台数 ${deviceCount}台`}>
                  <strong>{deviceCount}</strong>
                  <span>台</span>
                </div>
                <div className="lab-growth-panel__state">
                  <span>稼働中</span>
                  <small>全 {deviceCount} 台</small>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <div className="lab-categories" aria-label="実験カテゴリ">
          {labCategories.map((category) => (
            <button
              key={category}
              className={category === activeCategory ? "is-active" : ""}
              type="button"
              aria-pressed={category === activeCategory}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {visibleExperiments.length === 0 ? <LabEmptyState /> : null}

        {visibleFeaturedExperiment ? (
          <section className="lab-featured-grid" aria-label="注目の実験装置">
            <LabExperimentCard experiment={visibleFeaturedExperiment} featured />
          </section>
        ) : null}

        {standardExperiments.length > 0 ? (
          <section className="lab-standard" aria-labelledby="recommended-title">
            <div className="lab-standard__heading">
              <img src={assets.characters.drYokobo} alt="" aria-hidden="true" />
              <div>
                <p>Dr.よこぼのおすすめ</p>
                <h2 id="recommended-title">
                  {activeCategory === "すべて" ? "今週の実験装置" : `${activeCategory}の実験装置`}
                </h2>
              </div>
            </div>
            <div className="lab-standard-grid">
              {standardExperiments.map((experiment) => (
                <LabExperimentCard key={experiment.id} experiment={experiment} />
              ))}
            </div>
          </section>
        ) : null}

        <section className="lab-explore" aria-label="探索モード">
          <img className="lab-explore__doctor" src={assets.characters.drYokobo} alt="" aria-hidden="true" />
          <div className="lab-explore__panel">
            <p>もっと奥へ、ラボの奥深くへ行ってみよう</p>
            <h2>探索モード</h2>
            <span>開発中の実験装置や、アーカイブされた実験など、ラボのすべてを自由に探索できます。</span>
            <a href={routes.experimentsExplore}>探索モードへ進む →</a>
          </div>
          <img className="lab-explore__nyabit" src={assets.characters.nyabit} alt="" aria-hidden="true" />
        </section>
      </main>
    </div>
  );
}
