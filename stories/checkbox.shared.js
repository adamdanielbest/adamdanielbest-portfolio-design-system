import '../checkbox-component/checkbox.css';
import spriteSvg from '../src/icons/sprite.svg?raw';

if (!document.getElementById('sb-icon-sprite')) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(spriteSvg, 'image/svg+xml');
  const svg = doc.documentElement;
  svg.id = 'sb-icon-sprite';
  svg.setAttribute('aria-hidden', 'true');
  svg.style.display = 'none';
  document.body.insertBefore(svg, document.body.firstChild);
}

// TODO: implement renderCheckbox
// Figma state axis: checked, checked-hover, checked-focus, checked-focus-hover,
// checked-pressed, unchecked, unchecked-hover, unchecked-focus, unchecked-focus-hover,
// unchecked-pressed, error
export const renderCheckbox = ({ state = 'unchecked', label = 'Label' }) => {
  return `<!-- TODO: render checkbox state=${state} -->`;
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
