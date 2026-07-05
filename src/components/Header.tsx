import { useState } from "react";
import { assets } from "../data/assets";
import { externalRoutes, routes } from "../data/routes";

type HeaderProps = {
  variant?: "light" | "dark";
  showNav?: boolean;
};

const headerNavLinks = [
  { label: "実験室", href: routes.experiments, match: routes.experiments },
  { label: "資料室", href: routes.read, match: routes.read },
  { label: "ラボ案内", href: routes.about, match: routes.about },
  { label: "感想・お問い合わせ", href: externalRoutes.contact, external: true },
] as const;

export function Header({ variant = "light", showNav = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logo = variant === "light" ? assets.brand.logoLight : assets.brand.logoDark;
  const pathname = window.location.pathname;
  const navId = "site-header-nav";
  const shouldRenderNav = showNav || isMenuOpen;

  return (
    <header
      className={`site-header site-header--${variant}${showNav ? " site-header--with-nav" : ""}${isMenuOpen ? " site-header--menu-open" : ""}`}
      aria-label="サイトヘッダー"
    >
      <a className="site-header__brand" href={routes.home} aria-label="よこぼのAIラボ ホーム">
        <img src={logo} alt="よこぼのAIラボ" />
      </a>
      {!showNav ? (
        <button
          className="site-header__menu-button"
          type="button"
          aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-controls={navId}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      ) : null}
      {shouldRenderNav ? (
        <nav id={navId} className="site-header__nav" aria-label="ページナビゲーション">
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
