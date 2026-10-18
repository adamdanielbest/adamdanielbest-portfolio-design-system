/**
 * build-site.mjs
 * Generates site HTML from shared render functions.
 * Run: node scripts/build-site.mjs
 */

import { writeFileSync, readFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { renderHeaderContent } from '../stories/header.render.js';
import { renderSidebarSections } from '../stories/sidebar.render.js';
import { renderPageNav } from '../stories/page-nav.render.js';
import { renderCardItemCopy, renderMediaBlockHtml } from '../stories/card-item.render.js';
import { renderCaseStudyHero } from '../stories/case-study-hero.render.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// Global CSS — loaded on every page regardless of content type.
// With client-side routing the homepage shell hosts all content,
// so all component CSS must be present from the first load.
// ---------------------------------------------------------------------------
const CSS_FILES = [
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
  'src/styles/site.css',
];

function renderCssLinks(prefix = '') {
  return CSS_FILES.map(f => `  <link rel="stylesheet" href="${prefix}${f}">`).join('\n');
}

// ---------------------------------------------------------------------------
// Site-specific render wrappers
// ---------------------------------------------------------------------------

function renderCardItemHTML({ title, outcome, role, href } = {}) {
  return `<a class="card-grid-demo" href="${href}">
          ${renderMediaBlockHtml({ ratio: '16:9' })}
          ${renderCardItemCopy({ title, outcome, role })}
        </a>`;
}

// ---------------------------------------------------------------------------
// Page data
// ---------------------------------------------------------------------------

const caseStudies = [
  {
    slug:    'giffgaff',
    title:   'Designing state-aware UX for a 0→1 broadband launch',
    outcome: '6% conversion vs 4.5% target · 95 NPS · 0.2% churn · 9.7/10 DXS',
    role:    'Product Designer · giffgaff · 2023–2024',
    tldr: [
      '6% conversion against a 4.5% target',
      '95 NPS at launch, 9.7/10 DXS, 91.7% CSAT',
      '0.2% churn after 6 months live',
    ],
    sections: [
      { type: 'context', content: 'content/giffgaff/context.md' },
      { type: 'work',    heading: 'Orchestrating the insight machine',   content: 'content/giffgaff/work-1.md' },
      { type: 'work',    heading: 'De-risking via incremental rollout',  content: 'content/giffgaff/work-2.md' },
      { type: 'work',    heading: 'Architecting service logic',          content: 'content/giffgaff/work-3.md' },
      { type: 'work',    heading: 'Pre-activation handoff',              content: 'content/giffgaff/work-4.md' },
      { type: 'impact',  content: 'content/giffgaff/impact.md' },
    ],
    jsonld: {
      name:        'Designing state-aware UX for a 0→1 broadband launch',
      description: '6% conversion vs 4.5% target, 95 NPS at launch, 0.2% churn after 6 months.',
      keywords:    ['product design', '0→1', 'broadband', 'giffgaff', 'UX', 'conversion rate optimisation'],
    },
  },
  {
    slug:    'lickd',
    title:   'Demystifying music copyright to lift checkout conversion by 10%',
    outcome: '+10% Premium conversion · +10% Included conversion · -10% claims tickets',
    role:    'Product Designer · Lickd · 2021–2022',
    tldr: [
      '+10% Premium conversion (to 43.5%)',
      '+10% Included conversion (to 66%)',
      '+5% overall checkout conversion (to 42.58%)',
      '-10% claims tickets, -1.45% support tickets',
    ],
    sections: [
      { type: 'context', content: 'content/lickd/context.md' },
      { type: 'work',    heading: 'Discovery: mapping the complexity',                  content: 'content/lickd/work-1.md' },
      { type: 'work',    heading: 'Reducing friction at checkout',                      content: 'content/lickd/work-2.md' },
      { type: 'work',    heading: 'The Innovation Hub — continuous user access',        content: 'content/lickd/work-3.md' },
      { type: 'impact',  content: 'content/lickd/impact.md' },
    ],
    jsonld: {
      name:        'Demystifying music copyright to lift checkout conversion by 10%',
      description: 'Checkout redesign that lifted Premium conversion to 43.5%, Included to 66%, and reduced claims tickets by 10%.',
      keywords:    ['product design', 'checkout', 'conversion', 'music licensing', 'Lickd', 'UX research'],
    },
  },
  {
    slug:    'hubblehq',
    title:   'Fixing a 30% host decline rate — viewings redesign under a business pivot',
    outcome: 'Viewings flow redesign · two-sided marketplace · constraints-led delivery',
    role:    'Product Designer · HubbleHQ · 2019–2020',
    tldr: [
      'Problem: 30% of viewings requests declined by hosts',
      'Redesigned the end-to-end viewings request and confirmation flow',
      'Project deprioritised following a business pivot before full outcome capture',
    ],
    sections: [
      { type: 'context', content: 'content/hubblehq/context.md' },
      { type: 'work',    heading: 'Discovery: understanding why hosts were declining',  content: 'content/hubblehq/work-1.md' },
      { type: 'work',    heading: 'Designing the viewings flow',                        content: 'content/hubblehq/work-2.md' },
      { type: 'impact',  content: 'content/hubblehq/impact.md' },
    ],
    jsonld: {
      name:        'Fixing a 30% host decline rate — viewings redesign under a business pivot',
      description: 'End-to-end viewings flow redesign for a two-sided office marketplace, delivered under a business pivot and COVID.',
      keywords:    ['product design', 'marketplace', 'two-sided platform', 'HubbleHQ', 'UX', 'constraints-led'],
    },
  },
  {
    slug:    'figma-to-code',
    title:   'Figma to code, end to end — tokens, components, and a CI pipeline built with AI',
    outcome: 'Full design system · Figma variables → production CSS · Storybook component library',
    role:    'Product Designer · Personal · 2025–2026',
    tldr: [
      'Full design token pipeline: Figma variables → CSS custom properties',
      'Component library documented in Storybook',
      'Automated sync, drift detection, and commit pipeline',
      'Built end to end with Claude as a collaborative tool',
    ],
    sections: [
      { type: 'context', content: 'content/figma-to-code/context.md' },
      { type: 'work',    heading: 'Designing the token architecture',                  content: 'content/figma-to-code/work-1.md' },
      { type: 'work',    heading: 'Building the component library',                    content: 'content/figma-to-code/work-2.md' },
      { type: 'work',    heading: 'The CI pipeline — sync, drift, commit',             content: 'content/figma-to-code/work-3.md' },
      { type: 'work',    heading: 'Claude as a collaborator',                          content: 'content/figma-to-code/work-4.md' },
      { type: 'impact',  content: 'content/figma-to-code/impact.md' },
    ],
    jsonld: {
      name:        'Figma to code, end to end — tokens, components, and a CI pipeline built with AI',
      description: 'A solo design system project: Figma variables to production CSS, a Storybook component library, and an automated sync pipeline, built with Claude.',
      keywords:    ['design system', 'design tokens', 'Figma variables', 'Storybook', 'CI pipeline', 'AI', 'Claude', 'product design'],
    },
  },
];

// Derive href from slug for homepage card grid
const caseStudiesWithHref = caseStudies.map(s => ({ ...s, href: `case-studies/${s.slug}.html` }));

// ---------------------------------------------------------------------------
// Template
// ---------------------------------------------------------------------------

const sidebarContent = renderSidebarSections();
const cardGrid = caseStudiesWithHref.map(c => renderCardItemHTML(c)).join('\n\n        ');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Adam Daniel Best — Senior Product Designer, London</title>
  <meta name="description" content="Senior Product Designer with 15 years across luxury heritage and high-growth product. Based in London.">

${renderCssLinks()}
</head>
<body data-theme="light">

  <script>
    document.documentElement.dataset.theme = 'light';
    fetch('src/icons/sprite.svg')
      .then(r => r.text())
      .then(svg => {
        const div = document.createElement('div');
        div.style.display = 'none';
        div.setAttribute('aria-hidden', 'true');
        div.innerHTML = svg;
        document.body.insertBefore(div, document.body.firstChild);
      });
  </script>

  <!-- =====================================================================
       Desktop aside — visible ≥769px
       ===================================================================== -->
  <aside class="site-aside" aria-label="About Adam Daniel Best">
    <div class="site-aside__header">
      ${renderHeaderContent({ breakpoint: 'desktop-open' })}
    </div>
    <div class="site-aside__body">
      <div class="sidebar-demo sidebar-demo--desktop">
        <div class="sidebar__inner">
          ${sidebarContent}
        </div>
      </div>
    </div>
  </aside>

  <!-- =====================================================================
       Mobile / tablet header — visible ≤768px
       ===================================================================== -->
  <header class="site-header" aria-label="Site navigation">
    ${renderHeaderContent({ breakpoint: 'mobile' })}
  </header>

  <!-- =====================================================================
       Mobile / tablet page-nav bar — visible ≤768px
       ===================================================================== -->
  <nav class="site-page-nav" aria-label="Page navigation">
    <nav class="page-nav" aria-label="Page navigation"><p class="page-nav__title">Case Studies</p></nav>
  </nav>

  <!-- =====================================================================
       Mobile drawer — sidebar overlay below header
       ===================================================================== -->
  <div class="site-drawer" id="site-drawer" role="dialog" aria-modal="true" aria-label="About Adam Daniel Best" hidden>
    <div class="sidebar-demo sidebar-demo--mobile">
      <div class="sidebar__inner">
        ${sidebarContent}
      </div>
    </div>
  </div>

  <!-- =====================================================================
       Main content
       ===================================================================== -->
  <main class="site-main" id="main-content">

    <nav class="site-main__nav" aria-label="Page navigation">
      <nav class="page-nav" aria-label="Page navigation"><p class="page-nav__title">Case Studies</p></nav>
    </nav>

    <div class="site-main__content">
      <section class="section--work" aria-label="Work">
        <div class="card-grid">
        ${cardGrid}
        </div>
      </section>
    </div>

  </main>

  <script>
    // Desktop sidebar collapse
    const sidebarToggle = document.querySelector('.js-sidebar-toggle');
    const aside         = document.querySelector('.site-aside');
    const siteMain      = document.querySelector('.site-main');
    const sidebarIcon   = sidebarToggle?.querySelector('use');

    sidebarToggle?.addEventListener('click', () => {
      const collapsed = aside.classList.toggle('site-aside--collapsed');
      siteMain.classList.toggle('site-main--aside-collapsed', collapsed);
      if (collapsed) {
        sidebarToggle.setAttribute('aria-label', 'Open sidebar');
        sidebarToggle.setAttribute('aria-expanded', 'false');
        if (sidebarIcon) sidebarIcon.setAttribute('href', '#icon-left-panel-open-sm');
      } else {
        sidebarToggle.setAttribute('aria-label', 'Close sidebar');
        sidebarToggle.setAttribute('aria-expanded', 'true');
        if (sidebarIcon) sidebarIcon.setAttribute('href', '#icon-left-panel-close-sm');
      }
    });
  </script>

  <script>
    const drawerToggle = document.querySelector('.js-drawer-toggle');
    const drawer       = document.getElementById('site-drawer');
    const toggleIcon   = drawerToggle?.querySelector('use');

    function openDrawer() {
      drawer.removeAttribute('hidden');
      drawer.classList.add('site-drawer--open');
      document.body.classList.add('drawer-open');
      drawerToggle.setAttribute('aria-expanded', 'true');
      drawerToggle.setAttribute('aria-label', 'Close menu');
      if (toggleIcon) toggleIcon.setAttribute('href', '#icon-top-panel-close-sm');
      drawerToggle.focus();
    }

    function closeDrawer() {
      drawer.classList.remove('site-drawer--open');
      document.body.classList.remove('drawer-open');
      drawerToggle.setAttribute('aria-expanded', 'false');
      drawerToggle.setAttribute('aria-label', 'Open menu');
      if (toggleIcon) toggleIcon.setAttribute('href', '#icon-top-panel-open-sm');
      drawerToggle.focus();
      drawer.addEventListener('transitionend', () => drawer.setAttribute('hidden', ''), { once: true });
    }

    drawerToggle?.addEventListener('click', () => {
      drawer.hasAttribute('hidden') || !drawer.classList.contains('site-drawer--open')
        ? openDrawer()
        : closeDrawer();
    });

    drawer?.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeDrawer();
    });
  </script>

  <script src="src/js/router.js"></script>
