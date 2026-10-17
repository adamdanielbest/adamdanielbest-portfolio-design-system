import { renderTimeline, defaultArgs } from './timeline.shared.js';

export default {
  title: 'Components/Timeline',
  args: defaultArgs,
};

const render = (args) => renderTimeline(args);

export const Default = { render };
