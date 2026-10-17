import { renderTextLink, stateArgTypes, defaultArgs } from './text-link.shared.js';

export default {
  title: 'Components/TextLink',
  argTypes: stateArgTypes,
  args: defaultArgs,
};

const render = (args) => renderTextLink(args);

export const Default     = { args: { state: 'default'     }, render };
export const Hover       = { args: { state: 'hover'       }, render };
export const Visited     = { args: { state: 'visited'     }, render };
export const Focus       = { args: { state: 'focus'       }, render };
export const FocusHover  = { args: { state: 'focus-hover' }, render };
export const Disabled    = { args: { state: 'disabled'    }, render };
