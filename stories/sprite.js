import spriteSvg from '../src/icons/sprite.svg?raw';

if (!document.getElementById('sb-sprite')) {
  const div = document.createElement('div');
  div.id = 'sb-sprite';
  div.setAttribute('aria-hidden', 'true');
  div.innerHTML = spriteSvg;
  document.body.insertBefore(div, document.body.firstChild);
}

/**
 * Swaps the sprite symbol on an icon SVG element.
 *
 * Usage:
 *   swapIcon(containerEl.querySelector('.component__icon'), '#icon-name');
 *
 * Why: SVG <use> elements must be swapped by setAttribute on the <use> child,
 * not by replacing the SVG's innerHTML. Query the parent SVG first, then find
 * the <use> within it — compound selectors like '.icon use' can fail across
 * the SVG namespace boundary.
 */
export function swapIcon(svgEl, iconId) {
  if (!svgEl) return;
  const useEl = svgEl.querySelector('use');
  if (useEl) useEl.setAttribute('href', iconId);
}
