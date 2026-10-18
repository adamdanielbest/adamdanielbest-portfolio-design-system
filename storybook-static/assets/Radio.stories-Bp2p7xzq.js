import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./sprite-DyCcgjkB.js";var n,r,i,a;function o(){return(o=e((()=>{t(),n={unchecked:``,"unchecked-hover":`radio--hover`,"unchecked-focus":`radio--focus`,"unchecked-focus-hover":`radio--focus-hover`,"unchecked-pressed":`radio--unchecked-pressed`,checked:`radio--checked`,"checked-hover":`radio--checked-hover`,"checked-focus":`radio--checked-focus`,"checked-focus-hover":`radio--checked-focus-hover`,"checked-pressed":`radio--checked-pressed`,error:`radio--error`},r=({state:e=`unchecked`,label:t=`Label`})=>{let r=e.startsWith(`checked`),i=e===`error`;return`<label class="${[`radio`,n[e]??``].filter(Boolean).join(` `)}">
  <input
    type="radio"
    style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;"
    ${r?`checked`:``}
    ${i?`aria-invalid="true"`:``}
  />
  <span class="radio__icon-wrap" aria-hidden="true">
    <svg class="radio__icon" focusable="false">
      <use href="#${r?`icon-radio-button-checked-sm`:`icon-radio-button-unchecked-sm`}"/>
    </svg>
  </span>
  <span class="radio__label">${t}</span>
</label>`},i={label:{control:`text`},state:{control:`select`,options:[`unchecked`,`unchecked-hover`,`unchecked-focus`,`unchecked-focus-hover`,`unchecked-pressed`,`checked`,`checked-hover`,`checked-focus`,`checked-focus-hover`,`checked-pressed`,`error`],description:`Simulated interaction state`}},a={label:`Label`,state:`unchecked`}})))()}var s,c,l,u,d,f,p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{o(),s={title:`Components/Radio`,argTypes:i,args:a},c=e=>r(e),l={args:{state:`unchecked`},render:c},u={args:{state:`unchecked-hover`},render:c},d={args:{state:`unchecked-focus`},render:c},f={args:{state:`unchecked-focus-hover`},render:c},p={args:{state:`unchecked-pressed`},render:c},m={args:{state:`checked`},render:c},h={args:{state:`checked-hover`},render:c},g={args:{state:`checked-focus`},render:c},_={args:{state:`checked-focus-hover`},render:c},v={args:{state:`checked-pressed`},render:c},y={args:{state:`error`},render:c},b=[`Unchecked`,`UncheckedHover`,`UncheckedFocus`,`UncheckedFocusHover`,`UncheckedPressed`,`Checked`,`CheckedHover`,`CheckedFocus`,`CheckedFocusHover`,`CheckedPressed`,`Error`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'unchecked'
  },
  render
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'unchecked-hover'
  },
  render
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'unchecked-focus'
  },
  render
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'unchecked-focus-hover'
  },
  render
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'unchecked-pressed'
  },
  render
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'checked'
  },
  render
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'checked-hover'
  },
  render
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'checked-focus'
  },
  render
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'checked-focus-hover'
  },
  render
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'checked-pressed'
  },
  render
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'error'
  },
  render
}`,...y.parameters?.docs?.source}}}})))()}x();export{m as Checked,g as CheckedFocus,_ as CheckedFocusHover,h as CheckedHover,v as CheckedPressed,y as Error,l as Unchecked,d as UncheckedFocus,f as UncheckedFocusHover,u as UncheckedHover,p as UncheckedPressed,b as __namedExportsOrder,s as default};