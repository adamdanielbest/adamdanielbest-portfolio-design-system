import '../media-block-component/media-block.css';
import '../case-study-hero-component/case-study-hero.css';
export { renderCaseStudyHero } from './case-study-hero.render.js';

export const defaultArgs = {
  breakpoint: 'desktop',
  title:      'Case study hook',
  outcome:    'Figma variables to production CSS, with a full component library built and documented using Claude.',
  role:       'Product Designer · adamdanielbest · 2026',
};

export const caseStudyHeroArgTypes = {
  breakpoint: {
    control: 'select',
    options: ['desktop', 'tablet', 'mobile'],
    description: 'Breakpoint variant',
  },
  title:   { control: 'text', description: 'Hook — the one-line case study statement' },
  outcome: { control: 'text', description: 'Outcome / subtitle' },
  role:    { control: 'text', description: 'Role · company · year meta' },
};
