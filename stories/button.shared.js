import '../button-component/button.css';
import spriteSvg from '../src/icons/sprite.svg?raw';

if (!document.getElementById('sb-sprite')) {
  const div = document.createElement('div');
  div.id = 'sb-sprite';
  div.setAttribute('aria-hidden', 'true');
  div.innerHTML = spriteSvg;
  document.body.insertBefore(div, document.body.firstChild);
}

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
