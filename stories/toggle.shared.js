import '../toggle-component/toggle.css';
import './sprite.js';

export const renderToggle = ({ selected = 'a', state = 'default', density = 'desktop', labelA = 'Option A', labelB = 'Option B' }) => {
  const densityClass = density === 'mobile' ? ' toggle--density-mobile' : '';

  // State classes on the container
  const containerState = state === 'focus' || state === 'focus-hover' ? ' toggle--focus' : '';

  // Per-option state modifiers
  const aHover   = ((state === 'hover' || state === 'focus-hover') && selected === 'a') || state === 'option-hover' ? ' toggle__option--hover' : '';
  const bHover   = ((state === 'hover' || state === 'focus-hover') && selected === 'b') ? ' toggle__option--hover' : '';
  const aFocus   = (state === 'focus' || state === 'focus-hover' || (state === 'option-focus' && selected === 'a')) ? ' toggle__option--focus' : '';
  const bFocus   = (state === 'option-focus' && selected === 'b') ? ' toggle__option--focus' : '';
  const aPressed = state === 'pressed' && selected === 'a' ? ' toggle__option--pressed' : '';
  const bPressed = state === 'pressed' && selected === 'b' ? ' toggle__option--pressed' : '';

  const aSelected = selected === 'a' ? ' toggle__option--selected' : '';
  const bSelected = selected === 'b' ? ' toggle__option--selected' : '';

  return `
<div class="toggle${densityClass}${containerState}" role="group" aria-label="Toggle">
  <button class="toggle__option${aSelected}${aHover}${aFocus}${aPressed}" type="button" aria-pressed="${selected === 'a'}" tabindex="0">${labelA}</button>
  <button class="toggle__option${bSelected}${bHover}${bFocus}${bPressed}" type="button" aria-pressed="${selected === 'b'}" tabindex="-1">${labelB}</button>
</div>`.trim();
};

export const stateArgTypes = {
  selected: { control: 'select', options: ['a', 'b'], description: 'Active option' },
  density:  { control: 'select', options: ['desktop', 'mobile'] },
  labelA:   { control: 'text' },
  labelB:   { control: 'text' },
  state: {
    control: 'select',
    options: ['default', 'hover', 'focus', 'focus-hover', 'pressed', 'option-hover', 'option-focus'],
    description: 'Simulated interaction state',
  },
};

export const defaultArgs = { selected: 'a', state: 'default', density: 'desktop', labelA: 'Option A', labelB: 'Option B' };
