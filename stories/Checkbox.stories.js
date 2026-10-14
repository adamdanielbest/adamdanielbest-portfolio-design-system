import { renderCheckbox, stateArgTypes, defaultArgs } from './checkbox.shared.js';

export default {
  title: 'Components/Checkbox',
  argTypes: stateArgTypes,
  args: defaultArgs,
};

const render = (args) => renderCheckbox(args);

export const Unchecked           = { args: { state: 'unchecked'           }, render };
export const UncheckedHover      = { args: { state: 'unchecked-hover'     }, render };
export const UncheckedFocus      = { args: { state: 'unchecked-focus'     }, render };
export const UncheckedFocusHover = { args: { state: 'unchecked-focus-hover' }, render };
export const UncheckedPressed    = { args: { state: 'unchecked-pressed'   }, render };
export const Checked             = { args: { state: 'checked'             }, render };
export const CheckedHover        = { args: { state: 'checked-hover'       }, render };
export const CheckedFocus        = { args: { state: 'checked-focus'       }, render };
export const CheckedFocusHover   = { args: { state: 'checked-focus-hover' }, render };
export const CheckedPressed      = { args: { state: 'checked-pressed'     }, render };
export const Error               = { args: { state: 'error'               }, render };
