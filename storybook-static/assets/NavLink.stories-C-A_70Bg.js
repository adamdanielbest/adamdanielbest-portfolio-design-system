import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./sprite-DrJHSH6n.js";import"./text-link-DbhvFB9v.js";import"./nav-link-CrFopdLz.js";var n,r,i;function a(){return(a=e((()=>{t(),n=({state:e=`default`,label:t=`Link text`,iconLeft:n=!1,iconRight:r=!1}={})=>{let i={hover:`nav-link--hover`,focus:`nav-link--focus`,"focus-hover":`nav-link--focus-hover`};return`<a class="nav-link${i[e]?` ${i[e]}`:``}" href="#">
  ${n?`<svg class="nav-link__icon" aria-hidden="true" focusable="false"><use href="#icon-chevron-backward"/></svg>
  `:``}<span class="nav-link__label">${t}</span>${r?`
  <svg class="nav-link__icon" aria-hidden="true" focusable="false"><use href="#icon-chevron-forward"/></svg>`:``}
</a>`.trim()},r={label:{control:`text`},state:{control:`select`,options:[`default`,`hover`,`focus`,`focus-hover`],description:`Simulated interaction state`},iconLeft:{control:`boolean`,description:`Show left chevron icon`},iconRight:{control:`boolean`,description:`Show right chevron icon`}},i={label:`Link text`,state:`default`,iconLeft:!1,iconRight:!1}})))()}var o,s,c,l,u,d,f,p,m,h,g,_,v;function y(){return(y=e((()=>{a(),o={title:`Components/NavLink`,argTypes:r,args:i},s=e=>n(e),c={args:{state:`default`},render:s},l={args:{state:`hover`},render:s},u={args:{state:`focus`},render:s},d={args:{state:`focus-hover`},render:s},f={args:{state:`default`,iconLeft:!0},render:s},p={args:{state:`default`,iconRight:!0},render:s},m={args:{state:`default`,iconLeft:!0,iconRight:!0},render:s},h={args:{state:`hover`,iconLeft:!0,iconRight:!0},render:s},g={args:{state:`focus`,iconLeft:!0,iconRight:!0},render:s},_={args:{state:`focus-hover`,iconLeft:!0,iconRight:!0},render:s},v=[`Default`,`Hover`,`Focus`,`FocusHover`,`IconLeft`,`IconRight`,`BothIcons`,`HoverIcons`,`FocusIcons`,`FocusHoverIcons`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
    state: 'default',
    iconLeft: true
  },
  render
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'default',
    iconRight: true
  },
  render
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'default',
    iconLeft: true,
    iconRight: true
  },
  render
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'hover',
    iconLeft: true,
    iconRight: true
  },
  render
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'focus',
    iconLeft: true,
    iconRight: true
  },
  render
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'focus-hover',
    iconLeft: true,
    iconRight: true
  },
  render
}`,..._.parameters?.docs?.source}}}})))()}y();export{m as BothIcons,c as Default,u as Focus,d as FocusHover,_ as FocusHoverIcons,g as FocusIcons,l as Hover,h as HoverIcons,f as IconLeft,p as IconRight,v as __namedExportsOrder,o as default};