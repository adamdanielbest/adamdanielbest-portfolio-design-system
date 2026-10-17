import '../text-link-component/text-link.css';

export const renderTextLink = ({ state = 'default', label = 'Link text' } = {}) => {
  const stateClass = (() => {
    switch (state) {
      case 'hover':       return ' text-link--hover';
      case 'visited':     return ' text-link--visited';
      case 'focus':       return ' text-link--focus';
      case 'focus-hover': return ' text-link--focus-hover';
      case 'disabled':    return ' text-link--disabled';
      default:            return '';
    }
  })();

  const isDisabled = state === 'disabled';

  return `<a
  class="text-link${stateClass}"
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
