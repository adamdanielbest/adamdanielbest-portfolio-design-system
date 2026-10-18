import{n as e}from"./rolldown-runtime-DkW27tQK.js";import"./timeline-BZ4rga64.js";function t({company:e,role:t,year:n,current:r=!1}){return`
    <li class="${r?`timeline-item timeline-item--current`:`timeline-item`}">
      <span class="timeline-item__icon" aria-hidden="true"></span>
      <div class="timeline-item__body">
        <span class="timeline-item__company">${e}</span>
        <span class="timeline-item__meta">${t} · ${n}</span>
      </div>
    </li>`}function n({items:e=r,current:n=!0}={}){return`
    <ol class="timeline" aria-label="Work history">
      ${e.map((e,t)=>t===0?{...e,current:n}:e).map(t).join(``)}
    </ol>`}var r,i;function a(){return(a=e((()=>{r=[{company:`giffgaff`,role:`Product Designer`,year:`2023–present`,current:!0},{company:`Lickd`,role:`Senior Product Designer`,year:`2020–2023`},{company:`HubbleHQ`,role:`Senior Product Designer`,year:`2019–2020`},{company:`ORDRE`,role:`UI Designer`,year:`2019`},{company:`Harrods`,role:`Lead Digital Designer`,year:`2018–2019`},{company:`Boutique 1`,role:`Digital Designer`,year:`2017–2018`},{company:`Burberry`,role:`Digital Designer`,year:`2009–2016`}],i={items:r,current:!0}})))()}var o,s,c,l;function u(){return(u=e((()=>{a(),o={title:`Components/Timeline`,argTypes:{current:{control:`boolean`,description:`Show current role indicator on first item`},items:{table:{disable:!0}}},args:i},s=e=>n(e),c={render:s},l=[`Default`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render
}`,...c.parameters?.docs?.source}}}})))()}u();export{c as Default,l as __namedExportsOrder,o as default};