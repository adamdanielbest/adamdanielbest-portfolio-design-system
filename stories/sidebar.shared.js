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
  cvLinkLabel = 'Learn more about my experience',
  buttonLabel = 'View CV',
  emailLabel  = 'Email',
  linkedinLabel = 'LinkedIn',
} = {}) {
  const sections = renderSidebarSections({
    bio, timeline, cvLinkLabel, buttonLabel,
    emailLabel, emailHref: '#',
    linkedinLabel, linkedinHref: '#',
  });

  const footer = `
  <div class="sidebar-footer">
    <a class="sidebar-logo" href="/" aria-label="Adam Daniel Best — home">
      <svg class="sidebar-logo__icon" width="36" height="32" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <mask id="logo-icon-border-mask-sb" fill="white"><path d="M2 0H34V32H2V0Z"/></mask>
        <path d="M2 0H34V32H2V0Z" fill="var(--background-page)"/>
        <path d="M34 0H32V32H34H36V0H34ZM2 32H4V0H2H0V32H2Z" fill="var(--brand-cobalt)" mask="url(#logo-icon-border-mask-sb)"/>
        <rect y="15" width="2" height="2" fill="var(--brand-cobalt)"/>
        <rect x="34" y="15" width="2" height="2" fill="var(--brand-cobalt)"/>
        <rect x="4" y="30" width="2" height="2" fill="var(--brand-cobalt)"/>
        <rect x="30" width="2" height="2" fill="var(--brand-cobalt)"/>
        <rect x="30" y="30" width="2" height="2" fill="var(--brand-cobalt)"/>
        <rect x="4" width="2" height="2" fill="var(--brand-cobalt)"/>
        <path d="M20.796 16.9C18.012 16.9 16.38 17.028 15.9 17.284C15.404 17.54 15.156 18.004 15.156 18.676C15.156 19.748 15.868 20.284 17.292 20.284C19.628 20.284 20.796 19.372 20.796 17.548V16.9ZM16.788 22.516C15.316 22.516 14.22 22.156 13.5 21.436C12.78 20.716 12.42 19.764 12.42 18.58C12.42 17.06 13.092 15.996 14.436 15.388C14.756 15.244 15.06 15.14 15.348 15.076C15.652 14.996 16.26 14.924 17.172 14.86C18.084 14.78 19.292 14.74 20.796 14.74V14.116C20.796 12.596 19.908 11.836 18.132 11.836C16.58 11.836 15.7 12.452 15.492 13.684H12.708C12.836 12.468 13.34 11.468 14.22 10.684C15.116 9.88401 16.444 9.48401 18.204 9.48401C19.98 9.48401 21.316 9.89201 22.212 10.708C23.124 11.524 23.58 12.668 23.58 14.14V22.228H20.94V20.908C20.044 21.98 18.66 22.516 16.788 22.516Z" fill="var(--text-primary)"/>
      </svg>
      <span class="sidebar-logo__handle"><span class="sidebar-logo__copyright">©</span><span class="sidebar-logo__text">adamdanielbest 2026</span></span>
    </a>
  </div>`;

  if (breakpoint === 'mobile') {
    return `<aside class="sidebar-demo sidebar-demo--mobile" aria-label="Sidebar, mobile">
  <div class="sidebar__inner">${sections}${footer}
  </div>
</aside>`;
  }

  if (breakpoint === 'tablet') {
    return `<aside class="sidebar-demo sidebar-demo--tablet" aria-label="Sidebar, tablet">
  <div class="sidebar__inner">${sections}${footer}
  </div>
</aside>`;
  }

  // desktop
  return `<aside class="sidebar-demo sidebar-demo--desktop" aria-label="Sidebar, desktop">
  <div class="sidebar__inner">${sections}${footer}
  </div>
</aside>`;
}

export const defaultArgs = {
  breakpoint: 'desktop',
  bio: 'Senior Product Designer, London.<br>15 years across luxury heritage (Burberry, Harrods) and high-growth product (giffgaff, Lickd). PoC to launch, DesignOps, measurable impact.',
  timeline: DEFAULT_TIMELINE,
  cvLinkLabel: 'Learn more about my experience',
  buttonLabel: 'View CV',
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
