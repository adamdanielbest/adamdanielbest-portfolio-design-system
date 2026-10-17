import { renderCaseStudyHero, defaultArgs, caseStudyHeroArgTypes } from './case-study-hero.shared.js';

export default {
  title: 'Components/CaseStudyHero',
  argTypes: caseStudyHeroArgTypes,
  args: defaultArgs,
};

const render = (args) => renderCaseStudyHero(args);

export const Desktop = { args: { breakpoint: 'desktop' }, render };
export const Tablet  = { args: { breakpoint: 'tablet'  }, render };
export const Mobile  = { args: { breakpoint: 'mobile'  }, render };
