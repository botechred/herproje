import os
from pathlib import Path
from PIL import Image, ImageDraw

ASSETS_DIR = str(Path(__file__).resolve().parent.parent / "assets")
os.makedirs(ASSETS_DIR, exist_ok=True)

ICON_SIZES = [(256, 256), (128, 128), (64, 64), (48, 48), (32, 32), (16, 16)]

def new_canvas(size=1024):
    return Image.new("RGBA", (size, size), (0, 0, 0, 0))

def draw_squircle_badge(draw, size, outer_fill, border_fill, inner_fill):
    pad = 56
    r_outer = 220
    # Drop shadow / subtle depth base
    draw.rounded_rectangle(
        [pad, pad + 14, size - pad, size - pad + 14],
        radius=r_outer,
        fill=(0, 0, 0, 70)
    )
    # Outer bezel
    draw.rounded_rectangle(
        [pad, pad, size - pad, size - pad],
        radius=r_outer,
        fill=outer_fill,
        outline=border_fill,
        width=18
    )
    # Inner recessed plate
    in_pad = pad + 44
    draw.rounded_rectangle(
        [in_pad, in_pad, size - in_pad, size - in_pad],
        radius=r_outer - 36,
        fill=inner_fill
    )

def save_ico(img, filename):
    out_path = os.path.join(ASSETS_DIR, filename)
    # Downsample cleanly with LANCZOS before saving multi-size ICO
    base_256 = img.resize((256, 256), Image.Resampling.LANCZOS)
    base_256.save(out_path, format="ICO", sizes=ICON_SIZES)
    print(f"[OK] Icon uretildi: {out_path}")

def build_new_project_icon():
    """Yeni Proje Olustur: Terracotta & Ivory Blueprint + Precision Plus"""
    S = 1024
    img = new_canvas(S)
    d = ImageDraw.Draw(img)

    draw_squircle_badge(
        d, S,
        outer_fill=(196, 73, 45, 255),     # Terracotta #C4492D
        border_fill=(232, 114, 82, 255),   # Warm highlight edge
        inner_fill=(24, 24, 23, 255)       # Warm Obsidian #181817
    )

    # Subtle architectural blueprint frame lines inside plate
    frame = 210
    d.rounded_rectangle(
        [frame, frame, S - frame, S - frame],
        radius=90,
        outline=(68, 65, 60, 255),
        width=10
    )
    # Corner registration ticks
    tick = 36
    for (x, y, dx, dy) in [
        (frame, frame, 1, 1),
        (S - frame, frame, -1, 1),
        (frame, S - frame, 1, -1),
        (S - frame, S - frame, -1, -1),
    ]:
        d.line([(x, y), (x + dx * tick, y)], fill=(224, 159, 62, 255), width=14)
        d.line([(x, y), (x, y + dy * tick)], fill=(224, 159, 62, 255), width=14)

    # Crisp central Plus (+) symbol in warm ivory
    cx, cy = S // 2, S // 2
    arm = 175
    thick = 44
    ivory = (250, 249, 245, 255)
    d.rounded_rectangle([cx - arm, cy - thick, cx + arm, cy + thick], radius=22, fill=ivory)
    d.rounded_rectangle([cx - thick, cy - arm, cx + thick, cy + arm], radius=22, fill=ivory)

    # Center terracotta precision dot
    d.ellipse([cx - 22, cy - 22, cx + 22, cy + 22], fill=(196, 73, 45, 255))

    save_ico(img, "yeni-proje.ico")

def build_token_guard_icon():
    """Token Koruma Aktif Et: Deep Carbon + Emerald Shield + Amber Lightning"""
    S = 1024
    img = new_canvas(S)
    d = ImageDraw.Draw(img)

    draw_squircle_badge(
        d, S,
        outer_fill=(22, 92, 62, 255),      # Deep Forest Emerald
        border_fill=(64, 182, 126, 255),   # Crisp Emerald Rim
        inner_fill=(18, 22, 20, 255)       # Carbon Dark
    )

    cx = S // 2
    shield = [
        (cx, 185),
        (780, 275),
        (742, 585),
        (cx, 835),
        (282, 585),
        (244, 275),
    ]
    d.polygon(shield, fill=(27, 54, 42, 255))
    for i in range(len(shield)):
        d.line([shield[i], shield[(i + 1) % len(shield)]], fill=(64, 182, 126, 255), width=26)

    # Crisp geometric lightning bolt in Warm Gold/Amber
    bolt = [
        (cx + 48, 275),
        (cx - 115, 515),
        (cx - 8, 515),
        (cx - 62, 740),
        (cx + 125, 475),
        (cx + 14, 475),
    ]
    d.polygon(bolt, fill=(240, 180, 60, 255))
    save_ico(img, "token-guard.ico")

def build_standards_check_icon():
    """Standart Kontrol: Brass/Ochre & Charcoal Precision Audit Check"""
    S = 1024
    img = new_canvas(S)
    d = ImageDraw.Draw(img)

    draw_squircle_badge(
        d, S,
        outer_fill=(184, 126, 32, 255),    # Warm Brass / Ochre
        border_fill=(235, 180, 76, 255),   # Gold highlight
        inner_fill=(25, 26, 28, 255)       # Charcoal plate
    )

    # Three horizontal spec bars + bold check badge
    ivory = (246, 244, 238, 255)
    muted = (92, 95, 102, 255)
    d.rounded_rectangle([240, 270, 650, 322], radius=16, fill=ivory)
    d.rounded_rectangle([240, 390, 560, 442], radius=16, fill=muted)
    d.rounded_rectangle([240, 510, 490, 562], radius=16, fill=muted)

    # Bold verification circle & checkmark on bottom-right
    bx, by, br = 635, 615, 155
    d.ellipse([bx - br, by - br, bx + br, by + br], fill=(224, 159, 62, 255))
    check_pts = [(bx - 68, by + 4), (bx - 16, by + 58), (bx + 76, by - 48)]
    d.line(check_pts, fill=(20, 20, 19, 255), width=38, joint="curve")

    save_ico(img, "standart-kontrol.ico")

def build_run_app_icon():
    """Calistir / Uygulamayi Baslat: Botanical Teal Window + Tactile Play"""
    S = 1024
    img = new_canvas(S)
    d = ImageDraw.Draw(img)

    draw_squircle_badge(
        d, S,
        outer_fill=(24, 104, 96, 255),     # Deep Mineral Teal
        border_fill=(68, 178, 164, 255),   # Seafoam rim
        inner_fill=(20, 25, 26, 255)       # Slate dark
    )

    # Minimal app window header bar + three dots
    d.rounded_rectangle([215, 225, 809, 795], radius=56, outline=(68, 178, 164, 255), width=18)
    d.line([(215, 325), (809, 325)], fill=(68, 178, 164, 255), width=14)
    for idx, col in enumerate([(224, 108, 80), (232, 180, 74), (72, 184, 132)]):
        cx_dot = 280 + idx * 52
        d.ellipse([cx_dot - 14, 275 - 14, cx_dot + 14, 275 + 14], fill=(*col, 255))

    # Crisp Play triangle centered in window body
    play = [
        (435, 425),
        (435, 695),
        (665, 560),
    ]
    d.polygon(play, fill=(250, 249, 245, 255))

    save_ico(img, "calistir-app.ico")

if __name__ == "__main__":
    build_new_project_icon()
    build_token_guard_icon()
    build_standards_check_icon()
    build_run_app_icon()
