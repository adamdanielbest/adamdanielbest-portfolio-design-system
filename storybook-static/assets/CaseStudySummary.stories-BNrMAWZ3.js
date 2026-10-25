import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./sprite-brgQYlfm.js";var n,r,i;function a(){return(a=e((()=>{t(),n=e=>{let{items:t=[],title:n=`Summary`,mode:r=`on-light`}=e;return`
    <div data-theme="${r===`on-dark`?`dark`:`light`}" style="background-color: var(--background-page); padding: var(--spacing-lg); min-height: 100vh; box-sizing: border-box;">
      <div class="case-study-summary">
        <div class="case-study-summary__header">
          <div class="case-study-summary__icon" aria-hidden="true">
            <svg focusable="false">
              <use href="#icon-summarise-md"/>
            </svg>
          </div>
          <span class="case-study-summary__title">${n}</span>
        </div>
        <ul class="case-study-summary__list" role="list">
          ${t.map(e=>`
    <li class="case-study-summary__list-item">
      <div class="case-study-summary__list-icon" aria-hidden="true">
        <svg width="16" height="16" focusable="false">
          <use href="#icon-success"/>
        </svg>
      </div>
      <span class="case-study-summary__description">${e}</span>
    </li>
  `).join(``)}
        </ul>
      </div>
    </div>
  `},r={mode:{control:`select`,options:[`on-light`,`on-dark`],description:`Token mode — on-light uses cobalt/900 background, on-dark uses neutral/50`},title:{control:`text`},items:{control:`object`}},i={mode:`on-light`,title:`Summary`,items:[`6% conversion against a 4.5% target`,`95 NPS at launch, 9.7/10 DXS, 91.7% CSAT`,`0.2% churn after 6 months live`]}})))()}var o,s,c,l,u;function d(){return(d=e((()=>{a(),o={title:`Components/CaseStudySummary`,argTypes:r,args:i},s=e=>n(e),c={args:{mode:`on-light`},render:s},l={args:{mode:`on-dark`},render:s},u=[`OnLight`,`OnDark`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'on-light'
  },
  render
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'on-dark'
  },
  render
}`,...l.parameters?.docs?.source}}}})))()}d();export{l as OnDark,c as OnLight,u as __namedExportsOrder,o as default};