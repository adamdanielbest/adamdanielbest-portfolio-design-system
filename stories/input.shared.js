import '../input-component/input.css';
import './sprite.js';

const ICON_EYE_SLASH = `<svg aria-hidden="true" focusable="false"><use href="#icon-visibility-off"/></svg>`;
const ICON_MAGNIFIER = `<svg aria-hidden="true" focusable="false"><use href="#icon-search"/></svg>`;

export const renderInput = ({ type = 'text', state = 'default', label = 'Label', placeholder, value, required = false }) => {
  const disabled  = state === 'disabled';
  const filled    = state === 'filled';
  const stateClass = state !== 'default' ? ` input--${state}` : '';
  const inputValue = filled ? (value || (type === 'password' ? 'password' : 'User input')) : '';
  const inputPlaceholder = placeholder || (type === 'search' ? 'Search...' : type === 'password' ? '••••••' : 'Placeholder text');
  const inputType = type === 'search' ? 'search' : type === 'password' ? 'password' : 'text';
  const ariaInvalid = state === 'error' ? ' aria-invalid="true"' : '';
  const disabledAttr = disabled ? ' disabled' : '';

  const fieldInner = type === 'search'
    ? `<span class="input__leading-icon" aria-hidden="true">${ICON_MAGNIFIER}</span>
       <input class="input__value" type="search" placeholder="${inputPlaceholder}" value="${inputValue}"${ariaInvalid}${disabledAttr}>`
    : type === 'password'
    ? `<input class="input__value" type="password" placeholder="${inputPlaceholder}" value="${inputValue}" autocomplete="current-password"${ariaInvalid}${disabledAttr}>
       <span class="input__trailing-icon" aria-hidden="true">${ICON_EYE_SLASH}</span>`
    : `<input class="input__value" type="text" placeholder="${inputPlaceholder}" value="${inputValue}"${ariaInvalid}${disabledAttr}>`;

  const helperText = type !== 'search'
    ? `<p class="input__helper">${state === 'error' ? 'Error message' : 'Helper text'}</p>`
    : '';

  return `
    <div class="input input--${type}${stateClass}" style="max-width:320px">
      <div class="input__label-row">
        <span class="input__label">${label}</span>${required ? '<span class="input__required" aria-hidden="true">*</span>' : ''}
      </div>
      <div class="input__field">${fieldInner}</div>
      ${helperText}
    </div>
  `;
};

export const stateArgTypes = {
  label: { control: 'text' },
  required: { control: 'boolean' },
  state: {
    control: 'select',
    options: ['default', 'hover', 'focus', 'filled', 'disabled', 'error', 'focus-hover'],
    description: 'Simulated interaction state',
  },
};

export const defaultArgs = { label: 'Label', state: 'default' };
