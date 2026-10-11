import { renderInput, stateArgTypes, defaultArgs } from './input.shared.js';

export default {
  title: 'Components/Input/Search',
  argTypes: stateArgTypes,
  args: { ...defaultArgs, type: 'search' },
};

const render = (args) => renderInput(args);

export const Default  = { args: { state: 'default'  }, render };
export const Focus    = { args: { state: 'focus'     }, render };
export const Filled   = { args: { state: 'filled'    }, render };
export const Disabled = { args: { state: 'disabled'  }, render };
export const Error    = { args: { state: 'error'     }, render };
