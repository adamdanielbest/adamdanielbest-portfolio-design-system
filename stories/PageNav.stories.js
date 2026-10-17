import { renderPageNav, labelsArgTypes, defaultArgs } from './page-nav.shared.js';

export default {
  title: 'Components/PageNav',
  argTypes: labelsArgTypes,
  args: defaultArgs,
};

const render = (args) => renderPageNav(args);

export const WithLabels  = { args: { labels: true  }, render };
export const IconsOnly   = { args: { labels: false }, render };
