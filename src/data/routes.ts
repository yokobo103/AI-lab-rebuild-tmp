// Route map for the redesign repo and migration notes for the current Next.js site.
// These comments double as the first draft of the 301 redirect table.
export const routes = {
  home: "/", // current site: /
  experiments: "/experiments", // current site: public works / experience area
  experimentsExplore: "/experiments/explore", // current site: no direct equivalent yet
  read: "/read", // current site: /posts
  about: "/about", // current site: /about
  readArticle(slug: string) {
    return `/read/${encodeURIComponent(slug)}`; // current site: /posts/[slug]
  },
  readExperimentFilter(experimentId: string) {
    return `/read?experiment=${encodeURIComponent(experimentId)}`; // current site: no direct equivalent yet
  },
  experimentDetail(slug: string) {
    return `/experiments/${slug}`; // current site: individual public work URL, mapping TBD
  },
  experimentAnchor(dest: string) {
    return `/experiments#${encodeURIComponent(dest)}`; // current site: no direct equivalent yet
  },
} as const;

export const externalRoutes = {
  contact:
    "https://docs.google.com/forms/d/e/1FAIpQLScgKOrGgMR1S_TlSgRCCjsGQVZpK1PjqJvrX3E2ZdnpjqGC2w/viewform?usp=dialog",
  podcast: "https://open.spotify.com/show/033vTuXONCeGCsiffRWoNM",
  x: "https://x.com/yokobo_ai",
} as const;

export const plannedRoutes = {
  podcast: "/podcast",
  tags: "/tags", // Future: generate a tag index from article/log tags.
  randomTransfer: "/random",
} as const;
