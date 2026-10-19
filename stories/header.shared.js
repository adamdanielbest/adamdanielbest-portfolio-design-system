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
  return `<a href="/" class="${modifiers.join(' ')}" aria-label="Adam Daniel Best — home">
    <svg width="59" height="32" viewBox="0 0 59 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <mask id="logo-mark-border-mask-story" fill="white"><path d="M2 0H57V32H2V0Z"/></mask>
      <path d="M2 0H57V32H2V0Z" fill="var(--background-page)"/>
      <path d="M57 0H55V32H57H59V0H57ZM2 32H4V0H2H0V32H2Z" fill="var(--brand-cobalt)" mask="url(#logo-mark-border-mask-story)"/>
      <rect y="15" width="2" height="2" fill="var(--brand-cobalt)"/>
      <rect x="57" y="15" width="2" height="2" fill="var(--brand-cobalt)"/>
      <rect x="4" y="30" width="2" height="2" fill="var(--brand-cobalt)"/>
      <rect x="53" width="2" height="2" fill="var(--brand-cobalt)"/>
      <rect x="53" y="30" width="2" height="2" fill="var(--brand-cobalt)"/>
      <rect x="4" width="2" height="2" fill="var(--brand-cobalt)"/>
      <path d="M41.4467 14.032C42.2947 12.752 43.6227 12.112 45.4307 12.112C47.2227 12.112 48.6307 12.736 49.6547 13.984C50.6947 15.232 51.2147 16.784 51.2147 18.64C51.2147 20.496 50.6947 22.048 49.6547 23.296C48.6307 24.528 47.2227 25.144 45.4307 25.144C43.4947 25.144 42.0947 24.456 41.2307 23.08V24.856H38.5907V6.856H41.4467V14.032ZM41.3507 18.64C41.3507 19.792 41.6627 20.744 42.2867 21.496C42.9267 22.248 43.7827 22.624 44.8547 22.624C45.9107 22.624 46.7587 22.248 47.3987 21.496C48.0387 20.728 48.3587 19.776 48.3587 18.64C48.3587 17.472 48.0387 16.512 47.3987 15.76C46.7587 15.008 45.9107 14.632 44.8547 14.632C43.7827 14.632 42.9267 15.008 42.2867 15.76C41.6627 16.512 41.3507 17.472 41.3507 18.64Z" fill="var(--text-primary)"/>
      <path d="M31.7608 14.032V6.856H34.6168V24.856H31.9768V23.08C31.1288 24.456 29.7288 25.144 27.7768 25.144C26.0008 25.144 24.5928 24.528 23.5528 23.296C22.5288 22.048 22.0168 20.496 22.0168 18.64C22.0168 16.784 22.5288 15.232 23.5528 13.984C24.5928 12.736 26.0008 12.112 27.7768 12.112C29.5848 12.112 30.9128 12.752 31.7608 14.032ZM31.8808 18.64C31.8808 17.472 31.5608 16.512 30.9208 15.76C30.2968 15.008 29.4488 14.632 28.3768 14.632C27.3208 14.632 26.4728 15.008 25.8328 15.76C25.1928 16.512 24.8728 17.472 24.8728 18.64C24.8728 19.776 25.1928 20.728 25.8328 21.496C26.4728 22.248 27.3208 22.624 28.3768 22.624C29.4488 22.624 30.2968 22.248 30.9208 21.496C31.5608 20.744 31.8808 19.792 31.8808 18.64Z" fill="var(--text-primary)"/>
      <path d="M16.1613 19.528C13.3773 19.528 11.7453 19.656 11.2653 19.912C10.7693 20.168 10.5213 20.632 10.5213 21.304C10.5213 22.376 11.2333 22.912 12.6573 22.912C14.9933 22.912 16.1613 22 16.1613 20.176V19.528ZM12.1533 25.144C10.6813 25.144 9.58531 24.784 8.86531 24.064C8.14531 23.344 7.78531 22.392 7.78531 21.208C7.78531 19.688 8.45731 18.624 9.80131 18.016C10.1213 17.872 10.4253 17.768 10.7133 17.704C11.0173 17.624 11.6253 17.552 12.5373 17.488C13.4493 17.408 14.6573 17.368 16.1613 17.368V16.744C16.1613 15.224 15.2733 14.464 13.4973 14.464C11.9453 14.464 11.0653 15.08 10.8573 16.312H8.07331C8.20131 15.096 8.70531 14.096 9.58531 13.312C10.4813 12.512 11.8093 12.112 13.5693 12.112C15.3453 12.112 16.6813 12.52 17.5773 13.336C18.4893 14.152 18.9453 15.296 18.9453 16.768V24.856H16.3053V23.536C15.4093 24.608 14.0253 25.144 12.1533 25.144Z" fill="var(--text-primary)"/>
    </svg>
  </a>`;
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
