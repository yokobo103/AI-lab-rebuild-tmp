import { routes } from "./routes";

export type LogStatus = "success" | "tuning" | "fail" | null;
export type LogCategory = "開発ログ" | "考えたこと" | "失敗の記録" | "お知らせ";

export type ResearchLog = {
  id: string;
  date: string;
  status: LogStatus;
  category: LogCategory;
  title: string;
  excerpt: string;
  tags: string[];
  dest?: string;
  href?: string;
  thumbnail?: string;
  slug: string;
};

export const logCategories = ["すべて", "開発ログ", "考えたこと", "失敗の記録", "お知らせ"] as const;

export type LogFilter = (typeof logCategories)[number];

export const researchLogs: ResearchLog[] = [
  {
    id: "LOG-042",
    date: "2026.06.21",
    status: "tuning",
    category: "開発ログ",
    title: "ニャビットの相づちに「間」を入れてみた",
    excerpt:
      "間にことばを詰め込むより、0.4秒だけ待ったら、急に“考えてる感”が出た。Live2Dの動きと間欠合わせるのが地味に大変だった話。",
    tags: ["開発ログ", "Live2D", "対話設計"],
    dest: "DEST-005",
    slug: "nyabit-pause-reaction",
  },
  {
    id: "LOG-041",
    date: "2026.06.14",
    status: "fail",
    category: "失敗の記録",
    title: "ワールド生成のシード固定、3回やって3回壊れた",
    excerpt:
      "同じ入力で同じ地形が出るはずが、浮島が横倒しにずれていく。原因は同期済みの読み込み順だった。直したら5分、何も疑すべきだったかのメモ。",
    tags: ["失敗の記録", "3D", "生成"],
    dest: "DEST-001",
    slug: "world-seed-failure",
  },
  {
    id: "LOG-040",
    date: "2026.06.07",
    status: "success",
    category: "開発ログ",
    title: "AIボイスのピッチ揺れを、書き出し前に抑える",
    excerpt:
      "合成音声の品質は決まっている、と思う安定になっていた。前処理で抑制を一段足したらかなり聞き取れやすくなった。設定値を紙に残しておく。",
    tags: ["開発ログ", "音声", "Style-Bert-VITS2"],
    dest: "DEST-007",
    slug: "voice-pitch-preprocess",
  },
  {
    id: "LOG-039",
    date: "2026.05.30",
    status: null,
    category: "考えたこと",
    title: "なぜ「遊ぶ」と「読む」を分けたのか",
    excerpt:
      "触って楽しむ気持ちと、じっくり読む気持ちは別物だと思う。同じ画面に何方もまとめると、どちらも中途半端になる。分けた二つの部屋に切った理由について。",
    tags: ["考えたこと", "設計"],
    slug: "play-and-read",
  },
  {
    id: "LOG-038",
    date: "2026.05.22",
    status: null,
    category: "お知らせ",
    title: "資料室、はじめます",
    excerpt:
      "これまで散らばっていた開発メモや考えごとを、一か所に集める部屋を作りました。読むもの中心の、静かな入口です。",
    tags: ["お知らせ"],
    slug: "archive-open",
  },
];

export function destUrl(dest: string) {
  return routes.experimentAnchor(dest);
}

export function statusLabel(status: LogStatus) {
  if (status === "success") return "成功";
  if (status === "tuning") return "調整中";
  if (status === "fail") return "失敗";
  return null;
}