</body>
</html>
`;

const outPath = resolve(root, 'index.html');
writeFileSync(outPath, html, 'utf8');
console.log('✅ index.html generated');

// ---------------------------------------------------------------------------
// Case study pages
// ---------------------------------------------------------------------------

function renderCaseStudyPage(study, { prev, next } = {}) {
  const prevLink = `<a class="nav-link page-nav__link" href="${prev.slug}.html" aria-label="Previous: ${prev.title}">
          <span class="nav-link__icon" aria-hidden="true">
            <svg focusable="false"><use href="#icon-chevron-backward"/></svg>
          </span>
          <span class="nav-link__label">Previous</span>
        </a>`;

  const nextLink = `<a class="nav-link page-nav__link" href="${next.slug}.html" aria-label="Next: ${next.title}">
          <span class="nav-link__label">Next</span>
          <span class="nav-link__icon" aria-hidden="true">
            <svg focusable="false"><use href="#icon-chevron-forward"/></svg>
          </span>
        </a>`;

  const prevLinkIconOnly = `<a class="nav-link page-nav__link page-nav__link--icon-only" href="${prev.slug}.html" aria-label="Previous: ${prev.title}">
          <span class="nav-link__icon" aria-hidden="true">
            <svg focusable="false"><use href="#icon-chevron-backward"/></svg>
          </span>
        </a>`;

  const nextLinkIconOnly = `<a class="nav-link page-nav__link page-nav__link--icon-only" href="${next.slug}.html" aria-label="Next: ${next.title}">
          <span class="nav-link__icon" aria-hidden="true">
            <svg focusable="false"><use href="#icon-chevron-forward"/></svg>
          </span>
        </a>`;

  const hero = renderCaseStudyHero({
    breakpoint: 'desktop',
    title:      study.title,
    outcome:    study.outcome,
    role:       study.role,
  });

  const tldrHtml = study.tldr?.length
    ? `<ul class="case-study-tldr" aria-label="Key outcomes">
        ${study.tldr.map(t => `<li class="case-study-tldr__item">${t}</li>`).join('\n        ')}
      </ul>`
    : '';

  function readMd(relPath) {
    try {
      return readFileSync(resolve(root, relPath), 'utf8').trim();
    } catch {
      return `<p><em>Content coming soon.</em></p>`;
    }
  }

  const sectionsHtml = (study.sections || []).map(s => {
    const body = readMd(s.content);
    if (s.type === 'context') {
      return `<section class="content-section content-section--context" aria-label="Context">
          <h2 class="content-section__heading">Context</h2>
          <div class="content-section__body">${body}</div>
        </section>`;
    }
    if (s.type === 'work') {
      return `<section class="content-section content-section--work" aria-label="${s.heading}">
          <h2 class="content-section__heading">${s.heading}</h2>
          <div class="content-section__body">${body}</div>
        </section>`;
    }
    if (s.type === 'impact') {
      return `<section class="content-section content-section--impact" aria-label="Impact">
          <h2 class="content-section__heading">Impact</h2>
          <div class="content-section__body">${body}</div>
        </section>`;
    }
    return '';
  }).join('\n\n        ');

  const jsonldScript = study.jsonld ? `
  <script type="application/ld+json">
  ${JSON.stringify({
    '@context':   'https://schema.org',
    '@type':      'CreativeWork',
    'name':       study.jsonld.name,
    'description': study.jsonld.description,
    'keywords':   study.jsonld.keywords.join(', '),
    'author': {
      '@type': 'Person',
      'name':  'Adam Daniel Best',
      'url':   'https://adamdanielbest.com',
    },
    'url': `https://adamdanielbest.com/case-studies/${study.slug}.html`,
  }, null, 2)}
  </script>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${study.title} — Adam Daniel Best</title>
  <meta name="description" content="${study.jsonld?.description ?? study.outcome}">${jsonldScript}

