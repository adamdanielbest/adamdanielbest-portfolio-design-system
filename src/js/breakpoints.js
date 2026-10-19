// Breakpoint tokens — mirrors --bp-* custom properties in site.css.
// Import this module wherever JS needs to respond to breakpoints.
export const bp = {
  sm:  640,
  md:  768,
  lg:  1024,
  xl:  1280,
  '2xl': 1536,
};

// Returns a MediaQueryList for a max-width breakpoint, e.g. below('lg')
export const below = (key) => window.matchMedia(`(max-width: ${bp[key] - 1}px)`);
