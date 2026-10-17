import '../checkbox-component/checkbox.css';
import './sprite.js';

export const renderCheckbox = ({ state = 'unchecked', label = 'Label' }) => {
  const checked  = state.startsWith('checked');
  const isError  = state === 'error';

  // Container modifier classes
  const stateClass = (() => {
    switch (state) {
      case 'checked':               return ' checkbox--checked';
      case 'checked-hover':         return ' checkbox--checked-hover';
      case 'checked-focus':         return ' checkbox--checked-focus';
      case 'checked-focus-hover':   return ' checkbox--checked-focus-hover';
      case 'checked-pressed':       return ' checkbox--checked-pressed';
      case 'unchecked-hover':       return ' checkbox--hover';
      case 'unchecked-focus':       return ' checkbox--focus';
      case 'unchecked-focus-hover': return ' checkbox--focus-hover';
      case 'unchecked-pressed':     return ' checkbox--unchecked-pressed';
      case 'error':                 return ' checkbox--error';
      default:                      return '';
    }
  })();

  const iconId = checked ? 'icon-checkbox-checked-sm' : 'icon-checkbox-sm';

  return `
<button class="checkbox${stateClass}" type="button" role="checkbox" aria-checked="${checked}" aria-label="${label}">
  <span class="checkbox__icon-wrap">
    <svg class="checkbox__icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <use href="#${iconId}"/>
    </svg>
  </span>
  <span class="checkbox__label">${label}</span>
</button>`.trim();
};

export const stateArgTypes = {
  label: { control: 'text' },
  state: {
    control: 'select',
    options: [
      'unchecked', 'unchecked-hover', 'unchecked-focus', 'unchecked-focus-hover', 'unchecked-pressed',
      'checked', 'checked-hover', 'checked-focus', 'checked-focus-hover', 'checked-pressed',
      'error',
    ],
    description: 'Simulated interaction state',
  },
};

export const defaultArgs = { label: 'Label', state: 'unchecked' };