${renderCssLinks('../')}
</head>
<body data-theme="light">

  <script>
    document.documentElement.dataset.theme = 'light';
    fetch('../src/icons/sprite.svg')
      .then(r => r.text())
      .then(svg => {
        const div = document.createElement('div');
        div.style.display = 'none';
        div.setAttribute('aria-hidden', 'true');
        div.innerHTML = svg;
        document.body.insertBefore(div, document.body.firstChild);
      });
  </script>

  <!-- =====================================================================
       Desktop aside — visible ≥769px
       ===================================================================== -->
  <aside class="site-aside" aria-label="About Adam Daniel Best">
    <div class="site-aside__header">
      ${renderHeaderContent({ breakpoint: 'desktop-open', logoHref: '../index.html' })}
    </div>
    <div class="site-aside__body">
      <div class="sidebar-demo sidebar-demo--desktop">
        <div class="sidebar__inner">
          ${sidebarContent}
        </div>
      </div>
    </div>
  </aside>

  <!-- =====================================================================
       Mobile / tablet header — visible ≤768px
       ===================================================================== -->
  <header class="site-header" aria-label="Site navigation">
    ${renderHeaderContent({ breakpoint: 'mobile', logoHref: '../index.html' })}
  </header>

  <!-- =====================================================================
       Mobile / tablet page-nav bar — visible ≤768px
       ===================================================================== -->
  <nav class="site-page-nav" aria-label="Page navigation">
    <nav class="page-nav page-nav--icons-only" aria-label="Page navigation">
      <div class="page-nav__back">
        <a class="nav-link page-nav__link page-nav__link--icon-only" href="../index.html" aria-label="All case studies">
          <span class="nav-link__icon" aria-hidden="true">
            <svg focusable="false"><use href="#icon-arrow-backwards"/></svg>
          </span>
        </a>
      </div>
      <p class="page-nav__title">${study.title}</p>
      <div class="page-nav__prev-next">
        ${prevLinkIconOnly}
        ${nextLinkIconOnly}
      </div>
    </nav>
  </nav>

  <!-- =====================================================================
       Mobile drawer — sidebar overlay below header
       ===================================================================== -->
  <div class="site-drawer" id="site-drawer" role="dialog" aria-modal="true" aria-label="About Adam Daniel Best" hidden>
    <div class="sidebar-demo sidebar-demo--mobile">
      <div class="sidebar__inner">
        ${sidebarContent}
      </div>
    </div>
  </div>

  <!-- =====================================================================
       Main content
       ===================================================================== -->
  <main class="site-main" id="main-content">

    <nav class="site-main__nav" aria-label="Page navigation">
      <nav class="page-nav" aria-label="Page navigation">
        <div class="page-nav__back">
          <a class="nav-link page-nav__link" href="../index.html">
            <span class="nav-link__icon" aria-hidden="true">
              <svg focusable="false"><use href="#icon-arrow-backwards"/></svg>
            </span>
            <span class="nav-link__label">All case studies</span>
          </a>
        </div>
        <p class="page-nav__title">${study.title}</p>
        <div class="page-nav__prev-next">
          ${prevLink}
          ${nextLink}
        </div>
      </nav>
    </nav>

    <div class="site-main__content">
      <div class="case-study-content">
        ${hero}
        ${tldrHtml}
        ${sectionsHtml}
      </div>
    </div>

  </main>

  <script>
    // Desktop sidebar collapse
    const sidebarToggle = document.querySelector('.js-sidebar-toggle');
    const aside         = document.querySelector('.site-aside');
    const siteMain      = document.querySelector('.site-main');
    const sidebarIcon   = sidebarToggle?.querySelector('use');

    sidebarToggle?.addEventListener('click', () => {
      const collapsed = aside.classList.toggle('site-aside--collapsed');
      siteMain.classList.toggle('site-main--aside-collapsed', collapsed);
      if (collapsed) {
        sidebarToggle.setAttribute('aria-label', 'Open sidebar');
        sidebarToggle.setAttribute('aria-expanded', 'false');
        if (sidebarIcon) sidebarIcon.setAttribute('href', '#icon-left-panel-open-sm');
      } else {
        sidebarToggle.setAttribute('aria-label', 'Close sidebar');
        sidebarToggle.setAttribute('aria-expanded', 'true');
        if (sidebarIcon) sidebarIcon.setAttribute('href', '#icon-left-panel-close-sm');
      }
    });
  </script>

  <script>
    const drawerToggle = document.querySelector('.js-drawer-toggle');
    const drawer       = document.getElementById('site-drawer');
    const toggleIcon   = drawerToggle?.querySelector('use');

    function openDrawer() {
      drawer.removeAttribute('hidden');
      drawer.classList.add('site-drawer--open');
      document.body.classList.add('drawer-open');
      drawerToggle.setAttribute('aria-expanded', 'true');
      drawerToggle.setAttribute('aria-label', 'Close menu');
      if (toggleIcon) toggleIcon.setAttribute('href', '#icon-top-panel-close-sm');
      drawerToggle.focus();
    }

    function closeDrawer() {
      drawer.classList.remove('site-drawer--open');
      document.body.classList.remove('drawer-open');
      drawerToggle.setAttribute('aria-expanded', 'false');
      drawerToggle.setAttribute('aria-label', 'Open menu');
      if (toggleIcon) toggleIcon.setAttribute('href', '#icon-top-panel-open-sm');
      drawerToggle.focus();
      drawer.addEventListener('transitionend', () => drawer.setAttribute('hidden', ''), { once: true });
    }

    drawerToggle?.addEventListener('click', () => {
      drawer.hasAttribute('hidden') || !drawer.classList.contains('site-drawer--open')
        ? openDrawer()
        : closeDrawer();
    });

    drawer?.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeDrawer();
    });
  </script>

  <script src="../src/js/router.js"></script>
</body>
</html>
`;
}

mkdirSync(resolve(root, 'case-studies'), { recursive: true });

caseStudies.forEach((study, i) => {
  const prev = caseStudies[(i - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(i + 1) % caseStudies.length];
  const pageHtml = renderCaseStudyPage(study, { prev, next });
  const filePath = resolve(root, 'case-studies', `${study.slug}.html`);
  writeFileSync(filePath, pageHtml, 'utf8');
  console.log(`✅ case-studies/${study.slug}.html generated`);
});
