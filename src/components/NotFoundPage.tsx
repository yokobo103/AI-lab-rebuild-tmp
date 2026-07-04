import { assets } from "../data/assets";
import { routes } from "../data/routes";

export function NotFoundPage() {
  return (
    <div className="not-found-page">
      <main className="not-found-page__main" aria-labelledby="not-found-title">
        <div className="not-found-page__signal" aria-hidden="true">
          <span />
          <img src={assets.characters.nyabit} alt="" />
        </div>
        <p className="not-found-page__eyebrow">TRANSFER ERROR</p>
        <h1 id="not-found-title">転送に失敗しました</h1>
        <p>ニャビットが行き先を探しています。入口に戻って、もう一度ルートを選んでください。</p>
        <a href={routes.home}>トップへ戻る</a>
      </main>
    </div>
  );
}
