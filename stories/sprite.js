import spriteSvg from '../src/icons/sprite.svg?raw';

if (!document.getElementById('sb-sprite')) {
  const div = document.createElement('div');
  div.id = 'sb-sprite';
  div.setAttribute('aria-hidden', 'true');
  div.innerHTML = spriteSvg;
  document.body.insertBefore(div, document.body.firstChild);
}

/**
 * Swaps the sprite symbol on an icon SVG element by replacing the element.
 *
 * Usage:
 *   swapIcon(containerEl.querySelector('.component__icon'), newSvgHtmlString);
 *
 * Why element replacement instead of setAttribute: when the sprite is injected
 * via div.innerHTML the symbols land in HTML namespace. Changing href on an
 * existing <use> element doesn't trigger a browser repaint in that case —
 * the visual stays stuck on the original symbol. Replacing the SVG element
 * entirely forces a fresh render with the correct symbol resolved.
 *
 * Pass the full SVG HTML string (e.g. a CHEVRON_UP / CHEVRON_DOWN constant),
 * not just an icon ID.
 */
export function swapIcon(svgEl, newSvgHtml) {
  if (!svgEl) return;
  const tmp = document.createElement('div');
  tmp.innerHTML = newSvgHtml;
  svgEl.replaceWith(tmp.firstChild);
}
