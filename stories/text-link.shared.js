import '../text-link-component/text-link.css';

export const renderTextLink = ({ state = 'default', label = 'Link text' } = {}) => {
  const stateClass = (() => {
    switch (state) {
      case 'hover':       return ' link-demo--hover';
      case 'visited':     return ' link-demo--visited';
      case 'focus':       return ' link-demo--focus';
      case 'focus-hover': return ' link-demo--focus-hover';
      case 'disabled':    return ' link-demo--disabled';
      default:            return '';
    }
  })();

  const isDisabled = state === 'disabled';

  return `<a
  class="link-demo${stateClass}"
  href="${isDisabled ? undefined : '#'}"
  ${isDisabled ? 'aria-disabled="true" tabindex="-1"' : ''}
>${label}</a>`.trim();
};

export const stateArgTypes = {
  label: { control: 'text' },
  state: {
    control: 'select',
    options: ['default', 'hover', 'visited', 'focus', 'focus-hover', 'disabled'],
    description: 'Simulated interaction state',
  },
};

export const defaultArgs = { label: 'Link text', state: 'default' };
