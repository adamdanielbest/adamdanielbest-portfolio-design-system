import '../select-component/select.css';
import spriteSvg from '../src/icons/sprite.svg?raw';

if (!document.getElementById('sb-icon-sprite')) {
  const div = document.createElement('div');
  div.id = 'sb-icon-sprite';
  div.setAttribute('aria-hidden', 'true');
  div.innerHTML = spriteSvg;
  document.body.insertBefore(div, document.body.firstChild);
}

const CHEVRON_UP   = `<svg class="select__icon" aria-hidden="true" focusable="false" viewBox="0 0 16 8"><path d="M 8 0 L 16 8 L 0 8 Z" fill="currentColor"/></svg>`;
const CHEVRON_DOWN = `<svg class="select__icon" aria-hidden="true" focusable="false" viewBox="0 0 16 8"><path d="M 8 8 L 0 0 L 16 0 Z" fill="currentColor"/></svg>`;

const CHECK_ICON = `<svg class="select__option-check" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><use href="#icon-checkbox-checked"/></svg>`;
const UNCHECK_ICON = `<svg class="select__option-check" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><use href="#icon-checkbox"/></svg>`;

const OPTIONS = ['Option one', 'Option two', 'Option three', 'Option four', 'Option five'];

function buildDropdown(mode) {
  const isMulti = mode === 'multi';
  const items = OPTIONS.map((label, i) => {
    const selected = isMulti && i === 0;
    const check = isMulti
      ? (selected ? CHECK_ICON : UNCHECK_ICON)
      : '';
    const selectedClass = selected ? ' select__option--selected' : '';
    return `<li class="select__option${selectedClass}" role="option" aria-selected="${selected}"><span>${label}</span>${check}</li>`;
  }).join('\n        ');
  return `
      <ul class="select__dropdown" role="listbox"${isMulti ? ' aria-multiselectable="true"' : ''}>
        ${items}
      </ul>`;
}

export const renderSelect = ({ state = 'default', label = 'Label', required = false, value = '' }) => {
  const disabled  = state === 'disabled';
  const filled    = state === 'filled';
  const isSingle  = state === 'select-single-select';
  const isMulti   = state === 'select-multiselect';
  const isOpen    = isSingle || isMulti;

  const fieldStateClass = isOpen ? ' select--open' : (state !== 'default' ? ` select--${state}` : '');
  const filledClass     = filled ? ' select--filled' : '';
  const disabledAttr    = disabled ? ' aria-disabled="true"' : '';
  const displayValue    = filled ? (value || 'Option one') : 'Select option...';
  const icon            = isOpen ? CHEVRON_UP : CHEVRON_DOWN;
  const dropdown        = isOpen ? buildDropdown(isMulti ? 'multi' : 'single') : '';

  const helperText = state === 'error'
    ? `<p class="select__helper">Error message</p>`
    : `<p class="select__helper">Helper text</p>`;

  return `
    <div class="select${fieldStateClass}${filledClass}" style="max-width:320px;${isOpen ? 'padding-bottom:220px;' : ''}"${disabledAttr}>
      <div class="select__label-row">
        <span class="select__label">${label}</span>${required ? '<span class="select__required" aria-hidden="true">*</span>' : ''}
      </div>
      <div class="select__field" role="combobox" aria-haspopup="listbox" aria-expanded="${isOpen}">
        <span class="select__value">${displayValue}</span>
        ${icon}
        ${dropdown}
      </div>
      ${helperText}
    </div>
  `;
};

export const stateArgTypes = {
  label:    { control: 'text' },
  required: { control: 'boolean' },
  value:    { control: 'text', description: 'Selected value (shown in filled state)' },
  state: {
    control: 'select',
    options: ['default', 'hover', 'focus', 'focus-hover', 'filled', 'disabled', 'error', 'select-single-select', 'select-multiselect'],
    description: 'Simulated interaction state',
  },
};

export const defaultArgs = { label: 'Label', state: 'default', required: false, value: '' };
