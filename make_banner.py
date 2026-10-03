import sys
import os

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow"])
    from PIL import Image, ImageDraw, ImageFont

bg_path = r"C:\Users\ferna\.gemini\antigravity-ide\brain\da0df06b-7f9f-4e46-8ba5-602fe1a0e312\tech_bg_1789072076868.jpg"
output_path = r"c:\Users\ferna\GitHub\perfil_fernando_pedernera\portfolio\img\preview.png"

# Open background
img = Image.open(bg_path).convert("RGBA")

target_w, target_h = 1200, 630
img_w, img_h = img.size

aspect = target_w / target_h
img_aspect = img_w / img_h

if img_aspect > aspect:
    new_w = int(img_h * aspect)
    left = (img_w - new_w) // 2
    img = img.crop((left, 0, left + new_w, img_h))
else:
    new_h = int(img_w / aspect)
    top = (img_h - new_h) // 2
    img = img.crop((0, top, img_w, top + new_h))

# In older pillow versions, LANCZOS might be Image.LANCZOS
try:
    resample_filter = Image.Resampling.LANCZOS
except AttributeError:
    resample_filter = Image.LANCZOS

img = img.resize((target_w, target_h), resample_filter)

font_path_large = None
font_path_small = None
if os.path.exists(r"C:\Windows\Fonts\segoeuib.ttf"):
    font_path_large = r"C:\Windows\Fonts\segoeuib.ttf"
    font_path_small = r"C:\Windows\Fonts\segoeui.ttf"
elif os.path.exists(r"C:\Windows\Fonts\arialbd.ttf"):
    font_path_large = r"C:\Windows\Fonts\arialbd.ttf"
    font_path_small = r"C:\Windows\Fonts\arial.ttf"

if font_path_large:
    # Reduce font sizes significantly for the "Safe Zone"
    font_title = ImageFont.truetype(font_path_large, 65)
    font_subtitle = ImageFont.truetype(font_path_small, 35)
else:
    font_title = ImageFont.load_default()
    font_subtitle = ImageFont.load_default()

title = "Fernando Pedernera"
subtitle = "AI & Machine Learning Engineer"

draw = ImageDraw.Draw(img)

try:
    bbox1 = draw.textbbox((0, 0), title, font=font_title)
    w1 = bbox1[2] - bbox1[0]
    bbox2 = draw.textbbox((0, 0), subtitle, font=font_subtitle)
    w2 = bbox2[2] - bbox2[0]
except AttributeError:
    w1, h1 = draw.textsize(title, font=font_title)
    w2, h2 = draw.textsize(subtitle, font=font_subtitle)

overlay = Image.new('RGBA', img.size, (0, 0, 0, 80))
img = Image.alpha_composite(img, overlay)
draw = ImageDraw.Draw(img)

# Center vertically and horizontally, closer to the middle
# Total height is 630. Center is 315.
# Title at 270, subtitle at 340
draw.text(((target_w - w1) // 2, 260), title, font=font_title, fill=(255, 255, 255, 255))
draw.text(((target_w - w2) // 2, 340), subtitle, font=font_subtitle, fill=(0, 150, 136, 255))

img.convert("RGB").save(output_path)
print("Saved preview.png successfully!")
