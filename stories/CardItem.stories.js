import { renderCardItem, defaultArgs, stateArgTypes } from './card-item.shared.js';

export default {
  title: 'Components/CardItem',
  argTypes: stateArgTypes,
  args: defaultArgs,
};

const render = (args) => renderCardItem(args);

export const Default    = { render };
export const Hover      = { args: { state: 'hover'      }, render };
export const Focus      = { args: { state: 'focus'      }, render };
export const FocusHover = { args: { state: 'focus-hover' }, render };
