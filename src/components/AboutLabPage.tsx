import { assets } from "../data/assets";
import { Footer } from "./Footer";
import { LabButton } from "./LabButton";

const guidePoints = [
  {
    key: "experiment",
    title: "実験室",
    text: "AIと一緒に作ったゲームやツールを、実際に触って試せる場所。",
    icon: assets.icons.flask,
  },
  {
    key: "archive",
    title: "資料室",
    text: "考えたこと、失敗したこと、気づいたことを記録している場所。研究ログは資料室で読めます。",
    icon: assets.icons.book,
  },
] as const;

export function AboutLabPage() {
  return (
    <div className="about-page">
      <main className="about-page__main">
        <section className="about-hero" aria-labelledby="about-title">
          <div className="about-hero__copy">
            <p className="about-eyebrow">LAB GUIDE</p>
            <h1 id="about-title">
              AIで遊び、
              <br />
              気づけば自分が
              <br />
              変わっていた。
            </h1>
            <p className="about-hero__lead">
              AIと一緒に遊び、作り、観察し、その過程を記録していく個人の研究所です。
              ここでは成果物だけでなく、試行錯誤の道筋も大事にしています。
            </p>
            <div className="about-hero__actions">
              <LabButton
                href="/experiments"
                label="遊ぶ（実験室へ）"
                icon={assets.icons.flask}
                sprite={assets.ctaSprites.playFlaskHover}
                variant="primary"
              />
              <LabButton
                href="/read"
                label="読む（資料室へ）"
                icon={assets.icons.book}
                sprite={assets.ctaSprites.readBookHover}
                variant="log"
              />
            </div>
            <p className="about-hero__hint">どちらからでも、自由に行き来できます。</p>
          </div>

          <div className="about-guide" aria-label="よこぼのAIラボ 館内案内">
            <img className="about-guide__map" src={assets.about.guideMap} alt="" />
            <div className="about-guide__banner">よこぼのAIラボ 館内案内</div>
            {guidePoints.map((point) => (
              <article className={`about-guide__point about-guide__point--${point.key}`} key={point.key}>
                <img src={point.icon} alt="" aria-hidden="true" />
                <div>
                  <h2>{point.title}</h2>
                  <p>{point.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-note" aria-labelledby="about-note-title">
          <img src={assets.characters.drYokobo} alt="" aria-hidden="true" />
          <div>
            <p>Dr. よこぼより</p>
            <h2 id="about-note-title">このラボは、遊び心を大切にしたひとり研究所です。</h2>
            <span>
              好奇心から始めた小さな実験を、あとから振り返れる形で残しています。
              完成品だけでは見えない発見も、このラボの大切な展示物です。
            </span>
          </div>
        </section>

        <section className="about-reason" aria-labelledby="about-reason-title">
          <div className="about-section-title">
            <img src={assets.icons.flask} alt="" aria-hidden="true" />
            <div>
              <p>WHY THIS LAB EXISTS</p>
              <h2 id="about-reason-title">このラボができた理由</h2>
            </div>
          </div>
          <p>
            AIで遊び始めてから、作れるものも、考えられることも、少しずつ広がっていきました。
            展示だけではなく、その過程で起きた変化や発見を残したくて、このラボを作りました。
          </p>
        </section>

        <section className="about-closing" aria-labelledby="about-closing-title">
          <img className="about-closing__nyabit" src={assets.characters.nyabit} alt="" aria-hidden="true" />
          <div>
            <p>それでは、ラボの中へ。</p>
            <h2 id="about-closing-title">好きな部屋から始めてください。</h2>
          </div>
          <img className="about-closing__doctor" src={assets.characters.drYokobo} alt="" aria-hidden="true" />
        </section>
      </main>
      <Footer />
    </div>
  );
}
