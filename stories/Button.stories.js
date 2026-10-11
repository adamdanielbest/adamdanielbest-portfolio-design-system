import '../button-component/button.css';

// Inject the SVG sprite so icon <use> references resolve
fetch('/src/icons/sprite.svg')
  .then(r => r.text())
  .then(svg => {
    if (document.getElementById('sb-icon-sprite')) return;
    const div = document.createElement('div');
    div.id = 'sb-icon-sprite';
    div.style.display = 'none';
    div.setAttribute('aria-hidden', 'true');
    div.innerHTML = svg;
    document.body.insertBefore(div, document.body.firstChild);
  })
  .catch(() => {}); // sprite missing in some envs — icons degrade gracefully

export default {
  title: 'Components/Button',
  parameters: {
    docs: {
      description: {
        component: 'Primary for the main action per view. Secondary for alternative actions. Ghost for tertiary/low-emphasis actions. Destructive requires a confirmation step.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'focus', 'focus-hover', 'pressed', 'disabled'],
      description: 'Simulated interaction state',
    },
    showIcon: {
      control: 'boolean',
      description: 'Adds a trailing icon + divider (btn--icon variant)',
    },
  },
  args: {
    label: 'Button',
    type: 'primary',
    size: 'medium',
    state: 'default',
    showIcon: false,
  },
};

const render = ({ label, type, size, state, showIcon }) => {
  const disabled = state === 'disabled';
  const wrapperClass = !disabled && state !== 'default' ? `demo-${state}` : '';

  const inner = showIcon
    ? `<span class="btn__label">${label}</span><span class="btn__divider" aria-hidden="true"></span><span class="btn__icon-container"><svg class="btn__icon" aria-hidden="true" focusable="false"><use href="#icon-download"/></svg></span>`
    : label;

  const btn = `<button type="button" class="btn btn--${type} btn--${size}${showIcon ? ' btn--icon' : ''}"${disabled ? ' disabled' : ''}>${inner}</button>`;
  return wrapperClass ? `<div class="${wrapperClass}">${btn}</div>` : btn;
};

export const Primary = { args: { type: 'primary' }, render };
export const Secondary = { args: { type: 'secondary' }, render };
export const Ghost = { args: { type: 'ghost' }, render };
export const Destructive = { args: { label: 'Delete', type: 'destructive' }, render };
export const Small = { args: { size: 'small' }, render };
export const Large = { args: { size: 'large' }, render };
export const Focus = { args: { state: 'focus' }, render };
export const FocusHover = { name: 'Focus + Hover', args: { state: 'focus-hover' }, render };
export const Disabled = { args: { state: 'disabled' }, render };

export const WithIcon = {
  name: 'With Icon',
  args: { showIcon: true },
  render,
};

export const AllTypes = {
  name: 'All Types',
  parameters: { controls: { disable: true } },
  render: () => `
    <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
      <button type="button" class="btn btn--primary btn--medium">Primary</button>
      <button type="button" class="btn btn--secondary btn--medium">Secondary</button>
      <button type="button" class="btn btn--ghost btn--medium">Ghost</button>
      <button type="button" class="btn btn--destructive btn--medium">Destructive</button>
    </div>
  `,
};
