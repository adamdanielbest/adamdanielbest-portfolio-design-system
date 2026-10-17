import '../media-block-component/media-block.css';

export function renderMediaBlock({ ratio = '4:3', showCaption = false, caption = 'Image caption' } = {}) {
  const ratioClass = ratio === '16:9'
    ? 'media-block__image media-block__image--16-9'
    : 'media-block__image media-block__image--4-3';

  const captionHTML = showCaption
    ? `\n  <figcaption class="media-block__caption">${caption}</figcaption>`
    : '';

  return `<figure class="media-block">
  <div class="${ratioClass}" role="img" aria-label="Media placeholder"></div>${captionHTML}
</figure>`;
}

export const defaultArgs = { ratio: '4:3', showCaption: false, caption: 'Image caption' };

export const mediaBlockArgTypes = {
  ratio: {
    control: 'select',
    options: ['4:3', '16:9'],
    description: 'Aspect ratio',
  },
  showCaption: {
    control: 'boolean',
    description: 'Show caption below image',
  },
  caption: {
    control: 'text',
    description: 'Caption text',
    if: { arg: 'showCaption', truthy: true },
  },
};
