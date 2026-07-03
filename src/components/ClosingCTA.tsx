import { assets } from "../data/assets";
import { LabButton } from "./LabButton";

export function ClosingCTA() {
  return (
    <section className="closing-cta" aria-label="Yokobo AI Lab">
      <div className="top-page-shell closing-cta__inner">
        <div>
          <p className="closing-cta__eyebrow">Yokobo AI Lab</p>
          <p>
            遊んでも、読んでも、偶然にまかせても大丈夫。
            <br />
            よこぼAIラボは、どこから入っても研究が始まります。
          </p>
        </div>
        <div className="closing-cta__actions">
          <LabButton href="/experiments" label="実験室へ転送する" icon={assets.icons.flask} />
          <LabButton href="/logs" label="研究ログを読む" icon={assets.icons.book} variant="log" />
          <LabButton href="/random" label="ランダム転送" icon={assets.icons.transfer} variant="random" />
        </div>
      </div>
    </section>
  );
}
