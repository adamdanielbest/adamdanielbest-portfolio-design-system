import { renderSidebar, defaultArgs, sidebarArgTypes } from './sidebar.shared.js';

export default {
  title: 'Components/Sidebar',
  argTypes: sidebarArgTypes,
  args: defaultArgs,
};

const render = (args) => renderSidebar(args);

export const Desktop = { args: { breakpoint: 'desktop' }, render };
export const Tablet  = { args: { breakpoint: 'tablet'  }, render };
export const Mobile  = { args: { breakpoint: 'mobile'  }, render };
