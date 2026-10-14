import { renderSelect, stateArgTypes, defaultArgs } from './select.shared.js';

export default {
  title: 'Components/Select',
  argTypes: stateArgTypes,
  args: defaultArgs,
};

const render = (args) => renderSelect(args);

export const Default      = { args: { state: 'default'              }, render };
export const Hover        = { args: { state: 'hover'                }, render };
export const Focus        = { args: { state: 'focus'                }, render };
export const FocusHover   = { args: { state: 'focus-hover'          }, render };
export const Filled       = { args: { state: 'filled'               }, render };
export const Disabled     = { args: { state: 'disabled'             }, render };
export const Error        = { args: { state: 'error'                }, render };
export const Required     = { args: { state: 'default', required: true }, render };
export const SingleSelect = {
  args: { state: 'select-single-select' },
  render,
  play: ({ canvasElement }) => {
    const valueEl  = canvasElement.querySelector('.select__value');
    const options  = canvasElement.querySelectorAll('.select__option');
    const dropdown = canvasElement.querySelector('.select__dropdown');

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        options.forEach(o => {
          o.classList.remove('select__option--selected');
          o.setAttribute('aria-selected', 'false');
        });
        opt.classList.add('select__option--selected');
        opt.setAttribute('aria-selected', 'true');
        valueEl.textContent = opt.querySelector('span').textContent;
        dropdown.style.display = 'none';
      });
    });
  },
};
export const Multiselect = {
  args: { state: 'select-multiselect' },
  render,
  play: ({ canvasElement }) => {
    const valueEl  = canvasElement.querySelector('.select__value');
    const options  = canvasElement.querySelectorAll('.select__option');

    function updateFieldValue() {
      const selected = [...options]
        .filter(o => o.classList.contains('select__option--selected'))
        .map(o => o.querySelector('span').textContent);
      valueEl.textContent = selected.length ? selected.join(', ') : 'Select option...';
      valueEl.classList.toggle('select--filled', selected.length > 0);
    }

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        const isNowSelected = !opt.classList.contains('select__option--selected');
        opt.classList.toggle('select__option--selected', isNowSelected);
        opt.setAttribute('aria-selected', String(isNowSelected));
        const useEl = opt.querySelector('use');
        if (useEl) useEl.setAttribute('href', isNowSelected ? '#icon-checkbox-checked' : '#icon-checkbox');
        updateFieldValue();
      });
    });
  },
};
