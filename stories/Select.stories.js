import { renderSelect, stateArgTypes, defaultArgs } from './select.shared.js';

export default {
  title: 'Components/Select',
  argTypes: stateArgTypes,
  args: defaultArgs,
};

const render = (args) => renderSelect(args);

export const Default    = { args: { state: 'default'     }, render };
export const Hover      = { args: { state: 'hover'       }, render };
export const Focus      = { args: { state: 'focus'       }, render };
export const FocusHover = { args: { state: 'focus-hover' }, render };
export const Filled     = { args: { state: 'filled'      }, render };
export const Disabled   = { args: { state: 'disabled'    }, render };
export const Error      = { args: { state: 'error'       }, render };
export const Required   = { args: { state: 'default', required: true }, render };
