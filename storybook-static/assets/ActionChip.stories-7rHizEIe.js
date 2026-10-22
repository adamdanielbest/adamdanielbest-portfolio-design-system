import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t,n,r;function i(){return(i=e((()=>{t=e=>{let{label:t=`Action`,href:n,icon:r=`icon-arrow-outward`,state:i=`default`,target:a}=e,o=i===`disabled`,s=`
    <span class="action-chip__body">
      <span class="action-chip__label">${t}</span>
      ${`<svg class="action-chip__icon" aria-hidden="true" focusable="false">
        <use href="#${r}"/>
      </svg>`}
    </span>`;return n&&!o?`<a class="action-chip" href="${n}"${a?` target="${a}"`:``}${a===`_blank`?` rel="noopener noreferrer"`:``}>${s}
</a>`:`<button class="action-chip" type="button"${o?` disabled aria-disabled="true"`:``}>${s}
</button>`},n={state:{control:`select`,options:[`default`,`hover`,`focus`,`focus-hover`,`disabled`],description:`Simulated interaction state`},label:{control:`text`},href:{control:`text`,description:`If set, renders as <a> rather than <button>`},icon:{control:`text`,description:`Sprite symbol ID`},target:{control:`text`,description:`Link target (e.g. _blank)`}},r={label:`Action`,href:void 0,icon:`icon-arrow-outward`,state:`default`,target:void 0}})))()}var a,o,s,c,l,u,d,f;function p(){return(p=e((()=>{i(),a={title:`Components/ActionChip`,argTypes:n,args:r},o=e=>t(e),s={args:{label:`Email`,href:`#`,state:`default`},render:o},c={args:{label:`Action`,state:`default`},render:o},l={args:{label:`Action`,state:`hover`},render:o},u={args:{label:`Action`,state:`focus`},render:o},d={args:{label:`Action`,state:`disabled`},render:o},f=[`AsLink`,`AsButton`,`Hover`,`Focus`,`Disabled`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    href: '#',
    state: 'default'
  },
  render
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Action',
    state: 'default'
  },
  render
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Action',
    state: 'hover'
  },
  render
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Action',
    state: 'focus'
  },
  render
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Action',
    state: 'disabled'
  },
  render
}`,...d.parameters?.docs?.source}}}})))()}p();export{c as AsButton,s as AsLink,d as Disabled,u as Focus,l as Hover,f as __namedExportsOrder,a as default};