import '../card-component/card.css';

export function renderCard({ state = 'default' } = {}) {
  const cls = state === 'hover'
    ? 'card-demo card-demo--hover'
    : 'card-demo';
  return `<div class="${cls}" role="img" aria-label="Card ${state} state"></div>`;
}

export const defaultArgs = { state: 'default' };

export const stateArgTypes = {
  state: {
    control: 'select',
    options: ['default', 'hover'],
    description: 'Visual state',
  },
};
