import '../card-item-component/card-item.css';
import { renderMediaBlock } from './media-block.shared.js';
import { renderCardItemCopy } from './card-item.render.js';

export function renderCardItem({ state = 'default' } = {}) {
  const rootCls = state === 'hover' || state === 'focus-hover'
    ? 'card-grid-demo card-grid-demo--hover'
    : 'card-grid-demo';

  const focusAttr = state === 'focus' || state === 'focus-hover'
    ? ' data-state="focus"'
    : '';

  return `<article class="${rootCls}" aria-label="Card item ${state} state"${focusAttr}>
  ${renderMediaBlock({ ratio: '16:9' })}
  ${renderCardItemCopy()}
</article>`;
}

export const defaultArgs = { state: 'default' };

export const stateArgTypes = {
  state: {
    control: 'select',
    options: ['default', 'hover', 'focus', 'focus-hover'],
    description: 'Visual state',
  },
};
