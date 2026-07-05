import { useMemo, useState } from "react";
import { archiveArticles } from "../data/archiveArticles";
import type { ArchiveArticle } from "../data/archiveArticles";
import { getExperimentLaunchHref, getRelatedExperiment, getRelatedExperimentId } from "../data/experimentRelations";
import { logCategories, researchLogs, statusLabel } from "../data/researchLogs";
import type { LogFilter, ResearchLog } from "../data/researchLogs";
import { plannedRoutes, routes } from "../data/routes";

function formatLogDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}

function articleToResearchLog(article: ArchiveArticle, index: number): ResearchLog {
  const status = article.resultStatus === "success" ? "success" : article.resultStatus === "failed" ? "fail" : "tuning";

  return {
    id: `LOG-${String(researchLogs.length + index + 1).padStart(3, "0")}`,
    date: formatLogDate(article.publishedAt || article.createdAt || article.updatedAt),
    status,
    category: "開発ログ",
    title: article.title,
    excerpt: article.summary,
    tags: article.tags.slice(0, 4),
    href: routes.readArticle(article.id),
    thumbnail: article.thumbnail,
    slug: article.id,
  };
}

const articleLogEntries = archiveArticles.map(articleToResearchLog);
const allResearchLogs = [...researchLogs, ...articleLogEntries].sort((a, b) => b.date.localeCompare(a.date));
const totalLogCount = allResearchLogs.length;
const latestLog = allResearchLogs[0];
const readStatusCounts = allResearchLogs.reduce(
  (counts, log) => {
    if (log.status === "success") {
      counts.success += 1;
    } else if (log.status === "fail") {
      counts.fail += 1;
    } else {
      counts.tuning += 1;
    }

    return counts;
  },
  { success: 0, fail: 0, tuning: 0 },
);

function logReadHref(log: ResearchLog) {
  if (log.href) return log.href;
  const experimentId = getRelatedExperimentId(log);
  if (experimentId) return routes.readExperimentFilter(experimentId);
  return routes.read;
}

function fallbackLogThumbnail(log: ResearchLog) {
  if (log.status === "success") return "/illustrations/shiryoshitsu/dr-yokobo-smile.png";
  if (log.status === "fail") return "/illustrations/shiryoshitsu/dr-yokobo-sleepy.png";
  if (log.status === "tuning") return "/illustrations/shiryoshitsu/nyabit-question.png";
  return "/illustrations/shiryoshitsu/nyabit-sleepy.png";
}

function BreadcrumbBar() {
  return (
    <div className="read-meta-bar">
      <nav className="read-breadcrumb" aria-label="パンくず">
        <a href={routes.home}>ラボ</a>
        <span aria-hidden="true">/</span>
        <a href={routes.read}>読む</a>
        <span aria-hidden="true">/</span>
        <span>資料室</span>
      </nav>
      <div className="read-status-row" aria-label="資料室ステータス">
        <span>
          <i aria-hidden="true" /> 記録 {totalLogCount} 件
        </span>
        <span>最終更新 {latestLog.date}</span>
        <a href={logReadHref(latestLog)}>▷ 気まぐれに1本</a>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="read-hero" aria-labelledby="read-title">
      <div className="read-hero__copy">
        <p className="read-eyebrow">ARCHIVE ┃ 読む</p>
        <h1 id="read-title">資料室</h1>
        <p className="read-hero__lead">
          作ってみたこと、考えたこと、<span>失敗したこと</span>。
          <br />
          ラボの研究記録を、ゆっくりたどる場所。
        </p>
        <dl className="read-hero__meter" aria-label="研究記録の結果集計">
          <div>
            <dt>SUCCESS</dt>
            <dd>
              <strong>{readStatusCounts.success}</strong>
              <span>成功</span>
            </dd>
          </div>
          <div>
            <dt>FAILED</dt>
            <dd>
              <strong>{readStatusCounts.fail}</strong>
              <span>失敗</span>
            </dd>
          </div>
          <div>
            <dt>TUNING</dt>
            <dd>
              <strong>{readStatusCounts.tuning}</strong>
              <span>調整中</span>
            </dd>
          </div>
        </dl>
      </div>
      <aside className="librarian-card" aria-label="司書メモ">
        <span className="librarian-card__paw" aria-hidden="true">
          paw
        </span>
        <div className="librarian-card__head">
          <img src="/illustrations/shiryoshitsu/dr-yokobo-smile.png" alt="Dr.よこぼ（司書）" />
          <div>
            <strong>Dr.よこぼ</strong>
            <small>司書 / 館長</small>
          </div>
        </div>
        <p>ここは静かに読む部屋だよ。うまくいった話より、悩んだ話のほうが多いかもしれない。それでいいのです。</p>
      </aside>
    </section>
  );
}

