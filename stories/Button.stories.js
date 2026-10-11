import '../button-component/button.css';

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
      description: 'Simulated interaction state (mirrors demo-* classes from the reference sheet)',
    },
  },
  args: {
    label: 'Button',
    type: 'primary',
    size: 'medium',
    state: 'default',
  },
};

const render = ({ label, type, size, state }) => {
  const disabled = state === 'disabled';
  const wrapperClass = !disabled && state !== 'default' ? `demo-${state}` : '';
  const btn = `<button type="button" class="btn btn--${type} btn--${size}"${disabled ? ' disabled' : ''}>${label}</button>`;
  return wrapperClass ? `<div class="${wrapperClass}">${btn}</div>` : btn;
};

export const Primary = {
  args: { type: 'primary' },
  render,
};

export const Secondary = {
  args: { type: 'secondary' },
  render,
};

export const Ghost = {
  args: { type: 'ghost' },
  render,
};

export const Destructive = {
  args: { label: 'Delete', type: 'destructive' },
  render,
};

export const Small = {
  args: { size: 'small' },
  render,
};

export const Large = {
  args: { size: 'large' },
  render,
};

export const Focus = {
  args: { state: 'focus' },
  render,
};

export const FocusHover = {
  name: 'Focus + Hover',
  args: { state: 'focus-hover' },
  render,
};

export const Disabled = {
  args: { state: 'disabled' },
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
