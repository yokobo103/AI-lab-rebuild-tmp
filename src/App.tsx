import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { TeaserSection } from "./components/TeaserSection";
import { Footer } from "./components/Footer";
import { LabExperimentPage } from "./components/LabExperimentPage";
import { ReadArchivePage } from "./components/ReadArchivePage";
import { ArchiveArticlePage } from "./components/ArchiveArticlePage";
import { AboutLabPage } from "./components/AboutLabPage";

export default function App() {
  const readArticleMatch = window.location.pathname.match(/^\/read\/([^/]+)\/?$/);
  if (readArticleMatch?.[1]) {
    return (
      <>
        <Header variant="dark" showNav />
        <ArchiveArticlePage slug={decodeURIComponent(readArticleMatch[1])} />
      </>
    );
  }

  if (window.location.pathname === "/read" || window.location.pathname === "/read/") {
    return (
      <>
        <Header variant="dark" showNav />
        <ReadArchivePage />
      </>
    );
  }

  if (window.location.pathname.startsWith("/experiments")) {
    return (
      <>
        <Header variant="light" showNav />
        <LabExperimentPage />
      </>
    );
  }

  if (window.location.pathname === "/about" || window.location.pathname === "/about/") {
    return (
      <>
        <Header variant="dark" showNav />
        <AboutLabPage />
      </>
    );
  }

  return (
    <div className="top-page">
      <Header variant="light" />
      <main>
        <HeroSection />
        <TeaserSection />
      </main>
      <Footer />
    </div>
  );
}
