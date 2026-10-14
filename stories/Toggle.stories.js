import { renderToggle, stateArgTypes, defaultArgs } from './toggle.shared.js';

export default {
  title: 'Components/Toggle',
  argTypes: stateArgTypes,
  args: defaultArgs,
};

const render = (args) => renderToggle(args);

export const Default      = { args: { state: 'default'      }, render };
export const Hover        = { args: { state: 'hover'        }, render };
export const Focus        = { args: { state: 'focus'        }, render };
export const FocusHover   = { args: { state: 'focus-hover'  }, render };
export const Pressed      = { args: { state: 'pressed'      }, render };
export const OptionHover  = { args: { state: 'option-hover' }, render };
export const OptionFocus  = { args: { state: 'option-focus' }, render };
export const SelectedB    = { args: { state: 'default', selected: 'b' }, render };
export const Mobile       = { args: { state: 'default', density: 'mobile' }, render };
