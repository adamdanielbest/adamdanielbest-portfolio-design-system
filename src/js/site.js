import { below } from './breakpoints.js';
import './lightbox.js';

// Auto-collapse the desktop sidebar when viewport drops below lg (1024px).
// Only acts if the sidebar is currently open (not already collapsed).
const lgQuery = below('lg');

function collapseSidebarIfNeeded(matches) {
  if (!matches) return;
  const aside    = document.querySelector('.site-aside');
  const siteMain = document.querySelector('.site-main');
  if (!aside || aside.classList.contains('site-aside--collapsed')) return;

  aside.classList.add('site-aside--collapsed');
  siteMain?.classList.add('site-main--aside-collapsed');

  const toggle   = document.querySelector('.js-sidebar-toggle');
  const icon     = toggle?.querySelector('use');
  toggle?.setAttribute('aria-label', 'Open sidebar');
  toggle?.setAttribute('aria-expanded', 'false');
  icon?.setAttribute('href', '#icon-left-panel-open-sm');
}

lgQuery.addEventListener('change', (e) => collapseSidebarIfNeeded(e.matches));
// Run once on load in case the page is already narrow
collapseSidebarIfNeeded(lgQuery.matches);
