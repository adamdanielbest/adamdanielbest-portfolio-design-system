import { renderSelect, stateArgTypes, defaultArgs, attachSelectInteraction } from './select.shared.js';

export default {
  title: 'Components/Select',
  argTypes: stateArgTypes,
  args: defaultArgs,
};

const render     = (args) => renderSelect(args);
const makeSingle = ({ canvasElement }) => attachSelectInteraction(canvasElement);
const makeMulti  = ({ canvasElement }) => attachSelectInteraction(canvasElement, { multi: true });

export const Default      = { args: { state: 'default'              }, render, play: makeSingle };
export const Hover        = { args: { state: 'hover'                }, render, play: makeSingle };
export const Focus        = { args: { state: 'focus'                }, render, play: makeSingle };
export const FocusHover   = { args: { state: 'focus-hover'          }, render, play: makeSingle };
export const Filled       = { args: { state: 'filled'               }, render, play: makeSingle };
export const Disabled     = { args: { state: 'disabled'             }, render };
export const Error        = { args: { state: 'error'                }, render, play: makeSingle };
export const Required     = { args: { state: 'default', required: true }, render, play: makeSingle };
export const SingleSelect = { args: { state: 'select-single-select' }, render, play: makeSingle };
export const Multiselect  = { args: { state: 'select-multiselect'   }, render, play: makeMulti };
