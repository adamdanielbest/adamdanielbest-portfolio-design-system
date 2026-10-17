import '../timeline-component/timeline.css';

export const DEFAULT_ITEMS = [
  { company: 'giffgaff',   role: 'Product Designer',        year: '2023–present', current: true  },
  { company: 'Lickd',      role: 'Senior Product Designer',  year: '2020–2023'                    },
  { company: 'HubbleHQ',   role: 'Senior Product Designer',  year: '2019–2020'                    },
  { company: 'ORDRE',      role: 'UI Designer',              year: '2019'                         },
  { company: 'Harrods',    role: 'Lead Digital Designer',    year: '2018–2019'                    },
  { company: 'Boutique 1', role: 'Digital Designer',         year: '2017–2018'                    },
  { company: 'Burberry',   role: 'Digital Designer',         year: '2009–2016'                    },
];

function itemHTML({ company, role, year, current = false }) {
  const cls = current ? 'timeline-item timeline-item--current' : 'timeline-item';
  return `
    <li class="${cls}">
      <span class="timeline-item__icon" aria-hidden="true"></span>
      <div class="timeline-item__body">
        <span class="timeline-item__company">${company}</span>
        <span class="timeline-item__meta">${role} · ${year}</span>
      </div>
    </li>`;
}

export function renderTimeline({ items = DEFAULT_ITEMS, current = true } = {}) {
  const resolvedItems = items.map((item, i) => i === 0 ? { ...item, current } : item);
  return `
    <ol class="timeline" aria-label="Work history">
      ${resolvedItems.map(itemHTML).join('')}
    </ol>`;
}

export const defaultArgs = { items: DEFAULT_ITEMS, current: true };
