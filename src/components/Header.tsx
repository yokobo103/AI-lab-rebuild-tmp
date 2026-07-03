import { assets } from "../data/assets";

type HeaderProps = {
  variant?: "light" | "dark";
  showNav?: boolean;
};

const contactFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLScgKOrGgMR1S_TlSgRCCjsGQVZpK1PjqJvrX3E2ZdnpjqGC2w/viewform?usp=dialog";

const headerNavLinks = [
  { label: "実験室", href: "/experiments", match: "/experiments" },
  { label: "資料室", href: "/read", match: "/read" },
  { label: "ラボ案内", href: "/about", match: "/about" },
  { label: "感想・お問い合わせ", href: contactFormUrl, external: true },
] as const;

export function Header({ variant = "light", showNav = false }: HeaderProps) {
  const logo = variant === "light" ? assets.brand.logoLight : assets.brand.logoDark;
  const pathname = window.location.pathname;

  return (
    <header className={`site-header site-header--${variant}${showNav ? " site-header--with-nav" : ""}`} aria-label="サイトヘッダー">
      <a className="site-header__brand" href="/" aria-label="よこぼのAIラボ ホーム">
        <img src={logo} alt="よこぼのAIラボ" />
      </a>
      {showNav ? (
        <nav className="site-header__nav" aria-label="ページナビゲーション">
          {headerNavLinks.map((link) => {
            const isCurrent = "match" in link ? pathname === link.match || pathname.startsWith(`${link.match}/`) : false;

            return (
              <a
                key={link.label}
                href={link.href}
                aria-current={isCurrent ? "page" : undefined}
                target={"external" in link && link.external ? "_blank" : undefined}
                rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      ) : null}
    </header>
  );
}
