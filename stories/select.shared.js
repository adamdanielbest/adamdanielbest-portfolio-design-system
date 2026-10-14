import '../select-component/select.css';
import spriteSvg from '../src/icons/sprite.svg?raw';

if (!document.getElementById('sb-icon-sprite')) {
  const div = document.createElement('div');
  div.id = 'sb-icon-sprite';
  div.setAttribute('aria-hidden', 'true');
  div.innerHTML = spriteSvg;
  document.body.insertBefore(div, document.body.firstChild);
}

const CHEVRON_UP   = `<svg class="select__icon" aria-hidden="true" focusable="false" viewBox="0 0 16 16" style="transform:rotate(180deg)"><use href="#icon-arrow-drop-down"/></svg>`;
const CHEVRON_DOWN = `<svg class="select__icon" aria-hidden="true" focusable="false" viewBox="0 0 16 16"><use href="#icon-arrow-drop-down"/></svg>`;

const CHECK_ICON   = `<svg class="select__option-check" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><use href="#icon-checkbox-checked"/></svg>`;
const UNCHECK_ICON = `<svg class="select__option-check" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><use href="#icon-checkbox"/></svg>`;

const OPTIONS = ['Option one', 'Option two', 'Option three', 'Option four', 'Option five'];

function buildDropdown(mode, visible, preSelected) {
  const isMulti = mode === 'multi';
  const items = OPTIONS.map((label, i) => {
    const selected = preSelected === label;
    const check    = isMulti ? (selected ? CHECK_ICON : UNCHECK_ICON) : '';
    const cls      = selected ? ' select__option--selected' : '';
    return `<li class="select__option${cls}" role="option" aria-selected="${selected}"><span>${label}</span>${check}</li>`;
  }).join('\n        ');
  return `
      <ul class="select__dropdown" role="listbox"${isMulti ? ' aria-multiselectable="true"' : ''}${!visible ? ' style="display:none"' : ''}>
        ${items}
      </ul>`;
}

export const renderSelect = ({ state = 'default', label = 'Label', required = false, value = '' }) => {
  const disabled   = state === 'disabled';
  const filled     = state === 'filled';
  const isSingle   = state === 'select-single-select';
  const isMulti    = state === 'select-multiselect';
  const isOpen     = isSingle || isMulti;
  const mode       = isMulti ? 'multi' : 'single';
  const preSelected = filled ? (value || 'Option one') : '';

  const fieldStateClass = isOpen ? ' select--open' : (state !== 'default' ? ` select--${state}` : '');
  const filledClass     = filled ? ' select--filled' : '';
  const disabledAttr    = disabled ? ' aria-disabled="true"' : '';
  const displayValue    = filled ? (value || 'Option one') : 'Select option...';
  const icon            = isOpen ? CHEVRON_UP : CHEVRON_DOWN;

  const helperText = state === 'error'
    ? `<p class="select__helper">Error message</p>`
    : `<p class="select__helper">Helper text</p>`;

  return `
    <div class="select${fieldStateClass}${filledClass}" style="max-width:320px;padding-bottom:220px;"${disabledAttr}>
      <div class="select__label-row">
        <span class="select__label">${label}</span>${required ? '<span class="select__required" aria-hidden="true">*</span>' : ''}
      </div>
      <div class="select__field" role="combobox" aria-haspopup="listbox" aria-expanded="${isOpen}">
        <span class="select__value">${displayValue}</span>
        ${icon}
        ${buildDropdown(mode, isOpen, preSelected)}
      </div>
      ${helperText}
    </div>
  `;
};

export function attachSelectInteraction(canvasElement, { multi = false } = {}) {
  const wrap     = canvasElement.querySelector('.select');
  const field    = canvasElement.querySelector('.select__field');
  const valueEl  = canvasElement.querySelector('.select__value');
  const dropdown = canvasElement.querySelector('.select__dropdown');
  const options  = canvasElement.querySelectorAll('.select__option');
  const iconEl   = canvasElement.querySelector('.select__icon');

  if (!wrap || !field || !dropdown) return;
  if (wrap.classList.contains('select--disabled')) return;

  let isOpen = dropdown.style.display !== 'none';

  function setIcon(open) {
    const svg = field.querySelector('.select__icon');
    if (!svg) return;
    svg.style.transform = open ? 'rotate(180deg)' : '';
  }

  function openDropdown() {
    // Strip transient state classes so open ring shows cleanly
    ['select--hover','select--focus','select--focus-hover','select--error'].forEach(c => wrap.classList.remove(c));
    wrap.classList.add('select--open');
    dropdown.style.display = '';
    field.setAttribute('aria-expanded', 'true');
    setIcon(true);
    isOpen = true;
  }

  function closeDropdown() {
    wrap.classList.remove('select--open');
    dropdown.style.display = 'none';
    field.setAttribute('aria-expanded', 'false');
    setIcon(false);
    isOpen = false;
  }

  function updateFieldValue() {
    const selected = [...options]
      .filter(o => o.classList.contains('select__option--selected'))
      .map(o => o.querySelector('span').textContent);
    valueEl.textContent = selected.length ? selected.join(', ') : 'Select option...';
    wrap.classList.toggle('select--filled', selected.length > 0);
  }

  field.addEventListener('click', e => {
    e.stopPropagation();
    isOpen ? closeDropdown() : openDropdown();
  });

  options.forEach(opt => {
    opt.addEventListener('click', e => {
      e.stopPropagation();
      if (multi) {
        const nowSelected = !opt.classList.contains('select__option--selected');
        opt.classList.toggle('select__option--selected', nowSelected);
        opt.setAttribute('aria-selected', String(nowSelected));
        const useEl = opt.querySelector('use');
        if (useEl) useEl.setAttribute('href', nowSelected ? '#icon-checkbox-checked' : '#icon-checkbox');
        updateFieldValue();
      } else {
        options.forEach(o => { o.classList.remove('select__option--selected'); o.setAttribute('aria-selected', 'false'); });
        opt.classList.add('select__option--selected');
        opt.setAttribute('aria-selected', 'true');
        valueEl.textContent = opt.querySelector('span').textContent;
        wrap.classList.add('select--filled');
        closeDropdown();
      }
    });
  });

  document.addEventListener('click', () => { if (isOpen) closeDropdown(); });
}

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
