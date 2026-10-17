import { renderNavLink, stateArgTypes, defaultArgs } from './nav-link.shared.js';

export default {
  title: 'Components/NavLink',
  argTypes: stateArgTypes,
  args: defaultArgs,
};

const render = (args) => renderNavLink(args);

export const Default      = { args: { state: 'default'                              }, render };
export const Hover        = { args: { state: 'hover'                                }, render };
export const Focus        = { args: { state: 'focus'                                }, render };
export const FocusHover   = { args: { state: 'focus-hover'                          }, render };
export const IconLeft     = { args: { state: 'default', iconLeft: true              }, render };
export const IconRight    = { args: { state: 'default', iconRight: true             }, render };
export const BothIcons    = { args: { state: 'default', iconLeft: true, iconRight: true }, render };
export const HoverIcons   = { args: { state: 'hover',   iconLeft: true, iconRight: true }, render };
export const FocusIcons   = { args: { state: 'focus',   iconLeft: true, iconRight: true }, render };
export const FocusHoverIcons = { args: { state: 'focus-hover', iconLeft: true, iconRight: true }, render };
