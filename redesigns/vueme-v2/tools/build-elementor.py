"""Builds elementor/vueme-home.json: an Elementor template (Import Templates) from index.html.
One HTML widget per page section, styles first, scripts last. Run from redesigns/vueme-v2."""
import json, re, random, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
src = (root / 'index.html').read_text(encoding='utf-8')
read = lambda p: (root / p).read_text(encoding='utf-8')

SITE = 'https://vueme.in/index.php/'
CAT = SITE + 'product-category/digital-business-card/'
# Template buttons go to the real product pages. Only Bento's address is confirmed; the rest use the category page.
TPL_URL = {'aria': CAT, 'bento': SITE + 'product/bento-digital-business-card-with-location/', 'spotlight': CAT, 'bauhaus': CAT}

head = src[:src.index('</head>')]
body = src[src.index('<body>') + 6:src.index('</body>')]

fonts = '\n'.join(re.findall(r'<link (?:rel="preconnect"|href="https://fonts)[^>]*>', head))
page_css = re.search(r'<style>(.*)</style>', head, re.S).group(1)
css = read('assets/vueme.css') + read('assets/cards.css') + page_css
def scope(css, pre='.vueme-page'):
    """Prefix selectors so Vueme styles outrank theme and Elementor-kit styles. html/body/:root/.toast stay global."""
    out, i, n = [], 0, len(css)
    while i < n:
        j = css.find('{', i)
        if j < 0: out.append(css[i:]); break
        head = css[i:j].strip()
        depth, k = 1, j + 1
        while depth:
            depth += {'{': 1, '}': -1}.get(css[k], 0); k += 1
        block = css[j + 1:k - 1]
        if head.startswith('@media') or head.startswith('@supports'):
            out.append(f'{head}{{{scope(block, pre)}}}')
        elif head.startswith('@'):
            out.append(f'{head}{{{block}}}')
        else:
            sels = []
            for s in re.split(r',(?![^()]*\))', head):
                s = s.strip()
                if not s: continue
                if re.match(r'(html|body|:root|\.toast)\b', s): sels.append(s)
                elif s == '*' or s.startswith('*'): sels.append(f'{pre} {s}')
                else: sels.append(f'{pre} {s}')
            out.append(f"{','.join(sels)}{{{block}}}")
        i = k
    return '\n'.join(out)
css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
css = scope(css)
css += '\n.vueme-page h1,.vueme-page h2,.vueme-page h3,.vueme-page h4,.vueme-page p,.vueme-page li,.vueme-page dt,.vueme-page dd,.vueme-page summary{font-family:inherit;text-transform:none;color:inherit}'
css += '\n.vueme-page{font-family:var(--sans);color:var(--ink);font-size:16px;line-height:1.55;background:#fff}'
# keep the page's own look inside the theme: hide nothing, but reset Elementor's widget spacing
css += '\n.elementor-widget-html{margin-bottom:0!important}.vueme-page .elementor-widget-wrap,.vueme-page .elementor-column{padding:0!important}\n'

# links to prototype-only pages -> live vueme.in pages
body = body.replace('href="index.html"', 'href="https://vueme.in/"')
body = body.replace('href="dashboard.html"', f'href="{SITE}my-account/"')
body = body.replace('href="editor-digital.html?template=aria"', f'href="{TPL_URL["aria"]}"')
body = body.replace('editor-digital.html?template=${t.id}', '${TPL_URL[t.id]}')
body = body.replace("'editor-digital.html?template=' + id", 'TPL_URL[id]')
assert 'editor-' not in body and 'dashboard.html' not in body, 'unmapped prototype link'
body = body.replace('<main id="main">', '').replace('</main>', '').replace('<section class="hero">', '<section class="hero" id="main">', 1)

scripts_at = body.index('<script')
markup, scripts = body[:scripts_at], body[scripts_at:]
def inline(m):
    js = read(m.group(1)).replace('</script', '<\\/script')
    return f'<script>\n{js}\n</script>'
scripts = re.sub(r'<script src="([^"]+)"></script>', inline, scripts)
scripts = scripts.replace('<script>\n(() => {', '<script>\nconst TPL_URL = ' + json.dumps(TPL_URL) + ';\n(() => {', 1)
# vueme.js hydrates icons on DOMContentLoaded; Elementor may run scripts after it, so hydrate again
scripts += '\n<script>window.Vueme && (Vueme.hydrateIcons(), document.querySelector(".nav-menu") && 0);</script>'

# split markup at top-level boundaries
cuts = [m.start() for m in re.finditer(r'\n(?=<(?:header|section|div class="(?:promo|marquee|mbar)"|footer|a class="(?:skip|wa-fab)"|!-- ))', markup)]
parts, prev = [], 0
for c in cuts + [len(markup)]:
    chunk = markup[prev:c].strip()
    if chunk:
        if parts and re.fullmatch(r'<!--.*?-->', parts[-1], re.S):  # attach comment to the next block
            chunk = parts.pop() + '\n' + chunk
        parts.append(chunk)
    prev = c
parts = [p for p in parts]

def name(html):
    m = re.match(r'(?:<!--\s*(.*?)\s*-->)', html)
    if m: return re.sub(r'\s*\(.*?\)', '', m.group(1)).title()
    m = re.match(r'<(\w+)[^>]*?(?:id="([^"]+)"|class="([^" ]+))', html)
    return (m.group(2) or m.group(3) or m.group(1)).replace('-', ' ').title() if m else 'Block'

rid = lambda: '%07x' % random.getrandbits(28)
def widget(title, html):
    return {'id': rid(), 'elType': 'widget', 'widgetType': 'html', 'isInner': False, 'elements': [],
            'settings': {'html': html, '_title': title, '_margin': {'unit': 'px', 'top': '0', 'right': '0', 'bottom': '0', 'left': '0', 'isLinked': True}}}
widgets = [widget('Vueme styles & fonts (keep first)', fonts + '\n<style>\n' + css + '\n</style>')]
widgets += [widget(name(p), p) for p in parts]
widgets.append(widget('Vueme scripts (keep last)', scripts))

section = {'id': rid(), 'elType': 'section', 'isInner': False,
           'settings': {'layout': 'full_width', 'gap': 'no', 'css_classes': 'vueme-page',
                        'padding': {'unit': 'px', 'top': '0', 'right': '0', 'bottom': '0', 'left': '0', 'isLinked': True}},
           'elements': [{'id': rid(), 'elType': 'column', 'isInner': False,
                         'settings': {'_column_size': 100, '_inline_size': None,
                                      'padding': {'unit': 'px', 'top': '0', 'right': '0', 'bottom': '0', 'left': '0', 'isLinked': True}},
                         'elements': widgets}]}
tpl = {'version': '0.4', 'title': 'Vueme Home (Diwali)', 'type': 'page',
       'page_settings': {'template': 'elementor_canvas', 'hide_title': 'yes'}, 'content': [section]}
out = root / 'elementor'; out.mkdir(exist_ok=True)
(out / 'vueme-home.json').write_text(json.dumps(tpl, ensure_ascii=False), encoding='utf-8')
for w in widgets: print(f"{len(w['settings']['html'])//1024:>4} KB  {w['settings']['_title']}")
