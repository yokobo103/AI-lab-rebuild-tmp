export type Entrance = {
  id: "play" | "read" | "random";
  title: string;
  body: string;
  buttonLabel: string;
  href: string;
  image: string;
  icon: string;
};

export const entrances: Entrance[] = [
  {
    id: "play",
    title: "遊ぶ",
    body: "ゲームや試作をさわりながら、AIのしくみやアイデアを体験する入口。",
    buttonLabel: "体験格納庫へ",
    href: "/experiments",
    image: "/assets/entrances/play.png",
    icon: "/assets/icons/flask.png",
  },
  {
    id: "read",
    title: "読む",
    body: "作ってみたこと、考えたこと、失敗したことを研究ログでたどる入口。",
    buttonLabel: "研究ログへ",
    href: "/read",
    image: "/assets/entrances/read.png",
    icon: "/assets/icons/book.png",
  },
  {
    id: "random",
    title: "ランダム転送",
    body: "まだ知らない実験へ一気に飛ぶ入口。どこへ行くかはお楽しみ。",
    buttonLabel: "転送してみる",
    href: "/random",
    image: "/assets/entrances/random.png",
    icon: "/assets/icons/transfer.png",
  },
];
