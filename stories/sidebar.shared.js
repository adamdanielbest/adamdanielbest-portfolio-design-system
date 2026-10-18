import '../sidebar-component/sidebar.css';
import '../content-section-component/content-section.css';
import '../timeline-component/timeline.css';
import '../text-link-component/text-link.css';
import '../button-component/button.css';
import { DEFAULT_TIMELINE, renderSidebarSections } from './sidebar.render.js';

export function renderSidebar({
  breakpoint  = 'desktop',
  bio         = 'Senior Product Designer, London.<br>15 years across luxury heritage (Burberry, Harrods) and high-growth product (giffgaff, Lickd). PoC to launch, DesignOps, measurable impact.',
  timeline    = DEFAULT_TIMELINE,
  cvLinkLabel = 'More about my experience',
  buttonLabel = 'Download CV',
  emailLabel  = 'Email',
  linkedinLabel = 'LinkedIn',
} = {}) {
  const sections = renderSidebarSections({
    bio, timeline, cvLinkLabel, buttonLabel,
    emailLabel, emailHref: '#',
    linkedinLabel, linkedinHref: '#',
  });

  if (breakpoint === 'mobile') {
    return `<aside class="sidebar-demo sidebar-demo--mobile" aria-label="Sidebar, mobile">
  <div class="sidebar__inner">${sections}
  </div>
</aside>`;
  }

  if (breakpoint === 'tablet') {
    return `<aside class="sidebar-demo sidebar-demo--tablet" aria-label="Sidebar, tablet">
  <div class="sidebar__inner">${sections}
  </div>
</aside>`;
  }

  // desktop
  return `<aside class="sidebar-demo sidebar-demo--desktop" aria-label="Sidebar, desktop">
  <div class="sidebar__inner">${sections}
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
