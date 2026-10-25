import '../button-component/button.css';
import './sprite.js';

export const renderBtn = ({ type, size, showIcon = false, state = 'default', label = 'Button' }) => {
  const disabled = state === 'disabled';
  const wrapperClass = !disabled && state !== 'default' ? `demo-${state}` : '';
  const inner = showIcon
    ? `<span class="btn__label">${label}</span><span class="btn__divider" aria-hidden="true"></span><span class="btn__icon-container"><svg class="btn__icon" aria-hidden="true" focusable="false"><use href="#icon-download"/></svg></span>`
    : `<span class="btn__label">${label}</span>`;
  const btn = `<button type="button" class="btn btn--${type} btn--${size}${showIcon ? ' btn--icon' : ''}"${disabled ? ' disabled' : ''}>${inner}</button>`;
  return wrapperClass ? `<div class="${wrapperClass}">${btn}</div>` : btn;
};

export const stateArgTypes = {
  label: { control: 'text' },
  state: {
    control: 'select',
    options: ['default', 'hover', 'focus', 'focus-hover', 'pressed', 'disabled'],
    description: 'Simulated interaction state',
  },
};

export const defaultArgs = { label: 'Button', state: 'default' };

export const renderBtnIconOnly = ({ type = 'primary', state = 'default', icon = 'close-sm', label = 'Close' }) => {
  const disabled = state === 'disabled';
  const wrapperClass = !disabled && state !== 'default' ? `demo-${state}` : '';
  const btn = `<button type="button" class="btn btn--${type} btn--icon-only" aria-label="${label}"${disabled ? ' disabled' : ''}>
    <svg class="btn__icon" aria-hidden="true" focusable="false"><use href="#icon-${icon}"/></svg>
  </button>`;
  return wrapperClass ? `<div class="${wrapperClass}">${btn}</div>` : btn;
};

export const iconOnlyArgTypes = {
  icon: { control: 'text' },
  label: { control: 'text' },
  state: {
    control: 'select',
    options: ['default', 'hover', 'focus', 'focus-hover', 'pressed'],
    description: 'Simulated interaction state',
  },
};

export const iconOnlyDefaultArgs = { icon: 'close-sm', label: 'Close', state: 'default' };
