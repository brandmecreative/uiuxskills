/* Vueme redesign v2 — shared UI: icons, card renderers, QR, nav, toast.
   Exposes window.Vueme. Needs assets/vendor/qrcode.js loaded first for QR codes. */
(function () {
  'use strict';

  // ---------- icons (Lucide-style strokes) ----------
  const P = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
    qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3"/>',
    nfc: '<path d="M8 8.3a6 6 0 0 1 0 7.4M11.5 5.5a10 10 0 0 1 0 13M15 3a14 14 0 0 1 0 18"/>',
    print: '<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    pin: '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
    save: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
    edit: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
    upload: '<path d="M12 21V9M7 14l5-5 5 5M5 3h14"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    bag: '<path d="M6 7h12l1 14H5L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    flip: '<path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
    tap: '<path d="M9 11V5a2 2 0 0 1 4 0v6"/><path d="M13 10a2 2 0 0 1 4 0v2a2 2 0 0 1 4 0v3a7 7 0 0 1-7 7h-1a7 7 0 0 1-6-3.4L4 15a2 2 0 0 1 3.4-2l1.6 2V11"/>',
    up: '<path d="m6 15 6-6 6 6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    truck: '<path d="M1 3h15v13H1zM16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
    sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
  };
  const FILLED = {
    whatsapp: '<path fill="currentColor" stroke="none" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/>',
    linkedin: '<path fill="currentColor" stroke="none" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4z"/>',
    facebook: '<path fill="currentColor" stroke="none" d="M14 8.5V6.8c0-.8.5-1 .9-1H17V2.1L14.1 2C10.9 2 10.2 4.4 10.2 6v2.5H8V12h2.2v10H14V12h2.7l.4-3.5z"/>',
  };
  function icon(name, cls) {
    const body = P[name] || FILLED[name] || '';
    return `<svg class="${cls || 'i'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  }
  function hydrateIcons(root) {
    (root || document).querySelectorAll('[data-icon]').forEach(el => {
      if (el.dataset.done) return;
      el.insertAdjacentHTML('afterbegin', icon(el.dataset.icon, el.dataset.iconClass));
      el.dataset.done = '1';
    });
  }

  // ---------- helpers ----------
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const initials = n => (String(n || '').trim().split(/\s+/).slice(0, 2).map(w => w[0] || '').join('') || 'V').toUpperCase();
  const slug = n => String(n || 'your-name').toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-').slice(0, 32) || 'your-name';
  const inr = n => '₹' + Number(n).toLocaleString('en-IN');
  // readable text on an arbitrary accent
  function onColor(hex) {
    const h = hex.replace('#', ''); const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
    const L = c => { c /= 255; return c <= .03928 ? c / 12.92 : Math.pow((c + .055) / 1.055, 2.4); };
    const lum = .2126 * L(r) + .7152 * L(g) + .0722 * L(b);
    return lum > .4 ? '#0E0B1A' : '#FFFFFF';
  }

  // ---------- QR ----------
  function qrSvg(text, opts) {
    opts = opts || {};
    if (typeof window.qrcode !== 'function') return '<div class="qr-fallback" aria-label="QR code">QR</div>';
    const q = window.qrcode(0, 'M'); q.addData(text); q.make();
    const n = q.getModuleCount(), m = opts.margin == null ? 2 : opts.margin, size = n + m * 2;
    let d = '';
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.isDark(r, c)) d += `M${c + m} ${r + m}h1v1h-1z`;
    const fg = opts.fg || '#0E0B1A', bg = opts.bg || '#fff';
    return `<svg viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" role="img" aria-label="${esc(opts.label || 'QR code for ' + text)}"><rect width="${size}" height="${size}" fill="${bg}"/><path d="${d}" fill="${fg}"/></svg>`;
  }

  // ---------- digital card data ----------
  const DEFAULT = {
    name: 'Ananya Rao', role: 'Interior Designer', company: 'Studio Rao', bio: 'Homes and small offices that feel calm and work hard. Based in Bengaluru, working across South India.',
    phone: '+91 98765 43210', email: 'hello@studiorao.in', website: 'studiorao.in', location: 'Indiranagar, Bengaluru',
    whatsapp: true, instagram: 'studiorao', linkedin: 'ananyarao', photo: '', accent: '#6B3FD8', template: 'aria', tags: 'Residential, Workspaces',
  };
  const TEMPLATES = [
    { id: 'aria', name: 'Aria', note: 'Minimal link-style', price: 499 },
    { id: 'bento', name: 'Bento', note: 'Bento grid with location', price: 799 },
    { id: 'spotlight', name: 'Spotlight', note: 'Dark, photo-first', price: 799 },
    { id: 'bauhaus', name: 'Bauhaus', note: 'Geometric bold', price: 999 },
  ];

  function avatar(d, size) {
    return d.photo
      ? `<img class="dc-photo" src="${esc(d.photo)}" alt="" width="${size}" height="${size}">`
      : `<div class="dc-photo dc-initials" aria-hidden="true">${esc(initials(d.name))}</div>`;
  }
  function actions(d) {
    const a = [];
    if (d.phone) a.push(['phone', 'Call']);
    if (d.whatsapp && d.phone) a.push(['whatsapp', 'WhatsApp']);
    if (d.email) a.push(['mail', 'Email']);
    if (d.website) a.push(['globe', 'Website']);
    return a;
  }
  function socials(d) {
    const s = [];
    if (d.instagram) s.push(['instagram', 'Instagram']);
    if (d.linkedin) s.push(['linkedin', 'LinkedIn']);
    return s.map(([i, l]) => `<span class="dc-social" title="${l}">${icon(i)}</span>`).join('');
  }

  /* Renders the digital card's phone screen. Returns HTML. */
  function digitalCard(data) {
    const d = Object.assign({}, DEFAULT, data);
    const acc = d.accent, on = onColor(acc);
    const tags = String(d.tags || '').split(',').map(t => t.trim()).filter(Boolean).slice(0, 3);
    const style = `--acc:${acc};--on-acc:${on}`;
    const acts = actions(d);
    const url = 'vueme.in/' + slug(d.name);
    if (d.template === 'bento') {
      return `<div class="dc dc-bento" style="${style}">
        <div class="dc-tile dc-me">${avatar(d, 64)}<div><b>${esc(d.name)}</b><span>${esc(d.role)}</span></div></div>
        <div class="dc-tile dc-acc"><span class="dc-k">@${esc(d.instagram || slug(d.name))}</span>${tags.map(t => `<i>${esc(t)}</i>`).join('')}</div>
        <div class="dc-tile dc-map"><span class="dc-mapgrid" aria-hidden="true"></span>${icon('pin')}<span>${esc(d.location)}</span></div>
        <div class="dc-tile dc-bio">${esc(d.bio)}</div>
        ${acts.map(([i, l]) => `<div class="dc-tile dc-act">${icon(i)}<span>${l}</span></div>`).join('')}
        <div class="dc-tile dc-save">${icon('save')}Save contact</div>
        <div class="dc-url">${esc(url)}</div></div>`;
    }
    if (d.template === 'spotlight') {
      return `<div class="dc dc-spot" style="${style}">
        <div class="dc-hero">${avatar(d, 120)}<div class="dc-fade"></div><div class="dc-id"><b>${esc(d.name)}</b><span>${esc(d.role)}${d.company ? ' · ' + esc(d.company) : ''}</span></div></div>
        <p class="dc-bio">${esc(d.bio)}</p>
        <div class="dc-row">${acts.slice(0, 4).map(([i, l]) => `<span class="dc-round" title="${l}">${icon(i)}</span>`).join('')}</div>
        <div class="dc-list">${d.location ? `<div>${icon('pin')}${esc(d.location)}</div>` : ''}${d.website ? `<div>${icon('globe')}${esc(d.website)}</div>` : ''}</div>
        <div class="dc-socials">${socials(d)}</div>
        <div class="dc-save">${icon('save')}Save contact</div></div>`;
    }
    if (d.template === 'bauhaus') {
      return `<div class="dc dc-bau" style="${style}">
        <div class="dc-shapes" aria-hidden="true"><i></i><i></i><i></i></div>
        <div class="dc-head">${avatar(d, 72)}<b>${esc(d.name)}</b><span>${esc(d.role)}</span></div>
        <p class="dc-bio">${esc(d.bio)}</p>
        <div class="dc-grid">${acts.map(([i, l]) => `<span>${icon(i)}${l}</span>`).join('')}</div>
        <div class="dc-socials">${socials(d)}</div>
        <div class="dc-save">${icon('save')}Save contact</div></div>`;
    }
    // aria (default)
    return `<div class="dc dc-aria" style="${style}">
      <div class="dc-cover"></div>
      ${avatar(d, 84)}
      <b class="dc-name">${esc(d.name)}</b>
      <span class="dc-role">${esc(d.role)}${d.company ? ' · ' + esc(d.company) : ''}</span>
      <p class="dc-bio">${esc(d.bio)}</p>
      <div class="dc-links">${acts.map(([i, l]) => `<span>${icon(i)}${l}</span>`).join('')}</div>
      <div class="dc-socials">${socials(d)}</div>
      <div class="dc-save">${icon('save')}Save contact</div></div>`;
  }

  function phone(inner, label) {
    return `<div class="phone" role="img" aria-label="${esc(label || 'Digital card preview on a phone')}"><div class="phone-notch"></div><div class="phone-screen">${inner}</div></div>`;
  }

  // ---------- printed card ----------
  const PRINT_DEFAULT = {
    name: 'Ananya Rao', role: 'Interior Designer', company: 'Studio Rao', phone: '+91 98765 43210', email: 'hello@studiorao.in',
    website: 'studiorao.in', address: '12, 4th Cross, Indiranagar, Bengaluru 560038', tagline: 'Spaces that feel calm and work hard.',
    template: 'classic', color: '#6B3FD8', finish: 'matte', corners: false, qr: true, logo: '',
  };
  const PRINT_TEMPLATES = [{ id: 'classic', name: 'Classic' }, { id: 'block', name: 'Colour block' }, { id: 'split', name: 'Split' }];

  function printSide(data, side) {
    const d = Object.assign({}, PRINT_DEFAULT, data);
    const c = d.color, on = onColor(c);
    const cls = `pc pc-${esc(d.template)} pc-${esc(d.finish)} ${d.corners ? 'pc-round' : ''}`;
    const style = `--pc:${c};--on-pc:${on}`;
    const mark = d.logo ? `<img class="pc-logo" src="${esc(d.logo)}" alt="">` : `<span class="pc-mono" aria-hidden="true">${esc(initials(d.company || d.name))}</span>`;
    const lines = [['phone', d.phone], ['mail', d.email], ['globe', d.website], ['pin', d.address]].filter(x => x[1]);
    if (side === 'back') {
      return `<div class="${cls} pc-back" style="${style}">
        <div class="pc-back-in">${mark}<b>${esc(d.company || d.name)}</b><span>${esc(d.tagline)}</span>
        ${d.qr ? `<div class="pc-qr">${qrSvg('https://vueme.in/' + slug(d.name), { margin: 1, label: 'QR code to the digital card' })}<small>Scan for my digital card</small></div>` : ''}</div>
        <div class="pc-sheen" aria-hidden="true"></div></div>`;
    }
    return `<div class="${cls}" style="${style}">
      <div class="pc-band" aria-hidden="true"></div>
      <div class="pc-top">${mark}<div class="pc-id"><b>${esc(d.name)}</b><span>${esc(d.role)}</span></div></div>
      <ul class="pc-lines">${lines.map(([i, t]) => `<li>${icon(i)}<span>${esc(t)}</span></li>`).join('')}</ul>
      <div class="pc-sheen" aria-hidden="true"></div></div>`;
  }

  // Real Vueme prices (sale / regular), from vueme.in product pages.
  const PRINT_PRICES = {
    matte: { single: { 500: [675, 849], 1000: [899, 999] }, double: { 500: [849, 999], 1000: [1049, 1199] } },
    gloss: { single: { 500: [625, 799], 1000: [850, 949] }, double: { 500: [788, 899], 1000: [999, 1149] } },
    synthetic: { single: { 500: [800, 999], 1000: [1029, 1199] }, double: { 1000: [1249, 1349] } },
  };

  // ---------- page chrome ----------
  function toast(msg) {
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.innerHTML = icon('check') + '<span>' + esc(msg) + '</span>';
    t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2200);
  }
  function nav() {
    const b = document.querySelector('.nav-menu'), m = document.getElementById('mnav');
    if (!b || !m) return;
    b.addEventListener('click', () => { const o = m.classList.toggle('open'); b.setAttribute('aria-expanded', o); });
  }
  async function copy(text) {
    try { await navigator.clipboard.writeText(text); } catch (e) {
      const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (_) {} ta.remove();
    }
    toast('Link copied');
  }
  // persistent draft (per-viewer convenience only; works without storage)
  const store = {
    get(k, fb) { try { const v = localStorage.getItem('vueme:' + k); return v ? JSON.parse(v) : fb; } catch (e) { return fb; } },
    set(k, v) { try { localStorage.setItem('vueme:' + k, JSON.stringify(v)); return true; } catch (e) { return false; } },
  };

  document.addEventListener('DOMContentLoaded', () => { hydrateIcons(); nav(); });

  window.Vueme = { icon, hydrateIcons, esc, slug, inr, initials, onColor, qrSvg, digitalCard, phone, printSide, DEFAULT, TEMPLATES, PRINT_DEFAULT, PRINT_TEMPLATES, PRINT_PRICES, toast, copy, store };
})();
