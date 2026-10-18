export const ICON_MAP = {
  'mobile':         { id: 'icon-top-panel-open-sm',   label: 'Open menu'     },
  'tablet':         { id: 'icon-top-panel-open-sm',   label: 'Open menu'     },
  'desktop-open':   { id: 'icon-left-panel-close-sm', label: 'Close sidebar' },
  'desktop-closed': { id: 'icon-left-panel-open-sm',  label: 'Open sidebar'  },
};

const INTERACTIVE_ATTRS = {
  'mobile':         { jsClass: 'js-drawer-toggle',  extra: 'aria-expanded="false" aria-controls="site-drawer"' },
  'tablet':         { jsClass: 'js-drawer-toggle',  extra: 'aria-expanded="false" aria-controls="site-drawer"' },
  'desktop-open':   { jsClass: 'js-sidebar-toggle', extra: 'aria-expanded="true"'  },
  'desktop-closed': { jsClass: 'js-sidebar-toggle', extra: 'aria-expanded="false"' },
};

export function renderHeaderContent({ breakpoint = 'mobile', logoHref = '/' } = {}) {
  const { id, label } = ICON_MAP[breakpoint] ?? ICON_MAP['mobile'];
  const { jsClass, extra } = INTERACTIVE_ATTRS[breakpoint] ?? INTERACTIVE_ATTRS['mobile'];
  const logo = breakpoint === 'desktop-closed' ? '' :
    `<a class="header__logo" href="${logoHref}" aria-label="Adam Daniel Best — home">adamdanielbest</a>\n    `;
  return `${logo}<button class="header__icon-btn ${jsClass}" type="button" aria-label="${label}" ${extra}>
      <svg class="header__icon" aria-hidden="true" focusable="false">
        <use href="#${id}"></use>
      </svg>
    </button>`;
}
