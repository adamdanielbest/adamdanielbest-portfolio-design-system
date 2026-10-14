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
 * Why path cloning instead of <use> href swap: when the sprite is injected via
 * div.innerHTML, the browser caches the rendered output of <use> elements and
 * does not repaint when href changes — not even when the element is replaced
 * entirely. Cloning the path nodes directly out of the sprite symbol bypasses
 * the <use> rendering cache and reliably updates the visual.
 */
export function swapIcon(svgEl, iconId) {
  if (!svgEl) return;
  const doc = svgEl.ownerDocument;
  const symbolId = iconId.startsWith('#') ? iconId.slice(1) : iconId;
  const symbol = doc.getElementById(symbolId);
  if (!symbol) return;
  svgEl.innerHTML = '';
  for (const child of symbol.children) {
    svgEl.appendChild(child.cloneNode(true));
  }
}
