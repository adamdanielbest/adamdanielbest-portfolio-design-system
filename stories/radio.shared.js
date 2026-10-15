import '../radio-component/radio.css';
import './sprite.js';

const modifierMap = {
  'unchecked':             '',
  'unchecked-hover':       'radio--hover',
  'unchecked-focus':       'radio--focus',
  'unchecked-focus-hover': 'radio--focus-hover',
  'unchecked-pressed':     'radio--unchecked-pressed',
  'checked':               'radio--checked',
  'checked-hover':         'radio--checked-hover',
  'checked-focus':         'radio--checked-focus',
  'checked-focus-hover':   'radio--checked-focus-hover',
  'checked-pressed':       'radio--checked-pressed',
  'error':                 'radio--error',
};

export const renderRadio = ({ state = 'unchecked', label = 'Label' }) => {
  const isChecked = state.startsWith('checked');
  const isError = state === 'error';
  const modifier = modifierMap[state] ?? '';
  const classes = ['radio', modifier].filter(Boolean).join(' ');
  const iconId = isChecked ? 'icon-radio-button-checked-sm' : 'icon-radio-button-unchecked-sm';

  return `<label class="${classes}">
  <input
    type="radio"
    style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;"
    ${isChecked ? 'checked' : ''}
    ${isError ? 'aria-invalid="true"' : ''}
  />
  <span class="radio__icon-wrap" aria-hidden="true">
    <svg class="radio__icon" focusable="false">
      <use href="#${iconId}"/>
    </svg>
  </span>
  <span class="radio__label">${label}</span>
</label>`;
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