function ReceptionBand() {
  return (
    <section className="reception-band" aria-labelledby="reception-title">
      <div className="reception-band__symbol" aria-hidden="true">
        <span>RECEPTION</span>
        <i />
      </div>
      <div>
        <h2 id="reception-title">このラボについて</h2>
        <p>AIと遊び、つくり、考えた記録が集まる研究所。はじめての方はこちらから。</p>
      </div>
      <a href={routes.about}>館内案内へ <span aria-hidden="true">→</span></a>
    </section>
  );
}

type LogEntryProps = {
  log: ResearchLog;
  featured?: boolean;
};

function LogEntry({ log, featured = false }: LogEntryProps) {
  const label = statusLabel(log.status);
  const relatedExperiment = getRelatedExperiment(log);
  const thumbnail = log.thumbnail ?? fallbackLogThumbnail(log);
  const thumbClassName = `log-entry__thumb${log.thumbnail ? "" : " log-entry__thumb--fallback"}`;

  return (
    <article className={`log-entry log-entry--with-thumb${featured ? " log-entry--featured" : ""}`}>
      <span className={`log-entry__dot log-entry__dot--${log.status ?? "none"}`} aria-hidden="true" />
      <div className="log-entry__body">
        <div className="log-entry__meta">
          <span>{log.id}</span>
          <time dateTime={log.date.replaceAll(".", "-")}>{log.date}</time>
          {label ? <span className={`log-entry__status log-entry__status--${log.status}`}>{label}</span> : null}
        </div>
        <div className="log-entry__content">
        {thumbnail ? (
          <a className={thumbClassName} href={logReadHref(log)} aria-label={`${log.title} を読む`}>
            <img src={thumbnail} alt="" loading={featured ? "eager" : "lazy"} />
          </a>
        ) : null}
          <div className="log-entry__text">
        <h3>
          {log.href ? (
            <a href={log.href}>{log.title}</a>
          ) : (
            log.title
          )}
        </h3>
        <p>{log.excerpt}</p>
        <footer className="log-entry__footer">
          <div className="log-entry__tags" aria-label={`${log.id} のタグ`}>
            {log.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
          {relatedExperiment ? (
            <a className="xlink" href={getExperimentLaunchHref(relatedExperiment.id)}>
              ▷ 実験室で遊ぶ <span>{relatedExperiment.title}</span>
            </a>
          ) : null}
        </footer>
          </div>
        </div>
      </div>
    </article>
  );
}

type LogStateProps = {
  kind: "loading" | "empty";
};

function LogState({ kind }: LogStateProps) {
  return (
    <div className="log-state" role={kind === "loading" ? "status" : undefined} aria-live="polite">
      <img src="/illustrations/shiryoshitsu/dr-yokobo-sleepy.png" alt="" aria-hidden="true" />
      <p className={kind === "loading" ? "log-state__mono" : undefined}>
        {kind === "loading" ? "記録を準備中…" : "この分類の記録は、まだないみたい。"}
      </p>
    </div>
  );
}

function ResearchLogSection() {
  const [activeFilter, setActiveFilter] = useState<LogFilter>("すべて");
  const experimentFilter = new URLSearchParams(window.location.search).get("experiment");
  const isLoading = false;
  const visibleLogs = useMemo(
    () => allResearchLogs.filter((log) => activeFilter === "すべて" || log.category === activeFilter),
    [activeFilter],
  );
  const displayLogs = experimentFilter
    ? allResearchLogs.filter((log) => getRelatedExperimentId(log) === experimentFilter)
    : visibleLogs;

  return (
    <section className="research-section" aria-labelledby="research-title">
      <div className="research-section__paper">
        <header className="research-section__header">
          <h2 id="research-title">研究記録</h2>
          <span>LOG-001 〜 LOG-{String(totalLogCount).padStart(3, "0")}</span>
        </header>
        <div className="filter-chips" aria-label="研究記録フィルタ">
          {logCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={category === activeFilter ? "is-active" : ""}
              aria-pressed={category === activeFilter}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="timeline-wrap">
          <img
            className="timeline-wrap__doodle"
            src="/illustrations/shiryoshitsu/nyabit-sleepy.png"
            alt=""
            aria-hidden="true"
          />
          <div className="timeline">
            {isLoading ? <LogState kind="loading" /> : null}
            {!isLoading && displayLogs.length === 0 ? <LogState kind="empty" /> : null}
            {!isLoading && displayLogs.map((log, index) => <LogEntry key={log.id} log={log} featured={index === 0} />)}
          </div>
        </div>
        <a className="research-section__all" href={routes.read}>
          全 {totalLogCount} 件の記録を見る ↓
        </a>
      </div>
    </section>
  );
}

function LinkStrip() {
  return (
    <section className="read-strip" aria-label="読むための入口">
      <article className="read-strip__item read-strip__item--pending" aria-disabled="true">
        <span className="read-strip__icon" aria-hidden="true">
          ♪
        </span>
        <span>
          <small>PODCAST ┃ 聴く</small>
          <strong>よこぼラジオ</strong>
          <em>Dr.よこぼとニャビットが、その週にじっていた実験をゆるく振り返る音声記録。</em>
          <b>準備中</b>
        </span>
      </article>
      <article className="read-strip__item read-strip__item--pending" aria-disabled="true" data-planned-route={plannedRoutes.tags}>
        <span className="read-strip__icon" aria-hidden="true">
          #
        </span>
        <img className="read-strip__spot" src="/illustrations/shiryoshitsu/nyabit-question.png" alt="" />
        <span>
          <small>INDEX ┃ さがす</small>
          <strong>タグから探す</strong>
          <em>開発ログ、失敗の記録、考えたこと。気になるテーマから記録をたどれます。</em>
          <b>準備中</b>
        </span>
      </article>
    </section>
  );
}

function ReadFooter() {
  return (
    <footer className="read-footer">
      <dl>
        <div>
          <dt>TOTAL LOGS</dt>
          <dd>{totalLogCount} 件</dd>
        </div>
        <div>
          <dt>TOPICS</dt>
          <dd>6 分野</dd>
        </div>
        <div>
          <dt>LAST UPDATED</dt>
          <dd>{latestLog.date.slice(5)}</dd>
        </div>
      </dl>
      <p>
        <span aria-hidden="true" /> LAB STATUS / 記録更新中
      </p>
      <strong>
        YKB
        <small>よこぼのAIラボ</small>
      </strong>
    </footer>
  );
}

export function ReadArchivePage() {
  return (
    <div className="read-page">
      <div className="paper-grain" aria-hidden="true" />
      <main className="read-page__main">
        <BreadcrumbBar />
        <Hero />
        <ReceptionBand />
        <ResearchLogSection />
        <LinkStrip />
      </main>
      <ReadFooter />
    </div>
  );
}
