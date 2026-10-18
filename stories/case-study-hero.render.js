export function renderCaseStudyHero({
  breakpoint = 'desktop',
  title      = 'Case study hook',
  outcome    = 'Figma variables to production CSS, with a full component library built and documented.',
  role       = 'Product Designer · Company · Year',
} = {}) {
  return `<article class="case-study-hero case-study-hero--${breakpoint}">
  <div class="case-study-hero__media">
    <figure class="media-block">
      <div class="media-block__image" role="img" aria-label="Media placeholder"></div>
    </figure>
  </div>
  <div class="case-study-hero__copy">
    <div class="case-study-hero__top">
      <h1 class="case-study-hero__title">${title}</h1>
      <p class="case-study-hero__outcome">${outcome}</p>
    </div>
    <div class="case-study-hero__bottom">
      <p class="case-study-hero__role">${role}</p>
    </div>
  </div>
</article>`;
}
