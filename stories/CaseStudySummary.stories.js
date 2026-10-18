import { renderCaseStudySummary, modeArgTypes, defaultArgs } from './case-study-summary.shared.js';

export default {
  title: 'Components/CaseStudySummary',
  argTypes: modeArgTypes,
  args: defaultArgs,
};

const render = (args) => renderCaseStudySummary(args);

export const OnLight = { args: { mode: 'on-light' }, render };
export const OnDark  = { args: { mode: 'on-dark'  }, render };
