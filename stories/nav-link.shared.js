import '../text-link-component/text-link.css';
import '../nav-link-component/nav-link.css';
import './sprite.js';

export const renderNavLink = ({ state = 'default', label = 'Link text', iconLeft = false, iconRight = false } = {}) => {
  const stateMap = { hover: 'nav-link-demo--hover', focus: 'nav-link-demo--focus', 'focus-hover': 'nav-link-demo--focus-hover' };
  const stateClass = stateMap[state] ? ` ${stateMap[state]}` : '';

  const iconLeftSvg  = `<svg class="nav-link__icon" aria-hidden="true" focusable="false"><use href="#icon-chevron-backward"/></svg>`;
  const iconRightSvg = `<svg class="nav-link__icon" aria-hidden="true" focusable="false"><use href="#icon-chevron-forward"/></svg>`;

  return `<a class="nav-link nav-link-demo${stateClass}" href="#">
  ${iconLeft ? iconLeftSvg + '\n  ' : ''}<span class="nav-link__label">${label}</span>${iconRight ? '\n  ' + iconRightSvg : ''}
</a>`.trim();
};

export const stateArgTypes = {
  label: { control: 'text' },
  state: {
    control: 'select',
    options: ['default', 'hover', 'focus', 'focus-hover'],
    description: 'Simulated interaction state',
  },
  iconLeft:  { control: 'boolean', description: 'Show left chevron icon'  },
  iconRight: { control: 'boolean', description: 'Show right chevron icon' },
};

export const defaultArgs = { label: 'Link text', state: 'default', iconLeft: false, iconRight: false };
