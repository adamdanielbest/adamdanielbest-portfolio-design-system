import { renderHeader, breakpointArgTypes, defaultArgs } from './header.shared.js';

export default {
  title: 'Components/Header',
  argTypes: breakpointArgTypes,
  args: defaultArgs,
};

const render = (args) => renderHeader(args);

export const Mobile         = { args: { breakpoint: 'mobile'          }, render };
export const Tablet         = { args: { breakpoint: 'tablet'          }, render };
export const DesktopOpen    = { args: { breakpoint: 'desktop-open'    }, render };
export const DesktopClosed  = { args: { breakpoint: 'desktop-closed'  }, render };

export const LogoHover = {
  name: 'Logo — Hover',
  args: { breakpoint: 'mobile' },
  render: (args) => renderHeader(args, { logoHover: true }),
};
