import { renderRadio, stateArgTypes, defaultArgs } from './radio.shared.js';

export default {
  title: 'Components/Radio',
  argTypes: stateArgTypes,
  args: defaultArgs,
};

const render = (args) => renderRadio(args);

export const Unchecked          = { args: { state: 'unchecked'           }, render };
export const UncheckedHover     = { args: { state: 'unchecked-hover'     }, render };
export const UncheckedFocus     = { args: { state: 'unchecked-focus'     }, render };
export const UncheckedFocusHover = { args: { state: 'unchecked-focus-hover' }, render };
export const UncheckedPressed   = { args: { state: 'unchecked-pressed'   }, render };
export const Checked            = { args: { state: 'checked'             }, render };
export const CheckedHover       = { args: { state: 'checked-hover'       }, render };
export const CheckedFocus       = { args: { state: 'checked-focus'       }, render };
export const CheckedFocusHover  = { args: { state: 'checked-focus-hover' }, render };
export const CheckedPressed     = { args: { state: 'checked-pressed'     }, render };
export const Error              = { args: { state: 'error'               }, render };
