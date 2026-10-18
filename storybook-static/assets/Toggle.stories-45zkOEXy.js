import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./sprite-DrJHSH6n.js";var n,r,i;function a(){return(a=e((()=>{t(),n=({selected:e=`a`,state:t=`default`,density:n=`desktop`,labelA:r=`Option A`,labelB:i=`Option B`})=>`
<div class="toggle${n===`mobile`?` toggle--density-mobile`:``}${t===`focus`||t===`focus-hover`?` toggle--focus`:``}" role="group" aria-label="Toggle">
  <button class="toggle__option${e===`a`?` toggle__option--selected`:``}${(t===`hover`||t===`focus-hover`)&&e===`a`||t===`option-hover`?` toggle__option--hover`:``}${t===`focus`||t===`focus-hover`||t===`option-focus`&&e===`a`?` toggle__option--focus`:``}${t===`pressed`&&e===`a`?` toggle__option--pressed`:``}" type="button" aria-pressed="${e===`a`}" tabindex="0">${r}</button>
  <button class="toggle__option${e===`b`?` toggle__option--selected`:``}${(t===`hover`||t===`focus-hover`)&&e===`b`?` toggle__option--hover`:``}${t===`option-focus`&&e===`b`?` toggle__option--focus`:``}${t===`pressed`&&e===`b`?` toggle__option--pressed`:``}" type="button" aria-pressed="${e===`b`}" tabindex="-1">${i}</button>
</div>`.trim(),r={selected:{control:`select`,options:[`a`,`b`],description:`Active option`},density:{control:`select`,options:[`desktop`,`mobile`]},labelA:{control:`text`},labelB:{control:`text`},state:{control:`select`,options:[`default`,`hover`,`focus`,`focus-hover`,`pressed`,`option-hover`,`option-focus`],description:`Simulated interaction state`}},i={selected:`a`,state:`default`,density:`desktop`,labelA:`Option A`,labelB:`Option B`}})))()}var o,s,c,l,u,d,f,p,m,h,g,_;function v(){return(v=e((()=>{a(),o={title:`Components/Toggle`,argTypes:r,args:i},s=e=>n(e),c={args:{state:`default`},render:s},l={args:{state:`hover`},render:s},u={args:{state:`focus`},render:s},d={args:{state:`focus-hover`},render:s},f={args:{state:`pressed`},render:s},p={args:{state:`option-hover`},render:s},m={args:{state:`option-focus`},render:s},h={args:{state:`default`,selected:`b`},render:s},g={args:{state:`default`,density:`mobile`},render:s},_=[`Default`,`Hover`,`Focus`,`FocusHover`,`Pressed`,`OptionHover`,`OptionFocus`,`SelectedB`,`Mobile`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'default'
  },
  render
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'hover'
  },
  render
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'focus'
  },
  render
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'focus-hover'
  },
  render
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'pressed'
  },
  render
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'option-hover'
  },
  render
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'option-focus'
  },
  render
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'default',
    selected: 'b'
  },
  render
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'default',
    density: 'mobile'
  },
  render
}`,...g.parameters?.docs?.source}}}})))()}v();export{c as Default,u as Focus,d as FocusHover,l as Hover,g as Mobile,m as OptionFocus,p as OptionHover,f as Pressed,h as SelectedB,_ as __namedExportsOrder,o as default};