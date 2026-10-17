import '../nav-link-component/nav-link.css';
import '../page-nav-component/page-nav.css';
import './sprite.js';

export const renderPageNav = ({
  labels   = true,
  backLabel = 'Back',
  title    = 'Title',
  prevLabel = 'Previous',
  nextLabel = 'Next',
} = {}) => {
  if (labels) {
    return `<nav class="page-nav" aria-label="Page navigation">
  <div class="page-nav__back">
    <a class="nav-link page-nav__link" href="#">
      <span class="nav-link__icon" aria-hidden="true">
        <svg focusable="false"><use href="#icon-arrow-backwards"/></svg>
      </span>
      <span class="nav-link__label">${backLabel}</span>
    </a>
  </div>
  <p class="page-nav__title">${title}</p>
  <div class="page-nav__prev-next">
    <a class="nav-link page-nav__link" href="#" aria-label="${prevLabel}">
      <span class="nav-link__icon" aria-hidden="true">
        <svg focusable="false"><use href="#icon-chevron-backward"/></svg>
      </span>
      <span class="nav-link__label">${prevLabel}</span>
    </a>
    <a class="nav-link page-nav__link" href="#" aria-label="${nextLabel}">
      <span class="nav-link__label">${nextLabel}</span>
      <span class="nav-link__icon" aria-hidden="true">
        <svg focusable="false"><use href="#icon-chevron-forward"/></svg>
      </span>
    </a>
  </div>
</nav>`.trim();
  }

  // labels=false — icons only, 48×48px touch targets
  return `<nav class="page-nav page-nav--icons-only" aria-label="Page navigation">
  <div class="page-nav__back">
    <a class="nav-link page-nav__link page-nav__link--icon-only" href="#" aria-label="${backLabel}">
      <span class="nav-link__icon" aria-hidden="true">
        <svg focusable="false"><use href="#icon-arrow-backwards"/></svg>
      </span>
    </a>
  </div>
  <p class="page-nav__title">${title}</p>
  <div class="page-nav__prev-next">
    <a class="nav-link page-nav__link page-nav__link--icon-only" href="#" aria-label="${prevLabel}">
      <span class="nav-link__icon" aria-hidden="true">
        <svg focusable="false"><use href="#icon-chevron-backward"/></svg>
      </span>
    </a>
    <a class="nav-link page-nav__link page-nav__link--icon-only" href="#" aria-label="${nextLabel}">
      <span class="nav-link__icon" aria-hidden="true">
        <svg focusable="false"><use href="#icon-chevron-forward"/></svg>
      </span>
    </a>
  </div>
</nav>`.trim();
};

export const labelsArgTypes = {
  labels:    { control: 'boolean', description: 'Show text labels (false = icons only, mobile)' },
  backLabel: { control: 'text' },
  title:     { control: 'text' },
  prevLabel: { control: 'text' },
  nextLabel: { control: 'text' },
};

export const defaultArgs = {
  labels:    true,
  backLabel: 'Back',
  title:     'Title',
  prevLabel: 'Previous',
  nextLabel: 'Next',
};
