import '../case-study-summary-component/case-study-summary.css';

export const renderCaseStudySummary = (args) => {
  const { items = [], title = 'Summary', mode = 'on-light' } = args;

  const theme = mode === 'on-dark' ? 'dark' : 'light';

  const listItems = items.map(text => `
    <li class="case-study-summary__list-item">
      <div class="case-study-summary__list-icon" aria-hidden="true">
        <svg width="16" height="16" focusable="false">
          <use href="#icon-success"/>
        </svg>
      </div>
      <span class="case-study-summary__description">${text}</span>
    </li>
  `).join('');

  return `
    <div data-theme="${theme}" style="background-color: var(--background-page); padding: var(--spacing-lg); min-height: 100vh; box-sizing: border-box;">
      <div class="case-study-summary">
        <div class="case-study-summary__header">
          <div class="case-study-summary__icon" aria-hidden="true">
            <svg focusable="false">
              <use href="#icon-summarise-md"/>
            </svg>
          </div>
          <span class="case-study-summary__title">${title}</span>
        </div>
        <ul class="case-study-summary__list" role="list">
          ${listItems}
        </ul>
      </div>
    </div>
  `;
};

export const modeArgTypes = {
  mode: {
    control: 'select',
    options: ['on-light', 'on-dark'],
    description: 'Token mode — on-light uses cobalt/900 background, on-dark uses neutral/50',
  },
  title: { control: 'text' },
  items: { control: 'object' },
};

export const defaultArgs = {
  mode: 'on-light',
  title: 'Summary',
  items: [
    '6% conversion against a 4.5% target',
    '95 NPS at launch, 9.7/10 DXS, 91.7% CSAT',
    '0.2% churn after 6 months live',
  ],
};
