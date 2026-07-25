import articles from "./archiveArticles.json";

export type ArchiveArticle = {
  id: string;
  logId: string;
  title: string;
  summary: string;
  author: string;
  experimentResult: string;
  resultStatus: string;
  category: string;
  categories: string[];
  status: "draft" | "public";
  tags: string[];
  thumbnail: string;
  images: string[];
  body: string;
  links: { label: string; url: string }[];
  createdAt: string;
  publishedAt?: string;
  updatedAt: string;
  sourceRepo: string;
};

export const archiveArticles = articles as ArchiveArticle[];

export function getArchiveArticle(slug: string) {
  return archiveArticles.find((article) => article.id === slug && article.status === "public") ?? null;
}
