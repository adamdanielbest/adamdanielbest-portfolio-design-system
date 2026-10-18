import{n as e}from"./rolldown-runtime-DkW27tQK.js";import"./text-link-DbhvFB9v.js";var t,n,r;function i(){return(i=e((()=>{t=({state:e=`default`,label:t=`Link text`}={})=>{let n=(()=>{switch(e){case`hover`:return` text-link--hover`;case`visited`:return` text-link--visited`;case`focus`:return` text-link--focus`;case`focus-hover`:return` text-link--focus-hover`;case`disabled`:return` text-link--disabled`;default:return``}})(),r=e===`disabled`;return`<a
  class="text-link${n}"
  href="${r?void 0:`#`}"
  ${r?`aria-disabled="true" tabindex="-1"`:``}
>${t}</a>`.trim()},n={label:{control:`text`},state:{control:`select`,options:[`default`,`hover`,`visited`,`focus`,`focus-hover`,`disabled`],description:`Simulated interaction state`}},r={label:`Link text`,state:`default`}})))()}var a,o,s,c,l,u,d,f,p;function m(){return(m=e((()=>{i(),a={title:`Components/TextLink`,argTypes:n,args:r},o=e=>t(e),s={args:{state:`default`},render:o},c={args:{state:`hover`},render:o},l={args:{state:`visited`},render:o},u={args:{state:`focus`},render:o},d={args:{state:`focus-hover`},render:o},f={args:{state:`disabled`},render:o},p=[`Default`,`Hover`,`Visited`,`Focus`,`FocusHover`,`Disabled`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'default'
  },
  render
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'hover'
  },
  render
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'visited'
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
    state: 'disabled'
  },
  render
}`,...f.parameters?.docs?.source}}}})))()}m();export{s as Default,f as Disabled,u as Focus,d as FocusHover,c as Hover,l as Visited,p as __namedExportsOrder,a as default};