import { renderActionChip, stateArgTypes, defaultArgs } from './action-chip.shared.js';

export default {
  title: 'Components/ActionChip/As Button',
  argTypes: stateArgTypes,
  args: { ...defaultArgs, label: 'Action' },
};

const render = (args) => renderActionChip(args);

export const Default    = { args: { state: 'default' }, render };
export const Hover      = { args: { state: 'hover' }, render };
export const Focus      = { args: { state: 'focus' }, render };
export const FocusHover = { args: { state: 'focus-hover' }, render };
export const Disabled   = { args: { state: 'disabled' }, render };
