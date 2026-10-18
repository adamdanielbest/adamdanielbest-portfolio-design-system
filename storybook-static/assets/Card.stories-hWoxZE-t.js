import{n as e}from"./rolldown-runtime-DkW27tQK.js";function t({state:e=`default`}={}){return`<div class="${e===`hover`?`card-demo card-demo--hover`:`card-demo`}" role="img" aria-label="Card ${e} state"></div>`}var n,r;function i(){return(i=e((()=>{n={state:`default`},r={state:{control:`select`,options:[`default`,`hover`],description:`Visual state`}}})))()}var a,o,s,c,l;function u(){return(u=e((()=>{i(),a={title:`Components/Card`,argTypes:r,args:n},o=e=>t(e),s={render:o},c={args:{state:`hover`},render:o},l=[`Default`,`Hover`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'hover'
  },
  render
}`,...c.parameters?.docs?.source}}}})))()}u();export{s as Default,c as Hover,l as __namedExportsOrder,a as default};