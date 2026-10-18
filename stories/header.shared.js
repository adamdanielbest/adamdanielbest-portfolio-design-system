import '../header-component/header.css';
import { ICON_MAP } from './header.render.js';

const SPRITE_URL = new URL('../src/icons/sprite.svg', import.meta.url).href;

let spriteLoaded = false;
function ensureSprite() {
  if (spriteLoaded) return;
  spriteLoaded = true;
  fetch(SPRITE_URL)
    .then(r => r.text())
    .then(svg => {
      if (document.querySelector('#header-sprite')) return;
      const div = document.createElement('div');
      div.id = 'header-sprite';
      div.style.display = 'none';
      div.setAttribute('aria-hidden', 'true');
      div.innerHTML = svg;
      document.body.insertBefore(div, document.body.firstChild);
    });
}

function logoHTML({ hover = false, focus = false } = {}) {
  const modifiers = ['header__logo'];
  if (hover) modifiers.push('header__logo--hover');
  if (focus) modifiers.push('header__logo--focus');
  return `<a href="/" class="${modifiers.join(' ')}">adamdanielbest</a>`;
}

function iconBtnHTML(breakpoint) {
  const { id, label } = ICON_MAP[breakpoint] ?? ICON_MAP['mobile'];
  return `
    <button class="header__icon-btn" type="button" aria-label="${label}" tabindex="-1">
      <svg class="header__icon" aria-hidden="true" focusable="false">
        <use href="#${id}"></use>
      </svg>
    </button>`;
}

export function renderHeader({ breakpoint = 'mobile' } = {}, { logoHover = false, logoFocus = false } = {}) {
  ensureSprite();

  const isMobile        = breakpoint === 'mobile';
  const isDesktopClosed = breakpoint === 'desktop-closed';

  const modifiers = ['header-demo'];
  if (isMobile)        modifiers.push('header-demo--mobile');
  if (isDesktopClosed) modifiers.push('header-demo--desktop-closed');

  const label = `Site header, ${breakpoint.replace('-', ' ')}`;
  const logo  = isDesktopClosed ? '' : logoHTML({ hover: logoHover, focus: logoFocus });
  const icon  = iconBtnHTML(breakpoint);

  return `<header class="${modifiers.join(' ')}" aria-label="${label}">${logo}${icon}</header>`;
}

export const breakpointArgTypes = {
  breakpoint: {
    control: 'select',
    options: ['mobile', 'tablet', 'desktop-open', 'desktop-closed'],
    description: 'Viewport breakpoint variant',
  },
};

export const defaultArgs = { breakpoint: 'mobile' };
