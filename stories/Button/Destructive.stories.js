import { renderButton, stateArgTypes, defaultArgs } from '../button.shared.js';

export default {
  title: 'Components/Button/Destructive',
  argTypes: stateArgTypes,
  args: { ...defaultArgs, style: 'destructive' },
};

const render = (args) => renderButton(args);

export const Small  = { args: { size: 'small'  }, render };
export const Medium = { args: { size: 'medium' }, render };
export const Large  = { args: { size: 'large'  }, render };

export const Focus    = { args: { size: 'medium', state: 'focus'    }, render };
export const Disabled = { args: { size: 'medium', state: 'disabled' }, render };
