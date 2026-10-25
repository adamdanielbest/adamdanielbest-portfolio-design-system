import { renderBtnIconOnly, iconOnlyArgTypes, iconOnlyDefaultArgs } from './button.shared.js';

export default {
  title: 'Components/Button/Icon Only',
  argTypes: iconOnlyArgTypes,
  args: { ...iconOnlyDefaultArgs, type: 'primary' },
};

const render = (args) => renderBtnIconOnly(args);

export const Default    = { args: { state: 'default'     }, render };
export const Hover      = { args: { state: 'hover'       }, render };
export const Focus      = { args: { state: 'focus'       }, render };
export const FocusHover = { args: { state: 'focus-hover' }, render };
export const Pressed    = { args: { state: 'pressed'     }, render };
