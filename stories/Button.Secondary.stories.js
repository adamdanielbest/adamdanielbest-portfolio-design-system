import { renderBtn, stateArgTypes, defaultArgs } from './button.shared.js';

export default {
  title: 'Components/Button/Secondary',
  argTypes: stateArgTypes,
  args: { ...defaultArgs, type: 'secondary' },
};

const render = (args) => renderBtn(args);

export const Small  = { args: { size: 'small' },  render };
export const Medium = { args: { size: 'medium' }, render };
export const Large  = { args: { size: 'large' },  render };
