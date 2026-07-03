# よこぼAIラボ トップページ アニメーション仕様

## Principle

動きは「迎えられている感じ」と「少しワクワクする研究所感」を出すための補助にします。派手な点滅、大きな移動、スクロールを待たせる演出は使いません。

## First View Sequence

Total target: about `1.5s` to `2.0s`.

| Timing | Element | Motion |
| --- | --- | --- |
| `0ms` | Background / transfer hall | Immediate display, no blank wait |
| `100-300ms` | Main heading | Fade in + `translateY(8px -> 0)` |
| `200-400ms` | Subcopy | Fade in + `translateY(6px -> 0)` |
| `300-800ms` | Characters, if present | Fade in + tiny float settle |
| `600-1200ms` | CTA and entrance cards | Staggered fade in, `80ms` gap per item |

## Desktop Motion

- Hero text: `500ms`, `cubic-bezier(.2,.8,.2,1)`.
- CTA: `420ms`, starts after hero text.
- Entrance cards: `520ms`, staggered by `80ms`.
- Subtle ambient float is allowed only for decorative icons or character art, within `1-2px`.

## Mobile Motion

- Shorten durations by about `20%`.
- Prioritize immediate tap targets.
- Do not animate cards only after scroll position; if reveal-on-scroll is used, cards must still appear quickly and predictably.

## Hover / Active

Buttons:

- Hover: `translateY(-2px)`, cyan glow, slight border brightening.
- Active: `translateY(0) scale(.99)`.

Cards:

- Hover: `translateY(-4px) scale(1.01)`.
- Border glow increases subtly.
- Inner image may scale to `1.025`.

Random transfer:

- Portal card may use a slightly stronger cyan/gold glow on hover.
- Do not animate with rapid pulsing or flashing.

## Accessibility

Under `prefers-reduced-motion: reduce`:

- Disable transform-based entrance animations.
- Disable floating loops.
- Keep hover color/border changes but remove movement.
- Set animation and transition durations to near-zero, except essential state changes.

## Implementation Hooks

Recommended classes:

- `.motion-fade-up`
- `.motion-stagger`
- `.motion-delay-1` through `.motion-delay-5`
- `.entrance-card--random` for a slightly stronger portal hover state

