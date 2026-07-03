const updates = [
  {
    date: "2026.07.03",
    title: "トップページの入口まわりを整理しました。",
  },
  {
    date: "2026.06.22",
    title: "発見ログ「体験格納庫をつくってみた」を追加しました。",
  },
];

export function TeaserSection() {
  return (
    <section className="teaser-section" aria-labelledby="teaser-title">
      <div className="top-page-shell">
        <div className="section-heading section-heading--compact">
          <p>News</p>
          <h2 id="teaser-title">更新情報</h2>
        </div>
        <div className="updates-list">
          {updates.map((item) => (
            <article className="update-item" key={`${item.date}-${item.title}`}>
              <time dateTime={item.date.replaceAll(".", "-")}>{item.date}</time>
              <p>{item.title}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
