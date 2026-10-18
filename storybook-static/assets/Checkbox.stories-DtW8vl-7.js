import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./sprite-DrJHSH6n.js";var n,r,i;function a(){return(a=e((()=>{t(),n=({state:e=`unchecked`,label:t=`Label`})=>{let n=e.startsWith(`checked`);return`
<button class="checkbox${(()=>{switch(e){case`checked`:return` checkbox--checked`;case`checked-hover`:return` checkbox--checked-hover`;case`checked-focus`:return` checkbox--checked-focus`;case`checked-focus-hover`:return` checkbox--checked-focus-hover`;case`checked-pressed`:return` checkbox--checked-pressed`;case`unchecked-hover`:return` checkbox--hover`;case`unchecked-focus`:return` checkbox--focus`;case`unchecked-focus-hover`:return` checkbox--focus-hover`;case`unchecked-pressed`:return` checkbox--unchecked-pressed`;case`error`:return` checkbox--error`;default:return``}})()}" type="button" role="checkbox" aria-checked="${n}" aria-label="${t}">
  <span class="checkbox__icon-wrap">
    <svg class="checkbox__icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <use href="#${n?`icon-checkbox-checked-sm`:`icon-checkbox-sm`}"/>
    </svg>
  </span>
  <span class="checkbox__label">${t}</span>
</button>`.trim()},r={label:{control:`text`},state:{control:`select`,options:[`unchecked`,`unchecked-hover`,`unchecked-focus`,`unchecked-focus-hover`,`unchecked-pressed`,`checked`,`checked-hover`,`checked-focus`,`checked-focus-hover`,`checked-pressed`,`error`],description:`Simulated interaction state`}},i={label:`Label`,state:`unchecked`}})))()}var o,s,c,l,u,d,f,p,m,h,g,_,v,y;function b(){return(b=e((()=>{a(),o={title:`Components/Checkbox`,argTypes:r,args:i},s=e=>n(e),c={args:{state:`unchecked`},render:s},l={args:{state:`unchecked-hover`},render:s},u={args:{state:`unchecked-focus`},render:s},d={args:{state:`unchecked-focus-hover`},render:s},f={args:{state:`unchecked-pressed`},render:s},p={args:{state:`checked`},render:s},m={args:{state:`checked-hover`},render:s},h={args:{state:`checked-focus`},render:s},g={args:{state:`checked-focus-hover`},render:s},_={args:{state:`checked-pressed`},render:s},v={args:{state:`error`},render:s},y=[`Unchecked`,`UncheckedHover`,`UncheckedFocus`,`UncheckedFocusHover`,`UncheckedPressed`,`Checked`,`CheckedHover`,`CheckedFocus`,`CheckedFocusHover`,`CheckedPressed`,`Error`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'unchecked'
  },
  render
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'unchecked-hover'
  },
  render
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'unchecked-focus'
  },
  render
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'unchecked-focus-hover'
  },
  render
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'unchecked-pressed'
  },
  render
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'checked'
  },
  render
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'checked-hover'
  },
  render
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'checked-focus'
  },
  render
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'checked-focus-hover'
  },
  render
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'checked-pressed'
  },
  render
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'error'
  },
  render
}`,...v.parameters?.docs?.source}}}})))()}b();export{p as Checked,h as CheckedFocus,g as CheckedFocusHover,m as CheckedHover,_ as CheckedPressed,v as Error,c as Unchecked,u as UncheckedFocus,d as UncheckedFocusHover,l as UncheckedHover,f as UncheckedPressed,y as __namedExportsOrder,o as default};