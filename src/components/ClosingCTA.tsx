import { assets } from "../data/assets";
import { plannedRoutes, routes } from "../data/routes";
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
          <LabButton href={routes.experiments} label="実験室へ転送する" icon={assets.icons.flask} />
          <LabButton href={routes.read} label="研究ログを読む" icon={assets.icons.book} variant="log" />
          <span className="lab-button lab-button--random is-disabled" aria-disabled="true" data-planned-route={plannedRoutes.randomTransfer}>
            <img className="lab-button__icon" src={assets.icons.transfer} alt="" aria-hidden="true" />
            <span>ランダム転送 準備中</span>
          </span>
        </div>
      </div>
    </section>
  );
}
