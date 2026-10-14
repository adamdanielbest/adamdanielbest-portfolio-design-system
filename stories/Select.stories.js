import { renderSelect, stateArgTypes, defaultArgs, attachSelectInteraction } from './select.shared.js';

export default {
  title: 'Components/Select',
  argTypes: stateArgTypes,
  args: defaultArgs,
};

const render = (args) => renderSelect(args);
const play   = ({ canvasElement }) => attachSelectInteraction(canvasElement);
const playM  = ({ canvasElement }) => attachSelectInteraction(canvasElement, { multi: true });

export const Default      = { args: { state: 'default'              }, render, play };
export const Hover        = { args: { state: 'hover'                }, render, play };
export const Focus        = { args: { state: 'focus'                }, render, play };
export const FocusHover   = { args: { state: 'focus-hover'          }, render, play };
export const Filled       = { args: { state: 'filled'               }, render, play };
export const Disabled     = { args: { state: 'disabled'             }, render };
export const Error        = { args: { state: 'error'                }, render, play };
export const Required     = { args: { state: 'default', required: true }, render, play };
export const SingleSelect = { args: { state: 'select-single-select' }, render, play };
export const Multiselect  = { args: { state: 'select-multiselect'   }, render, play: playM };
