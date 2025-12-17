#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const CONFIG = path.join(SRC, '.vuepress', 'config.js');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      // skip vuepress internal dir
      if (ent.name === '.vuepress') continue;
      files.push(...walk(full));
    } else if (ent.isFile()) {
      files.push(full);
    }
  }
  return files;
}

function isMarkdown(f) {
  return f.toLowerCase().endsWith('.md');
}

function fileToRoute(filePath) {
  // filePath is absolute; route is based on path under SRC
  const rel = path.relative(SRC, filePath).replace(/\\/g, '/');
  if (!/^en\//.test(rel) && !/^fr\//.test(rel)) return null;
  // strip extension
  let route = '/' + rel.replace(/\.md$/i, '');
  // handle index or README: map /en/index or /en/README to /en/
  route = route.replace(/\/index$/i, '/');
  route = route.replace(/\/README$/i, '/');
  // ensure leading and trailing format: no trailing slash except root '/en/' or '/fr/'
  if (!/^\/en\/$/.test(route) && !/^\/fr\/$/.test(route)) {
    // remove trailing slash if any
    route = route.replace(/\/+$/,'');
  }
  return route;
}

function parseConfigRoutes() {
  if (!fs.existsSync(CONFIG)) return [];
  const content = fs.readFileSync(CONFIG, 'utf8');
  const routes = new Set();
  const re = /['"](\/(?:en|fr)\/[^'"\]]*?)['"]/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    let r = m[1];
    // normalize root '/en/' or '/fr/'
    if (r.endsWith('/')) r = r.replace(/\/+$/,'/')
    else r = r.replace(/\/+$/,'');
    routes.add(r);
  }
  return Array.from(routes);
}

function main() {
  const allFiles = walk(SRC).filter(isMarkdown);
  const enFiles = allFiles.filter(f => path.relative(SRC, f).replace(/\\/g,'/').startsWith('en/'));
  const frFiles = allFiles.filter(f => path.relative(SRC, f).replace(/\\/g,'/').startsWith('fr/'));

  const enRoutes = new Set(enFiles.map(fileToRoute).filter(Boolean));
  const frRoutes = new Set(frFiles.map(fileToRoute).filter(Boolean));
  const configRoutes = new Set(parseConfigRoutes());

  const errors = [];

  // For each en route, check fr counterpart exists
  for (const er of enRoutes) {
    const fr = er.replace(/^\/en\//, '/fr/');
    // special-case root '/en/' -> '/fr/'
    if (er === '/en/') {
      if (!frRoutes.has('/fr/')) errors.push(`Missing French root page: /fr/`);
      continue;
    }
    if (!frRoutes.has(fr)) errors.push(`Missing French translation for ${er} -> expected ${fr}`);
    // check both are present in config
    if (!configRoutes.has(er)) errors.push(`English page ${er} is not referenced in theme config navigation/sidebar`);
    if (!configRoutes.has(fr)) errors.push(`French page ${fr} is not referenced in theme config navigation/sidebar`);
  }

  // Also check for FR pages without EN counterparts
  for (const fr of frRoutes) {
    if (fr === '/fr/') continue;
    const en = fr.replace(/^\/fr\//, '/en/');
    if (!enRoutes.has(en)) errors.push(`Missing English translation for ${fr} -> expected ${en}`);
  }

  // Optionally, check referenced config routes point to existing files
  for (const r of configRoutes) {
    // map to file
    let target = r;
    if (target.endsWith('/')) {
      // map '/en/' to src/en/index.md or src/en/README.md
      const idx = path.join(SRC, target.replace(/^\//, ''), 'index.md');
      const readme = path.join(SRC, target.replace(/^\//, ''), 'README.md');
      if (!fs.existsSync(idx) && !fs.existsSync(readme)) {
        errors.push(`Configured route ${r} has no matching file under src/`);
      }
    } else {
      const f = path.join(SRC, target.replace(/^\//, '') + '.md');
      if (!fs.existsSync(f)) errors.push(`Configured route ${r} points to missing file ${path.relative(ROOT, f)}`);
    }
  }

  if (errors.length) {
    console.error('Page validity check failed with the following issues:');
    for (const e of errors) console.error('- ' + e);
    process.exit(2);
  }

  console.log('All pages have matching translations and are referenced in the theme config.');
}

main();
