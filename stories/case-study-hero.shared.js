import '../media-block-component/media-block.css';
import '../case-study-hero-component/case-study-hero.css';
export { renderCaseStudyHero } from './case-study-hero.render.js';

export const defaultArgs = {
  breakpoint:  'desktop',
  title:       'Design to code pipeline',
  outcome:     'Figma variables to production CSS, with a full component library built and documented using Claude.',
  hookHeading: 'Hook',
  hookBody:    'One strong statement that sets the stakes and makes the reader want to keep going.',
  role:        'Product Designer · adamdanielbest · 2026',
};

export const caseStudyHeroArgTypes = {
  breakpoint: {
    control: 'select',
    options: ['desktop', 'tablet', 'mobile'],
    description: 'Breakpoint variant',
  },
  title:       { control: 'text', description: 'Case study title' },
  outcome:     { control: 'text', description: 'Outcome / subtitle' },
  hookHeading: { control: 'text', description: 'Hook section heading' },
  hookBody:    { control: 'text', description: 'Hook body copy' },
  role:        { control: 'text', description: 'Role · company · year meta' },
};
