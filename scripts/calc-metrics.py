"""Calculate font metric fallback overrides for Source Sans Pro and Playfair Display."""

# Custom font metrics (extracted from our woff2 files)
# Playfair Display (all weights share same metrics)
pf = {
    'upem': 1000,
    'ascent': 1082,
    'descent': 251,
    'xheight': 514,
    'capheight': 708,
}

# Source Sans Pro (using Regular values; Light/SemiBold slightly differ)
ssp = {
    'upem': 1000,
    'ascent': 984,
    'descent': 273,
    'xheight': 486,  # Light=480, Regular=486, SemiBold=491
    'capheight': 660,
}

# Well-known fallback font metrics (x-height ratios from font tables)
fallbacks = {
    'Arial':         {'xheight': 519, 'ascent': 800, 'descent': 200},
    'Helvetica Neue': {'xheight': 517, 'ascent': 998, 'descent': 218},
    'Roboto':        {'xheight': 528, 'ascent': 800, 'descent': 200},
    'Segoe UI':      {'xheight': 525, 'ascent': 800, 'descent': 200},
    'Georgia':       {'xheight': 458, 'ascent': 800, 'descent': 200},
    'Noto Serif':    {'xheight': 468, 'ascent': 800, 'descent': 200},
}


def calc_size_adjust(custom_xh, fallback_fb):
    """size-adjust scales fallback font so its x-height matches custom."""
    return (custom_xh / fallback_fb['xheight']) * 100


def calc_ascent_override(custom_ascent, size_adj):
    """ascent-override: scale custom ascent by size-adjust factor."""
    return custom_ascent / (size_adj / 100) / 1000 * 100


def calc_descent_override(custom_descent, size_adj):
    """descent-override: scale custom descent by size-adjust factor."""
    return custom_descent / (size_adj / 100) / 1000 * 100


print("=" * 80)
print("SOURCE SANS PRO FALLBACKS")
print("=" * 80)
for name in ['Arial', 'Helvetica Neue', 'Roboto']:
    fb = fallbacks[name]
    sa = calc_size_adjust(ssp['xheight'], fb)
    ao = calc_ascent_override(ssp['ascent'], sa)
    dro = calc_descent_override(ssp['descent'], sa)
    print(f"\n{name}:")
    print(f"  size-adjust:       {sa:.1f}%")
    print(f"  ascent-override:   {ao:.1f}%")
    print(f"  descent-override:  {dro:.1f}%")
    print(f"  line-gap-override: 0%")

print()
print("=" * 80)
print("PLAYFAIR DISPLAY FALLBACKS")
print("=" * 80)
for name in ['Georgia', 'Noto Serif']:
    fb = fallbacks[name]
    sa = calc_size_adjust(pf['xheight'], fb)
    ao = calc_ascent_override(pf['ascent'], sa)
    dro = calc_descent_override(pf['descent'], sa)
    print(f"\n{name}:")
    print(f"  size-adjust:       {sa:.1f}%")
    print(f"  ascent-override:   {ao:.1f}%")
    print(f"  descent-override:  {dro:.1f}%")
    print(f"  line-gap-override: 0%")