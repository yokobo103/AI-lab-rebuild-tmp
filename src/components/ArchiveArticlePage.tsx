import { archiveArticles, getArchiveArticle } from "../data/archiveArticles";
import type { ArchiveArticle } from "../data/archiveArticles";
import { markdownToHtml } from "../utils/markdown";

type ArchiveArticlePageProps = {
  slug: string;
};

const authorProfiles: Record<string, { name: string; role: string; image: string; description: string }> = {
  "dr-yokobo": {
    name: "Dr.よこぼ",
    role: "研究ログ担当",
    image: "/illustrations/shiryoshitsu/dr-yokobo-smile.png",
    description: "実験の途中で見つけた違和感や、つくりながら考えたことを記録します。",
  },
  nyabitto: {
    name: "ニャビット",
    role: "ラボ案内役",
    image: "/illustrations/shiryoshitsu/nyabit-question.png",
    description: "遊べるもの、気になるもの、転送したくなるものを見つけてきます。",
  },
};

function formatDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function statusText(status: string) {
  if (status === "success") return "成功";
  if (status === "observation") return "観察";
  if (status === "researching") return "研究中";
  if (status === "unstable") return "調整中";
  if (status === "failed") return "失敗";
  return status;
}

function ArticleNotFound() {
  return (
    <div className="read-page">
      <div className="paper-grain" aria-hidden="true" />
      <main className="archive-article archive-article--missing">
        <a className="archive-back-link" href="/read">
          資料室へ戻る
        </a>
        <h1>記事が見つかりませんでした</h1>
        <p>移行済みの記事は、現在 {archiveArticles.length} 件です。</p>
      </main>
    </div>
  );
}

function ArticleGallery({ article }: { article: ArchiveArticle }) {
  if (article.images.length === 0) return null;

  return (
    <section className="archive-gallery" aria-labelledby="archive-gallery-title">
      <h2 id="archive-gallery-title">ギャラリー</h2>
      <div className="archive-gallery__grid">
        {article.images.map((image) => (
          <a href={image} key={image} target="_blank" rel="noreferrer">
            <img src={image} alt="" loading="lazy" />
          </a>
        ))}
      </div>
    </section>
  );
}

function RelatedLinks({ article }: { article: ArchiveArticle }) {
  if (article.links.length === 0) return null;

  return (
    <section className="archive-links" aria-labelledby="archive-links-title">
      <h2 id="archive-links-title">関連リンク</h2>
      <div className="archive-links__items">
        {article.links.map((link) => (
          <a href={link.url} key={link.url} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}

export function ArchiveArticlePage({ slug }: ArchiveArticlePageProps) {
  const article = getArchiveArticle(slug);
  if (!article) return <ArticleNotFound />;

  const author = authorProfiles[article.author] ?? authorProfiles["dr-yokobo"];
  const dateValue = article.publishedAt || article.createdAt || article.updatedAt;
  const formattedDate = formatDate(dateValue);

  return (
    <div className="read-page">
      <div className="paper-grain" aria-hidden="true" />
      <main className="archive-article">
        <nav className="archive-article__breadcrumb" aria-label="パンくず">
          <a href="/">ラボ</a>
          <span aria-hidden="true">/</span>
          <a href="/read">資料室</a>
          <span aria-hidden="true">/</span>
          <span>{article.title}</span>
        </nav>

        <a className="archive-back-link" href="/read">
          資料室へ戻る
        </a>

        <header className="archive-article__header">
          <p className="archive-article__eyebrow">{article.categories.join(" / ")}</p>
          <h1>{article.title}</h1>
          <div className="archive-article__meta">
            {formattedDate ? <time dateTime={dateValue}>{formattedDate}</time> : null}
            <span>{statusText(article.resultStatus)}</span>
          </div>
          <p>{article.summary}</p>
        </header>

        {article.thumbnail ? (
          <figure className="archive-article__hero">
            <img src={article.thumbnail} alt="" />
          </figure>
        ) : null}

        <section className="archive-article__info-grid" aria-label="記事情報">
          <aside className="archive-author-card">
            <img src={author.image} alt="" />
            <div>
              <small>この記事の担当</small>
              <strong>{author.name}</strong>
              <span>{author.role}</span>
              <p>{author.description}</p>
            </div>
          </aside>
          <aside className="archive-result-card">
            <small>実験結果</small>
            <strong>{statusText(article.resultStatus)}</strong>
            <p>{article.experimentResult}</p>
          </aside>
        </section>

        <article className="archive-markdown" dangerouslySetInnerHTML={{ __html: markdownToHtml(article.body) }} />

        <ArticleGallery article={article} />
        <RelatedLinks article={article} />
      </main>
    </div>
  );
}
