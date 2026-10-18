export function renderMediaBlockHtml({ ratio = '16:9' } = {}) {
  const ratioClass = `media-block__image--${ratio.replace(':', '-')}`;
  return `<figure class="media-block" aria-hidden="true">
  <div class="media-block__image ${ratioClass}"></div>
</figure>`;
}

export function renderCardItemCopy({ title = 'Project title', outcome = 'Brief outcome or project description', role = 'Product Designer · Company · Year' } = {}) {
  return `<div class="card-item__copy">
    <div class="card-item__top">
      <h2 class="card-item__title">${title}</h2>
      <p class="card-item__outcome">${outcome}</p>
    </div>
    <div class="card-item__bottom">
      <span class="card-item__role">${role}</span>
    </div>
  </div>`;
}
