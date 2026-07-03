from pathlib import Path

from PIL import Image


SPECS = [
    (
        Path("assets/generated/play-flask-hover-sprite"),
        "play-flask",
        Path("public/assets/cta-sprites/play-flask-hover-sprite.png"),
    ),
    (
        Path("assets/generated/read-book-hover-sprite"),
        "read-book",
        Path("public/assets/cta-sprites/read-book-hover-sprite.png"),
    ),
]


def assemble_strip(folder: Path, prefix: str, output: Path) -> None:
    frames = [Image.open(folder / f"{prefix}-{index}.png").convert("RGBA") for index in range(1, 9)]
    width, height = frames[0].size
    strip = Image.new("RGBA", (width * len(frames), height), (0, 0, 0, 0))

    for index, frame in enumerate(frames):
        strip.paste(frame, (index * width, 0))

    folder.joinpath("strip-transparent.png").parent.mkdir(parents=True, exist_ok=True)
    strip.save(folder / "strip-transparent.png")
    output.parent.mkdir(parents=True, exist_ok=True)
    strip.save(output)
    print(f"{output} {strip.size[0]}x{strip.size[1]}")


def main() -> None:
    for folder, prefix, output in SPECS:
        assemble_strip(folder, prefix, output)


if __name__ == "__main__":
    main()
