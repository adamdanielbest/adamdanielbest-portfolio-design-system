import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{i as t,n}from"./media-block.shared-BlvudTrP.js";function r({title:e=`Project title`,outcome:t=`Brief outcome or project description`,role:n=`Product Designer · Company · Year`}={}){return`<div class="card-item__copy">
    <div class="card-item__top">
      <h2 class="card-item__title">${e}</h2>
      <p class="card-item__outcome">${t}</p>
    </div>
    <div class="card-item__bottom">
      <span class="card-item__role">${n}</span>
    </div>
  </div>`}function i({state:e=`default`}={}){return`<article class="${e===`hover`||e===`focus-hover`?`card-item card-item--hover`:`card-item`}" aria-label="Card item ${e} state"${e===`focus`||e===`focus-hover`?` data-state="focus"`:``}>
  ${t({ratio:`16:9`})}
  ${r()}
</article>`}var a,o;function s(){return(s=e((()=>{n(),a={state:`default`},o={state:{control:`select`,options:[`default`,`hover`,`focus`,`focus-hover`],description:`Visual state`}}})))()}var c,l,u,d,f,p,m;function h(){return(h=e((()=>{s(),c={title:`Components/CardItem`,argTypes:o,args:a},l=e=>i(e),u={render:l},d={args:{state:`hover`},render:l},f={args:{state:`focus`},render:l},p={args:{state:`focus-hover`},render:l},m=[`Default`,`Hover`,`Focus`,`FocusHover`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'hover'
  },
  render
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'focus'
  },
  render
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'focus-hover'
  },
  render
}`,...p.parameters?.docs?.source}}}})))()}h();export{u as Default,f as Focus,p as FocusHover,d as Hover,m as __namedExportsOrder,c as default};