import '../toggle-component/toggle.css';
import spriteSvg from '../src/icons/sprite.svg?raw';

if (!document.getElementById('sb-sprite')) {
  const div = document.createElement('div');
  div.id = 'sb-sprite';
  div.setAttribute('aria-hidden', 'true');
  div.innerHTML = spriteSvg;
  document.body.insertBefore(div, document.body.firstChild);
}

// TODO: implement renderToggle
// Figma axes:
//   selected: a | b
//   state: default, hover, focus, focus-hover, pressed, option-hover, option-focus
//   density: desktop | mobile
export const renderToggle = ({ selected = 'a', state = 'default', density = 'desktop', labelA = 'Option A', labelB = 'Option B' }) => {
  return `<!-- TODO: render toggle selected=${selected} state=${state} density=${density} -->`;
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
