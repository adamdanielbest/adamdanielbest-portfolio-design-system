import '../input-component/input.css';

const ICON_EYE_SLASH = `<svg viewBox="0 0 16 13.825" fill="currentColor" aria-hidden="true" focusable="false"><path d="M 8.004 2.91 C 10.012 2.91 11.642 4.54 11.642 6.548 C 11.642 7.021 11.547 7.465 11.38 7.88 L 13.504 10.005 C 14.603 9.088 15.469 7.902 16 6.548 C 14.741 3.354 11.634 1.091 7.996 1.091 C 6.978 1.091 6.003 1.273 5.101 1.601 L 6.672 3.172 C 7.087 3.005 7.531 2.91 8.004 2.91 Z M 0.728 0.924 L 2.387 2.583 L 2.721 2.918 C 1.513 3.856 0.568 5.108 0 6.548 C 1.259 9.743 4.366 12.005 8.004 12.005 C 9.131 12.005 10.208 11.787 11.191 11.394 L 11.496 11.7 L 13.628 13.824 L 14.552 12.9 L 1.652 0 L 0.728 0.924 Z M 4.751 4.948 L 5.879 6.075 C 5.843 6.228 5.821 6.388 5.821 6.548 C 5.821 7.756 6.796 8.731 8.004 8.731 C 8.164 8.731 8.324 8.709 8.477 8.673 L 9.604 9.801 C 9.117 10.041 8.578 10.186 8.004 10.186 C 5.995 10.186 4.366 8.557 4.366 6.548 C 4.366 5.974 4.511 5.435 4.751 4.948 Z M 7.887 4.38 L 10.179 6.672 L 10.194 6.556 C 10.194 5.348 9.219 4.373 8.011 4.373 L 7.887 4.38 Z"/></svg>`;

const ICON_MAGNIFIER = `<svg viewBox="0 0 15.836 15.836" fill="currentColor" aria-hidden="true" focusable="false"><path d="M 14.603 15.835 L 9.061 10.293 C 8.621 10.645 8.115 10.923 7.544 11.129 C 6.972 11.334 6.363 11.436 5.718 11.436 C 4.12 11.436 2.767 10.883 1.66 9.776 C 0.553 8.669 0 7.316 0 5.718 C 0 4.12 0.553 2.767 1.66 1.66 C 2.767 0.553 4.12 0 5.718 0 C 7.316 0 8.669 0.553 9.776 1.66 C 10.883 2.767 11.436 4.12 11.436 5.718 C 11.436 6.363 11.334 6.972 11.129 7.544 C 10.923 8.115 10.645 8.621 10.293 9.061 L 15.835 14.603 L 14.603 15.835 Z M 5.718 9.677 C 6.818 9.677 7.753 9.292 8.522 8.522 C 9.292 7.753 9.677 6.818 9.677 5.718 C 9.677 4.619 9.292 3.684 8.522 2.914 C 7.753 2.144 6.818 1.759 5.718 1.759 C 4.619 1.759 3.684 2.144 2.914 2.914 C 2.144 3.684 1.759 4.619 1.759 5.718 C 1.759 6.818 2.144 7.753 2.914 8.522 C 3.684 9.292 4.619 9.677 5.718 9.677 Z"/></svg>`;

export const renderInput = ({ type = 'text', state = 'default', label = 'Label', placeholder, value }) => {
  const disabled  = state === 'disabled';
  const filled    = state === 'filled';
  const stateClass = state !== 'default' ? ` input--${state}` : '';
  const inputValue = filled ? (value || (type === 'password' ? 'password' : 'User input')) : '';
  const inputPlaceholder = placeholder || (type === 'search' ? 'Search...' : type === 'password' ? '••••••' : 'Placeholder text');
  const inputType = type === 'search' ? 'search' : type === 'password' ? 'password' : 'text';
  const ariaInvalid = state === 'error' ? ' aria-invalid="true"' : '';
  const disabledAttr = disabled ? ' disabled' : '';

  const fieldInner = type === 'search'
    ? `<span class="input__leading-icon" aria-hidden="true">${ICON_MAGNIFIER}</span>
       <input class="input__value" type="search" placeholder="${inputPlaceholder}" value="${inputValue}"${ariaInvalid}${disabledAttr}>`
    : type === 'password'
    ? `<input class="input__value" type="password" placeholder="${inputPlaceholder}" value="${inputValue}" autocomplete="current-password"${ariaInvalid}${disabledAttr}>
       <span class="input__trailing-icon" aria-hidden="true">${ICON_EYE_SLASH}</span>`
    : `<input class="input__value" type="text" placeholder="${inputPlaceholder}" value="${inputValue}"${ariaInvalid}${disabledAttr}>`;

  const helperText = type !== 'search'
    ? `<p class="input__helper">Helper text</p>`
    : '';

  return `
    <div class="input input--${type}${stateClass}" style="max-width:320px">
      <div class="input__label-row">
        <span class="input__label">${label}</span>
      </div>
      <div class="input__field">${fieldInner}</div>
      ${helperText}
    </div>
  `;
};

export const stateArgTypes = {
  label: { control: 'text' },
  state: {
    control: 'select',
    options: ['default', 'hover', 'focus', 'filled', 'disabled', 'error', 'focus-hover'],
    description: 'Simulated interaction state',
  },
};

export const defaultArgs = { label: 'Label', state: 'default' };
