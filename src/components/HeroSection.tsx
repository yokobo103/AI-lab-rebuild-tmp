import { useState } from "react";
import { assets } from "../data/assets";
import { routes } from "../data/routes";
import { LabButton } from "./LabButton";

type HeroWorld = "lab" | "archive" | null;

export function HeroSection() {
  const [activeWorld, setActiveWorld] = useState<HeroWorld>(null);

  return (
    <section className="hero-section" aria-labelledby="hero-title" data-active-world={activeWorld ?? undefined}>
      <div className="hero-section__visuals" aria-hidden="true">
        <div className="hero-section__visual hero-section__visual--lab">
          <img src={assets.hero.labWorld} alt="" />
        </div>
        <div className="hero-section__visual hero-section__visual--archive">
          <img src={assets.hero.archiveWorld} alt="" />
        </div>
      </div>
      <div className="hero-section__seam" aria-hidden="true" />
      <div className="hero-section__overlay" aria-hidden="true" />

      <div className="hero-section__content top-page-shell">
        <div className="hero-section__content-inner">
          <p className="hero-section__eyebrow motion-fade-up motion-delay-1">
            <img src={assets.icons.paw} alt="" aria-hidden="true" />
            ようこそ、よこぼのAIラボへ
          </p>
          <h1 id="hero-title" className="motion-fade-up motion-delay-1">
            <span>遊ぶ？</span>
            <span>読む？</span>
          </h1>
          <p className="hero-section__lead motion-fade-up motion-delay-2">
            好奇心を実験したり、知識を深めたり。
          </p>
          <p className="hero-section__body motion-fade-up motion-delay-2">
            あなたの「知りたい！」が、ここから広がります。
          </p>
          <div className="hero-section__actions motion-fade-up motion-delay-5" aria-label="主な導線">
            <span
              className="hero-section__action"
              onBlur={() => setActiveWorld(null)}
              onFocus={() => setActiveWorld("lab")}
              onMouseEnter={() => setActiveWorld("lab")}
              onMouseLeave={() => setActiveWorld(null)}
              onPointerDown={() => setActiveWorld("lab")}
              onPointerEnter={() => setActiveWorld("lab")}
              onPointerLeave={() => setActiveWorld(null)}
            >
              <LabButton
                href={routes.experiments}
                label="遊ぶ（実験室へ）"
                icon={assets.icons.flask}
                sprite={assets.ctaSprites.playFlaskHover}
              />
            </span>
            <span
              className="hero-section__action"
              onBlur={() => setActiveWorld(null)}
              onFocus={() => setActiveWorld("archive")}
              onMouseEnter={() => setActiveWorld("archive")}
              onMouseLeave={() => setActiveWorld(null)}
              onPointerDown={() => setActiveWorld("archive")}
              onPointerEnter={() => setActiveWorld("archive")}
              onPointerLeave={() => setActiveWorld(null)}
            >
              <LabButton
                href={routes.read}
                label="読む（資料室へ）"
                icon={assets.icons.book}
                sprite={assets.ctaSprites.readBookHover}
                variant="log"
              />
            </span>
          </div>
          <a className="hero-section__about-link motion-fade-up motion-delay-5" href={routes.about}>
            ラボについてもっと知る
          </a>
        </div>
      </div>
    </section>
  );
}
