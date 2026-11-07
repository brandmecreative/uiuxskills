// Inlines local stylesheets and scripts so each page works as a single file.
// Usage: node tools/build-standalone.mjs   (run from redesigns/vueme-v2)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'standalone');
mkdirSync(out, { recursive: true });
const pages = ['index'];
const local = p => !/^(https?:)?\/\//.test(p);
const safe = s => s.replace(/<\/script/gi, '<\\/script'); // keep inlined JS from closing the tag

for (const page of pages) {
  let html = readFileSync(join(root, page + '.html'), 'utf8');
  html = html.replace(/<link rel="stylesheet" href="([^"]+)">/g, (m, href) =>
    local(href) ? `<style>\n${readFileSync(join(root, href), 'utf8')}\n</style>` : m);
  html = html.replace(/<script src="([^"]+)"><\/script>/g, (m, src) =>
    local(src) ? `<script>\n${safe(readFileSync(join(root, src), 'utf8'))}\n</script>` : m);
  if (/(href|src)="assets\//.test(html)) throw new Error(page + ': local asset left un-inlined');
  writeFileSync(join(out, page + '.html'), html);
  console.log(page + '.html', Math.round(html.length / 1024) + ' KB');
}
