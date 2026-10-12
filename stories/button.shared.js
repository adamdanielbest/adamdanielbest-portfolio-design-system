import '../button-component/button.css';
import spriteSvg from '../src/icons/sprite.svg?raw';

if (!document.getElementById('sb-icon-sprite')) {
  const div = document.createElement('div');
  div.id = 'sb-icon-sprite';
  div.setAttribute('aria-hidden', 'true');
  div.innerHTML = spriteSvg;
  document.body.insertBefore(div, document.body.firstChild);
}

// TODO: implement renderButton for this component's HTML structure
export const renderButton = (args) => {
  return `<!-- TODO: render ${args.style} ${args.size} button (state: ${args.state}) -->`;
};

export const stateArgTypes = {
  label: { control: 'text' },
  state: {
    control: 'select',
    options: ['default', 'hover', 'focus', 'focus-hover', 'pressed', 'disabled'],
    description: 'Simulated interaction state',
  },
  size: {
    control: 'select',
    options: ['small', 'medium', 'large'],
  },
};

export const defaultArgs = { label: 'Button', state: 'default', size: 'medium' };
