import { renderCard, defaultArgs, stateArgTypes } from './card.shared.js';

export default {
  title: 'Components/Card',
  argTypes: stateArgTypes,
  args: defaultArgs,
};

const render = (args) => renderCard(args);

export const Default = { render };
export const Hover   = { args: { state: 'hover' }, render };
