#!/usr/bin/env python3
"""
Upscale avatar image using interpolation
"""
from PIL import Image
import os

input_file = r"C:\Users\rajaw\Downloads\anurudh-singh---as.dev-portfolio (2)\src\assets\images\anurudh_animated_avatar.png"

print("Loading avatar image...")
img = Image.open(input_file)
original_size = img.size
print(f"Original size: {original_size}")

# Upscale by 4x using high-quality bicubic interpolation
new_width = original_size[0] * 4
new_height = original_size[1] * 4
print(f"Upscaling to: {new_width}x{new_height}")

img_upscaled = img.resize((new_width, new_height), Image.Resampling.LANCZOS)

# Save with high quality
img_upscaled.save(input_file, quality=95, optimize=False)
print(f"✓ Avatar upscaled successfully to 4x resolution!")
print(f"✓ New size: {img_upscaled.size}")
