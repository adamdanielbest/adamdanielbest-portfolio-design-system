import '../card-item-component/card-item.css';

export function renderCardItem({ state = 'default' } = {}) {
  const rootCls = state === 'hover' || state === 'focus-hover'
    ? 'card-grid-demo card-grid-demo--hover'
    : 'card-grid-demo';

  const copyCls = state === 'hover' || state === 'focus-hover'
    ? 'card-grid-demo__copy card-grid-demo__copy--hover'
    : 'card-grid-demo__copy';

  const focusAttr = state === 'focus' || state === 'focus-hover'
    ? ' data-state="focus"'
    : '';

  return `<article class="${rootCls}" aria-label="Card item ${state} state"${focusAttr}>
  <div class="card-grid-demo__media" aria-hidden="true"></div>
  <div class="${copyCls}">
    <div class="card-grid-demo__top">
      <h2 class="card-grid-demo__title">Project title</h2>
      <p class="card-grid-demo__outcome">Brief outcome or project description</p>
    </div>
    <div class="card-grid-demo__bottom">
      <span class="card-grid-demo__role">Product Designer · Company · Year</span>
    </div>
  </div>
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
