import { renderContentSection, defaultArgs, contentSectionArgTypes } from './content-section.shared.js';

export default {
  title: 'Components/ContentSection',
  argTypes: contentSectionArgTypes,
  args: defaultArgs,
};

const render = (args) => renderContentSection(args);

export const Default     = { render };
export const WithMedia   = { args: { showMedia: true }, render };
export const WithCaption = { args: { showMedia: true, showCaption: true }, render };
