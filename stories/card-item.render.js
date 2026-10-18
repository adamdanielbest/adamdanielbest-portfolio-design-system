export function renderMediaBlockHtml({ ratio = '16:9' } = {}) {
  const ratioClass = `media-block__image--${ratio.replace(':', '-')}`;
  return `<figure class="media-block" aria-hidden="true">
  <div class="media-block__image ${ratioClass}"></div>
</figure>`;
}

export function renderCardItemCopy({ title = 'Project title', outcome = 'Brief outcome or project description', role = 'Product Designer · Company · Year' } = {}) {
  return `<div class="card-grid-demo__copy">
    <div class="card-grid-demo__top">
      <h2 class="card-grid-demo__title">${title}</h2>
      <p class="card-grid-demo__outcome">${outcome}</p>
    </div>
    <div class="card-grid-demo__bottom">
      <span class="card-grid-demo__role">${role}</span>
    </div>
  </div>`;
}
