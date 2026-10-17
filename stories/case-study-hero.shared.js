import '../media-block-component/media-block.css';
import '../case-study-hero-component/case-study-hero.css';

export function renderCaseStudyHero({
  breakpoint = 'desktop',
  title      = 'Design to code pipeline',
  outcome    = 'Figma variables to production CSS, with a full component library built and documented using Claude.',
  hookHeading = 'Hook',
  hookBody   = 'One strong statement that sets the stakes and makes the reader want to keep going.',
  role       = 'Product Designer · adamdanielbest · 2026',
} = {}) {
  return `<article class="case-study-hero case-study-hero--${breakpoint}">
  <div class="case-study-hero__media">
    <figure class="media-block">
      <div class="media-block__image" role="img" aria-label="Media placeholder"></div>
    </figure>
  </div>
  <div class="case-study-hero__copy">
    <div class="case-study-hero__top">
      <div class="case-study-hero__title-group">
        <h1 class="case-study-hero__title">${title}</h1>
        <p class="case-study-hero__outcome">${outcome}</p>
      </div>
      <div class="case-study-hero__hook">
        <h2 class="case-study-hero__hook-heading">${hookHeading}</h2>
        <p class="case-study-hero__hook-body">${hookBody}</p>
      </div>
    </div>
    <div class="case-study-hero__bottom">
      <p class="case-study-hero__role">${role}</p>
    </div>
  </div>
</article>`;
}

export const defaultArgs = {
  breakpoint:  'desktop',
  title:       'Design to code pipeline',
  outcome:     'Figma variables to production CSS, with a full component library built and documented using Claude.',
  hookHeading: 'Hook',
  hookBody:    'One strong statement that sets the stakes and makes the reader want to keep going.',
  role:        'Product Designer · adamdanielbest · 2026',
};

export const caseStudyHeroArgTypes = {
  breakpoint: {
    control: 'select',
    options: ['desktop', 'tablet', 'mobile'],
    description: 'Breakpoint variant',
  },
  title:       { control: 'text', description: 'Case study title' },
  outcome:     { control: 'text', description: 'Outcome / subtitle' },
  hookHeading: { control: 'text', description: 'Hook section heading' },
  hookBody:    { control: 'text', description: 'Hook body copy' },
  role:        { control: 'text', description: 'Role · company · year meta' },
};
