# AGENTS.md

## 基本ルール

- このリポジトリは `C:\Users\Yokob\playground\20260628_webサイト大改修` 配下のプロジェクトである。
- 作業を始める前に HQ（`C:\Users\Yokob\playground\_LAB_HQ`）の `NOW.md` と `PROJECT_INDEX.md` を確認する。
- 通常の inbox 作成依頼は、このリポジトリではなく HQ の `inbox/` に送る。
- inbox の詳細は HQ の `INBOX_RULE.md` を参照し、可能なら HQ の `tools/create_inbox.py` を使う。
- inbox の本文冒頭には、実際の書き手（`Codex`、`Opus 4.8` など）と、必要に応じて立場を明記する。
- 用途が不明なファイルを勝手に削除しない。
- CSS レイアウト作業の前に `docs/css-pitfalls.md`（過去にハマった罠と回避方針）に目を通す。新しく踏んだら追記する。

## 触ってよい範囲

- `src/`
- `assets/`
- `public/`
- `styles/`
- `docs/`
- `tools/`
- `index.html`
- `vite.config.ts`
- `tsconfig.json`
- `package.json`

## 触る前に注意するもの

- `dist/` と `tsconfig.tsbuildinfo` は生成物として扱い、必要性を確認してから変更する。
- `node_modules/` は編集しない。
- `.agents/` と `.git/` は移動しない。
- 主戦場をこのリポジトリへ移すかは未確定。よこぼ判断待ちとして扱う。
- 状況が変わった作業の終了時は、HQ の `NOW.md` / `PROJECT_INDEX.md` / `reports/` のどこへ戻すか確認する。
