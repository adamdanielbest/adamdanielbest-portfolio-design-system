import { renderActionChip, stateArgTypes, defaultArgs } from './action-chip.shared.js';

export default {
  title: 'Components/ActionChip',
  argTypes: stateArgTypes,
  args: defaultArgs,
};

const render = (args) => renderActionChip(args);

export const AsLink   = { args: { label: 'Email', href: '#', state: 'default' }, render };
export const AsButton = { args: { label: 'Action', state: 'default' }, render };
export const Hover    = { args: { label: 'Action', state: 'hover' }, render };
export const Focus    = { args: { label: 'Action', state: 'focus' }, render };
export const Disabled = { args: { label: 'Action', state: 'disabled' }, render };
