const contactFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLScgKOrGgMR1S_TlSgRCCjsGQVZpK1PjqJvrX3E2ZdnpjqGC2w/viewform?usp=dialog";

const footerGroups = [
  {
    title: "メインエリア",
    links: [
      { label: "実験室", href: "/experiments" },
      { label: "資料室", href: "/read" },
    ],
  },
  {
    title: "ラボのこと",
    links: [
      { label: "ラボ案内", href: "/about" },
      { label: "感想・お問い合わせ", href: contactFormUrl, external: true },
    ],
  },
  {
    title: "外部活動",
    links: [
      { label: "ポッドキャスト ↗", href: "https://open.spotify.com/show/033vTuXONCeGCsiffRWoNM", external: true },
      { label: "note ↗", disabled: true },
      { label: "X ↗", href: "https://x.com/yokobo_ai", external: true },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="top-page-shell site-footer__inner">
        {footerGroups.map((group) => (
          <nav className="site-footer__group" aria-label={group.title} key={group.title}>
            <h2>{group.title}</h2>
            <ul>
              {group.links.map((link) => (
                <li key={link.label}>
                  {"href" in link ? (
                    <a
                      href={link.href}
                      target={"external" in link && link.external ? "_blank" : undefined}
                      rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <span aria-disabled="true">{link.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
    </footer>
  );
}
