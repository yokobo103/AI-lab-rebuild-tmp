import { routes } from "./routes";

export type LabExperiment = {
  id: string;
  title: string;
  summary: string;
  href: string;
  image: string;
  status: "LIVE" | "HOT" | "NEW" | "LAB";
  category: string;
  tags: string[];
  featured?: boolean;
};

export const labExperiments: LabExperiment[] = [
  {
    id: "DEST-001",
    title: "よこぼワールド・ビルダー",
    summary: "AIといっしょに、3Dの世界をつくって冒険しよう。",
    href: routes.experimentDetail("world-builder"),
    image: "/assets/entrances/play.png",
    status: "LIVE",
    category: "3D・AR",
    tags: ["3D・AR", "ワールド生成", "教育"],
    featured: true,
  },
  {
    id: "DEST-002",
    title: "ニャビット通訳ラボ",
    summary: "リアルタイム翻訳を、もっとやさしく自然に。",
    href: routes.experimentDetail("translator"),
    image: "/assets/hero/entrance-pc.png",
    status: "HOT",
    category: "ツール",
    tags: ["翻訳", "音声認識", "多言語"],
  },
  {
    id: "DEST-003",
    title: "ピクセル冒険RPG",
    summary: "AIがつくる、毎回ちがう冒険の始まり。",
    href: routes.experimentDetail("pixel-rpg"),
    image: "/assets/entrances/read.png",
    status: "NEW",
    category: "ゲーム",
    tags: ["ゲーム", "自動生成", "ピクセル"],
  },
  {
    id: "DEST-004",
    title: "3Dスキャン工房",
    summary: "写真から3Dモデルをつくってみよう。",
    href: routes.experimentDetail("scan-studio"),
    image: "/assets/entrances/random.png",
    status: "LIVE",
    category: "3D・AR",
    tags: ["3D・AR", "スキャン", "モデリング"],
  },
  {
    id: "DEST-005",
    title: "ニャビット会話",
    summary: "なんでも気軽に相談できるAIチャット。",
    href: routes.experimentDetail("nyabit-chat"),
    image: "/assets/characters/nyabit.png",
    status: "NEW",
    category: "プロト",
    tags: ["ツール", "AIチャット", "相談"],
  },
  {
    id: "DEST-006",
    title: "レトロWebラボ",
    summary: "なつかしいWeb体験を、もう一度。",
    href: routes.experimentDetail("retro-web"),
    image: "/assets/hero/entrance-sp.png",
    status: "LIVE",
    category: "Web",
    tags: ["Web", "レトロ", "インタラクティブ"],
  },
  {
    id: "DEST-007",
    title: "AIボイス・スタジオ",
    summary: "声をつくる、演じる、音声を楽しむ。",
    href: routes.experimentDetail("voice-studio"),
    image: "/assets/entrances/play.png",
    status: "HOT",
    category: "動画・音声",
    tags: ["音声", "音声合成", "ボイスチェンジ"],
  },
  {
    id: "DEST-008",
    title: "映像プロンプト装置",
    summary: "短い言葉から、映像の設計図を組み立てる。",
    href: routes.experimentDetail("prompt-cinema"),
    image: "/assets/entrances/random.png",
    status: "LAB",
    category: "動画・音声",
    tags: ["動画", "プロンプト", "構成"],
  },
  {
    id: "DEST-009",
    title: "ランダム発明箱",
    summary: "今日の思いつきを、すぐ試作品に変えてみる。",
    href: routes.experimentDetail("invention-box"),
    image: "/assets/entrances/read.png",
    status: "NEW",
    category: "プロト",
    tags: ["発想", "プロト", "実験"],
  },
];

export const labCategories = ["すべて", "ゲーム", "3D・AR", "ツール", "Web", "動画・音声", "プロト"];
