import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t,n,r;function i(){return(i=e((()=>{t=e=>{let{items:t=[],title:n=`Summary`,mode:r=`on-light`}=e;return`
    <div data-theme="${r===`on-dark`?`dark`:`light`}" style="background-color: var(--background-page); padding: var(--spacing-lg);">
      <div class="case-study-summary">
        <div class="case-study-summary__header">
          <div class="case-study-summary__icon" aria-hidden="true">
            <svg focusable="false">
              <use href="#icon-summarise-lg"/>
            </svg>
          </div>
          <span class="case-study-summary__title">${n}</span>
        </div>
        <ul class="case-study-summary__list" role="list">
          ${t.map(e=>`
    <li class="case-study-summary__list-item">
      <div class="case-study-summary__list-icon" aria-hidden="true">
        <svg focusable="false">
          <use href="#icon-success"/>
        </svg>
      </div>
      <span class="case-study-summary__description">${e}</span>
    </li>
  `).join(``)}
        </ul>
      </div>
    </div>
  `},n={mode:{control:`select`,options:[`on-light`,`on-dark`],description:`Token mode — on-light uses cobalt/900 background, on-dark uses neutral/50`},title:{control:`text`},items:{control:`object`}},r={mode:`on-light`,title:`Summary`,items:[`6% conversion against a 4.5% target`,`95 NPS at launch, 9.7/10 DXS, 91.7% CSAT`,`0.2% churn after 6 months live`]}})))()}var a,o,s,c,l;function u(){return(u=e((()=>{i(),a={title:`Components/CaseStudySummary`,argTypes:n,args:r},o=e=>t(e),s={args:{mode:`on-light`},render:o},c={args:{mode:`on-dark`},render:o},l=[`OnLight`,`OnDark`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'on-light'
  },
  render
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'on-dark'
  },
  render
}`,...c.parameters?.docs?.source}}}})))()}u();export{c as OnDark,s as OnLight,l as __namedExportsOrder,a as default};