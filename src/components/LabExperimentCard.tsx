import type { LabExperiment } from "../data/labExperiments";
import { getExperimentLogHref, getRelatedLogSlugs } from "../data/experimentRelations";

type LabExperimentCardProps = {
  experiment: LabExperiment;
  featured?: boolean;
};

function categoryTone(category: string) {
  if (category.includes("ゲーム")) {
    return "game";
  }

  if (category.includes("ツール") || category.includes("プロト")) {
    return "tool";
  }

  if (category.includes("音声") || category.includes("動画")) {
    return "sound";
  }

  return "cyan";
}

function statusBadgeLabel(status: LabExperiment["status"]) {
  if (status === "LIVE") return "稼働中";
  if (status === "HOT") return "公開中";
  if (status === "NEW") return "公開中";
  return "試作中";
}

export function LabExperimentCard({ experiment, featured = false }: LabExperimentCardProps) {
  const tone = categoryTone(experiment.category);
  const relatedLogCount = getRelatedLogSlugs(experiment.id).length;
  const logHref = getExperimentLogHref(experiment.id);
  const logLabel = relatedLogCount > 1 ? `記録 ${relatedLogCount}件` : "記録を読む";

  return (
    <article
      id={experiment.id}
      className={[
        "lab-experiment-card",
        featured ? "lab-experiment-card--featured" : "",
        `lab-experiment-card--${tone}`,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="lab-experiment-card__surface">
        <span className="lab-experiment-card__current" aria-hidden="true" />
        <span className="lab-experiment-card__burst" aria-hidden="true" />
        <span className="lab-experiment-card__media">
          <img src={experiment.image} alt="" aria-hidden="true" />
        </span>
        <span className={`lab-experiment-card__status lab-experiment-card__status--${experiment.status.toLowerCase()}`}>
          {experiment.status === "LIVE" ? <span className="lab-experiment-card__status-dot" aria-hidden="true" /> : null}
          {statusBadgeLabel(experiment.status)}
        </span>
        <span className="lab-experiment-card__body">
          <span className="lab-experiment-card__title">{experiment.title}</span>
          <span className="lab-experiment-card__summary">{experiment.summary}</span>
          <span className="lab-experiment-card__tags" aria-label={`${experiment.category}カテゴリ`}>
            {experiment.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </span>
          <span className="lab-experiment-card__actions">
            <a className="lab-experiment-card__action lab-experiment-card__action--launch" href={experiment.href} target="_blank" rel="noreferrer">
              <span aria-hidden="true">▶</span>
              <span>起動</span>
            </a>
            <span className="lab-experiment-card__action-divider" aria-hidden="true" />
            {relatedLogCount > 0 ? (
              <a className="lab-experiment-card__action lab-experiment-card__action--log" href={logHref}>
                <span>{logLabel}</span>
                <span aria-hidden="true">→</span>
              </a>
            ) : (
              <span className="lab-experiment-card__action lab-experiment-card__action--log is-disabled" aria-disabled="true">
                <span>記録 0件</span>
              </span>
            )}
          </span>
          <span className="lab-experiment-card__bottom">
            <span className="lab-experiment-card__button">
              起動する
              <span aria-hidden="true">→</span>
            </span>
          </span>
        </span>
      </div>
    </article>
  );
}
