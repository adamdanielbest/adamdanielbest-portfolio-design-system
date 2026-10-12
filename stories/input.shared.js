import '../input-component/input.css';
import spriteSvg from '../src/icons/sprite.svg?raw';

if (!document.getElementById('sb-icon-sprite')) {
  const div = document.createElement('div');
  div.id = 'sb-icon-sprite';
  div.setAttribute('aria-hidden', 'true');
  div.innerHTML = spriteSvg;
  document.body.insertBefore(div, document.body.firstChild);
}

// TODO: implement renderInput for this component's HTML structure
export const renderInput = (args) => {
  return `<!-- TODO: render ${args.type} input (state: ${args.state}) -->`;
};

export const stateArgTypes = {
  label: { control: 'text' },
  placeholder: { control: 'text' },
  state: {
    control: 'select',
    options: ['default', 'hover', 'focus', 'focus-hover', 'filled', 'disabled', 'error'],
    description: 'Simulated interaction state',
  },
};

export const defaultArgs = { label: 'Label', placeholder: 'Placeholder text', state: 'default' };
