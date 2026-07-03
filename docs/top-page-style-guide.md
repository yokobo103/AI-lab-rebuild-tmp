# よこぼAIラボ トップページ スタイルガイド

## Reference Interpretation

`reference/` の資料は、青い近未来ラボをベースにしつつ、アイボリーの紙面感と丸いUIで親しみを出す方向です。主役は強いサイバーパンクではなく、明るい転送ホール、控えめなシアン発光、肉球モチーフ、Dr.よこぼとニャビットのやさしい研究所感です。

入口カードは `reference/PC_top_image.png` と `reference/top_plan.png` のように、3つとも同じアーチ型ゲートユニットとして扱います。画像内にはタイトルやボタン文言を入れず、HTML/CSS側でテキストとCTAを重ねる前提にします。

## Assets

Generated with built-in `imagegen`.

| 用途 | ファイル |
| --- | --- |
| 遊ぶ入口カード 16:9推奨版 | `assets/top/entrance-play-card.png` |
| 読む入口カード 16:9推奨版 | `assets/top/entrance-read-card.png` |
| ランダム転送入口カード 16:9推奨版 | `assets/top/entrance-random-card.png` |
| 遊ぶ入口カード元生成 | `assets/top/entrance-play.png` |
| 読む入口カード元生成 | `assets/top/entrance-read.png` |
| ランダム転送入口カード元生成 | `assets/top/entrance-random.png` |
| アイコンシート透過PNG | `assets/top/icons-sheet.png` |
| 肉球アイコン | `assets/top/icon-paw.png` |
| フラスコアイコン | `assets/top/icon-flask.png` |
| 本アイコン | `assets/top/icon-book.png` |
| 転送アイコン | `assets/top/icon-transfer.png` |

## Design Tokens

Use `styles/top-page.css` as the implementation source. Keep colors centralized in CSS custom properties.

| Token | Value | Role |
| --- | --- | --- |
| `--lab-navy` | `#0B1D33` | Text, dark frames |
| `--lab-blue` | `#1E5BA5` | Primary frames and buttons |
| `--lab-cyan` | `#4FD1E8` | Glow and active accents |
| `--lab-ivory` | `#FFF7EB` | Body/page base |
| `--lab-mist` | `#EAF2F8` | Pale section background |
| `--lab-blue-gray` | `#8FA4B9` | Secondary borders/text |
| `--lab-soft-beige` | `#F5E7CF` | Warm panels |
| `--lab-gold` | `#F2C35F` | Random transfer accent |
| `--lab-log-green` | `#4E8A4F` | Reading/log accent |

## Background Rules

Body background uses warm ivory. Section surfaces use pale lab mist or ivory panels with thin navy-blue borders. Hero images should switch by viewport: PC uses the wide transfer hall, SP uses the vertical/mobile transfer hall.

For text on images, add a restrained dark overlay via `::before`; do not bake text into the image. Paw watermarks are allowed only as low-opacity decoration on quiet areas.

## Button Rules

Use `.lab-button`.

- Height: `56px` on desktop, `52px` on small screens.
- Radius: about `18px`.
- Content: icon, label, right arrow.
- Hover: `translateY(-2px)` and a soft cyan glow.
- Active: slight press-in.
- Variants: `.lab-button--primary`, `.lab-button--log`, `.lab-button--random`.

## Card Rules

Use `.entrance-card` with an image and overlay content. The three cards must keep the same structure: image, top icon slot, title/description area, CTA at the lower band. Use variant classes only for accent color differences.

Desktop uses 3 columns. Under `768px`, stack cards vertically and keep each card tappable with stable height.

## Image Overlay Rules

Use `object-fit: cover` for all card and hero images. Keep card images as background-like assets and put all readable copy in HTML. Add a darker lower gradient so the CTA remains readable, especially on the random transfer card.

## Motion Rules

Motion is defined in `docs/top-page-animation-spec.md`. All hover/fade animations must be disabled or minimized under `prefers-reduced-motion: reduce`.
