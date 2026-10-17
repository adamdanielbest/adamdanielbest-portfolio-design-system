import '../content-section-component/content-section.css';
import { renderMediaBlock } from './media-block.shared.js';

export function renderContentSection({
  heading     = 'Section Heading',
  body        = 'Body copy for this section. Describes context, approach, outcomes, or any narrative content for the case study.',
  showMedia   = false,
  ratio       = '16:9',
  caption     = 'Caption text',
  showCaption = false,
} = {}) {
  const mediaHTML = showMedia
    ? `\n  ${renderMediaBlock({ ratio, showCaption, caption })}`
    : '';

  return `<section class="content-section">
  <h2 class="content-section__heading">${heading}</h2>
  <p class="content-section__body">${body}</p>${mediaHTML}
</section>`;
}

export const defaultArgs = {
  heading:     'Section Heading',
  body:        'Body copy for this section. Describes context, approach, outcomes, or any narrative content for the case study.',
  showMedia:   false,
  ratio:       '16:9',
  showCaption: false,
  caption:     'Caption text',
};

export const contentSectionArgTypes = {
  heading:     { control: 'text',    description: 'Section heading' },
  body:        { control: 'text',    description: 'Body copy' },
  showMedia:   { control: 'boolean', description: 'Show media block below copy' },
  ratio: {
    control: 'select',
    options: ['16:9', '4:3'],
    description: 'Media aspect ratio',
    if: { arg: 'showMedia', truthy: true },
  },
  showCaption: {
    control: 'boolean',
    description: 'Show caption below media',
    if: { arg: 'showMedia', truthy: true },
  },
  caption: {
    control: 'text',
    description: 'Caption text',
    if: { arg: 'showCaption', truthy: true },
  },
};
