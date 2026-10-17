import { renderTimeline, defaultArgs } from './timeline.shared.js';

export default {
  title: 'Components/Timeline',
  argTypes: {
    current: { control: 'boolean', description: 'Show current role indicator on first item' },
    items: { table: { disable: true } },
  },
  args: defaultArgs,
};

const render = (args) => renderTimeline(args);

export const Default = { render };
