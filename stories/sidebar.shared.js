import '../sidebar-component/sidebar.css';
import '../content-section-component/content-section.css';
import '../timeline-component/timeline.css';
import '../text-link-component/text-link.css';
import '../button-component/button.css';

const DEFAULT_TIMELINE = [
  { company: 'giffgaff',   meta: 'Product Designer · 2023', current: true  },
  { company: 'Lickd',      meta: 'Product Designer · 2020', current: false },
  { company: 'HubbleHQ',   meta: 'Product Designer · 2019', current: false },
  { company: 'ORDRE',      meta: 'UI Designer · 2019',      current: false },
  { company: 'Harrods',    meta: 'Lead Digital Designer · 2018', current: false },
  { company: 'Boutique 1', meta: 'Digital Designer · 2017', current: false },
  { company: 'Burberry',   meta: 'Digital Designer · 2009', current: false },
];

function renderTimeline(items) {
  return `<ol class="timeline" aria-label="Career timeline">
    ${items.map(item => `<li class="timeline-item${item.current ? ' timeline-item--current' : ''}">
      <span class="timeline-item__icon" aria-hidden="true"></span>
      <div class="timeline-item__body">
        <span class="timeline-item__company">${item.company}</span>
        <span class="timeline-item__meta">${item.meta}</span>
      </div>
    </li>`).join('\n    ')}
  </ol>`;
}

function renderAbout(bio) {
  return `<section class="content-section">
    <h2 class="content-section__heading">About me</h2>
    <p class="content-section__body">${bio}</p>
  </section>`;
}

function renderCareer({ timeline, cvLinkLabel, buttonLabel }) {
  return `<section class="content-section">
    <h2 class="content-section__heading">Career timeline</h2>
    ${renderTimeline(timeline)}
    <div class="sidebar__cv">
      <a class="text-link" href="#">${cvLinkLabel}</a>
      <button class="btn btn--primary btn--large" type="button">${buttonLabel}</button>
    </div>
  </section>`;
}

function renderContact({ emailLabel, linkedinLabel }) {
  return `<footer class="content-section">
    <h2 class="content-section__heading">Get in touch</h2>
    <div class="sidebar__links">
      <a class="text-link" href="#">${emailLabel}</a>
      <a class="text-link" href="#">${linkedinLabel}</a>
    </div>
  </footer>`;
}

export function renderSidebar({
  breakpoint = 'desktop',
  bio = 'Senior Product Designer, London.<br>15 years across luxury heritage (Burberry, Harrods) and high-growth product (giffgaff, Lickd). PoC to launch, DesignOps, measurable impact.',
  timeline = DEFAULT_TIMELINE,
  cvLinkLabel = 'More about my experience',
  buttonLabel = 'Download CV',
  emailLabel = 'Email',
  linkedinLabel = 'LinkedIn',
} = {}) {
  const career = renderCareer({ timeline, cvLinkLabel, buttonLabel });
  const contact = renderContact({ emailLabel, linkedinLabel });

  if (breakpoint === 'mobile') {
    return `<aside class="sidebar-demo sidebar-demo--mobile" aria-label="Sidebar, mobile">
  ${renderAbout(bio)}
  ${career}
  ${contact}
</aside>`;
  }

  if (breakpoint === 'tablet') {
    return `<aside class="sidebar-demo sidebar-demo--tablet" aria-label="Sidebar, tablet">
  <div class="sidebar__tablet-container">
    <div class="sidebar__tablet-col">
      ${renderAbout(bio)}
      ${contact}
    </div>
    <div class="sidebar__tablet-col">
      ${career}
    </div>
  </div>
</aside>`;
  }

  // desktop
  return `<aside class="sidebar-demo sidebar-demo--desktop" aria-label="Sidebar, desktop">
  <div class="sidebar__inner">
    ${renderAbout(bio)}
    ${career}
    ${contact}
  </div>
</aside>`;
}

export const defaultArgs = {
  breakpoint: 'desktop',
  bio: 'Senior Product Designer, London.<br>15 years across luxury heritage (Burberry, Harrods) and high-growth product (giffgaff, Lickd). PoC to launch, DesignOps, measurable impact.',
  timeline: DEFAULT_TIMELINE,
  cvLinkLabel: 'More about my experience',
  buttonLabel: 'Download CV',
  emailLabel: 'Email',
  linkedinLabel: 'LinkedIn',
};

export const sidebarArgTypes = {
  breakpoint: {
    control: 'select',
    options: ['mobile', 'tablet', 'desktop'],
    description: 'Breakpoint variant',
  },
  bio: {
    control: 'text',
    description: 'About me body copy',
  },
  timeline: {
    control: 'object',
    description: 'Career timeline items',
  },
  cvLinkLabel: {
    control: 'text',
    description: 'CV text link label',
  },
  buttonLabel: {
    control: 'text',
    description: 'Primary button label',
  },
  emailLabel: {
    control: 'text',
    description: 'Email link label',
  },
  linkedinLabel: {
    control: 'text',
    description: 'LinkedIn link label',
  },
};
