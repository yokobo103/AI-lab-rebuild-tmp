import { type MouseEvent, useState } from "react";
import { archiveArticles } from "../data/archiveArticles";
import { assets } from "../data/assets";
import { labExperiments } from "../data/labExperiments";
import { routes } from "../data/routes";

const randomTargets = [
  ...labExperiments.map((experiment) => ({
    label: experiment.title,
    href: routes.experimentAnchor(experiment.id),
  })),
  ...archiveArticles
    .filter((article) => article.status === "public")
    .map((article) => ({
      label: article.title,
      href: routes.readArticle(article.id),
    })),
];

export function RandomTransferDock() {
  const [isActivating, setIsActivating] = useState(false);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    const target = randomTargets[Math.floor(Math.random() * randomTargets.length)];
    if (!target) return;

    setIsActivating(true);
    window.setTimeout(() => {
      window.location.assign(target.href);
    }, 300);
  };

  return (
    <>
      <button
        className={`random-transfer-dock${isActivating ? " is-activating" : ""}`}
        type="button"
        onClick={handleClick}
        aria-label="ランダム転送室を起動"
      >
        <img src={assets.icons.transfer} alt="" aria-hidden="true" />
        <span>
          <small>転送室</small>
          <strong>ランダム</strong>
        </span>
      </button>
      <span className={`random-transfer-flash${isActivating ? " is-active" : ""}`} aria-hidden="true" />
    </>
  );
}
