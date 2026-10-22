import '../action-chip-component/action-chip.css';

/**
 * Renders an action chip as either an <a> or <button> element.
 *
 * @param {object} args
 * @param {string}  args.label       - Visible label text
 * @param {string}  [args.href]      - If set, renders as <a>; otherwise <button>
 * @param {string}  [args.icon]      - Sprite symbol ID, e.g. 'icon-arrow-outward'
 * @param {string}  [args.state]     - 'default' | 'hover' | 'focus' | 'focus-hover' | 'disabled'
 * @param {string}  [args.target]    - Link target, e.g. '_blank' (only used when href is set)
 */
export const renderActionChip = (args) => {
  const {
    label = 'Action',
    href,
    icon = 'icon-arrow-outward',
    state = 'default',
    target,
  } = args;

  const isDisabled = state === 'disabled';
  const isFocus = state === 'focus' || state === 'focus-hover';

  const iconSvg = `<svg class="action-chip__icon" aria-hidden="true" focusable="false">
        <use href="#${icon}"/>
      </svg>`;

  const inner = `
    <span class="action-chip__body">
      <span class="action-chip__label">${label}</span>
      ${iconSvg}
    </span>`;

  if (href && !isDisabled) {
    const targetAttr = target ? ` target="${target}"` : '';
    const relAttr = target === '_blank' ? ' rel="noopener noreferrer"' : '';
    return `<a class="action-chip" href="${href}"${targetAttr}${relAttr}>${inner}
</a>`;
  }

  const disabledAttr = isDisabled ? ' disabled aria-disabled="true"' : '';
  return `<button class="action-chip" type="button"${disabledAttr}>${inner}
</button>`;
};

export const stateArgTypes = {
  state: {
    control: 'select',
    options: ['default', 'hover', 'focus', 'focus-hover', 'disabled'],
    description: 'Simulated interaction state',
  },
  label: { control: 'text' },
  href: { control: 'text', description: 'If set, renders as <a> rather than <button>' },
  icon: { control: 'text', description: 'Sprite symbol ID' },
  target: { control: 'text', description: 'Link target (e.g. _blank)' },
};

export const defaultArgs = {
  label: 'Action',
  href: undefined,
  icon: 'icon-arrow-outward',
  state: 'default',
  target: undefined,
};
