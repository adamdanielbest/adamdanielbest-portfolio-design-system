export const DEFAULT_TIMELINE = [
  { company: 'giffgaff',   meta: 'Product Designer · 2023',      current: true  },
  { company: 'Lickd',      meta: 'Product Designer · 2020',      current: false },
  { company: 'HubbleHQ',   meta: 'Product Designer · 2019',      current: false },
  { company: 'ORDRE',      meta: 'UI Designer · 2019',           current: false },
  { company: 'Harrods',    meta: 'Lead Digital Designer · 2018', current: false },
  { company: 'Boutique 1', meta: 'Digital Designer · 2017',      current: false },
  { company: 'Burberry',   meta: 'Digital Designer · 2009',      current: false },
];

function renderTimeline(items) {
  return `<ol class="timeline" aria-label="Career timeline">
          ${items.map(item => `<li class="timeline-item${item.current ? ' timeline-item--current' : ''}">
              <span class="timeline-item__icon" aria-hidden="true"></span>
              <div class="timeline-item__body">
                <span class="timeline-item__company">${item.company}</span>
                <span class="timeline-item__meta">${item.meta}</span>
              </div>
            </li>`).join('\n          ')}
          </ol>`;
}

export function renderSidebarSections({
  bio           = 'Senior Product Designer, London.<br>15 years across luxury heritage (Burberry, Harrods) and high-growth product (giffgaff, Lickd). PoC to launch, DesignOps, measurable impact.',
  timeline      = DEFAULT_TIMELINE,
  cvLinkLabel   = 'Learn more about my experience',
  cvLinkHref    = '#',
  buttonLabel   = 'View CV',
  emailLabel    = 'Email',
  emailHref     = 'mailto:eyeofsourceproductions@gmail.com',
  linkedinLabel = 'LinkedIn',
  linkedinHref  = 'https://www.linkedin.com/in/adamdanielbest',
} = {}) {
  return `
        <section class="content-section" aria-label="About">
          <h2 class="content-section__heading">About me</h2>
          <p class="content-section__body">${bio}</p>
        </section>

        <section class="content-section" aria-label="Career timeline">
          <h2 class="content-section__heading">Career timeline</h2>
          ${renderTimeline(timeline)}
          <div class="sidebar__cv">
            <p class="sidebar__cv-label">${cvLinkLabel}</p>
            <button class="btn btn--primary btn--large btn--full-width" type="button">${buttonLabel}</button>
          </div>
        </section>

        <footer class="content-section" aria-label="Contact">
          <h2 class="content-section__heading">Get in touch</h2>
          <div class="sidebar__links">
            <a class="action-chip" href="${emailHref}">
              <span class="action-chip__body">
                <span class="action-chip__label">${emailLabel}</span>
                <svg class="action-chip__icon" aria-hidden="true" focusable="false"><use href="#icon-arrow-outward"/></svg>
              </span>
            </a>
            <a class="action-chip" href="${linkedinHref}" target="_blank" rel="noopener noreferrer">
              <span class="action-chip__body">
                <span class="action-chip__label">${linkedinLabel}</span>
                <svg class="action-chip__icon" aria-hidden="true" focusable="false"><use href="#icon-arrow-outward"/></svg>
              </span>
            </a>
          </div>
        </footer>`;
}
