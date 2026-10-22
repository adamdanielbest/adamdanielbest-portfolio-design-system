#!/usr/bin/env node
// Concatenates all site CSS in load order into src/styles/bundle.css.
// Run: node scripts/bundle-css.js
// Called by the deploy workflow before the Pages artifact is uploaded.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROOT = path.resolve(__dirname, '..');

const FILES = [
  'src/styles/fonts.css',
  'src/styles/generated/tokens-primitives.css',
  'src/styles/generated/tokens-light.css',
  'src/styles/generated/tokens-dark.css',
  'src/styles/generated/tokens-desktop.css',
  'src/styles/generated/tokens-mobile.css',
  'src/styles/layout.css',
  'content-section-component/content-section.css',
  'timeline-component/timeline.css',
  'text-link-component/text-link.css',
  'button-component/button.css',
  'sidebar-component/sidebar.css',
  'header-component/header.css',
  'page-nav-component/page-nav.css',
  'nav-link-component/nav-link.css',
  'media-block-component/media-block.css',
  'card-item-component/card-item.css',
  'case-study-hero-component/case-study-hero.css',
  'case-study-summary-component/case-study-summary.css',
  'action-chip-component/action-chip.css',
  'src/styles/site.css',
];

const out = FILES.map(f => {
  const abs = path.join(ROOT, f);
  if (!fs.existsSync(abs)) {
    console.warn(`Warning: ${f} not found, skipping`);
    return '';
  }
  return fs.readFileSync(abs, 'utf8');
}).join('\n');

const outPath = path.join(ROOT, 'src/styles/bundle.css');
fs.writeFileSync(outPath, out);
console.log(`bundle.css written (${(out.length / 1024).toFixed(1)} KB, ${FILES.length} files)`);
