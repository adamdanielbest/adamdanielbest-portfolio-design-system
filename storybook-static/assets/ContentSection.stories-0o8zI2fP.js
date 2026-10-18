import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{i as t,n}from"./media-block.shared-0HtHfKpu.js";import"./content-section-C824I60w.js";function r({heading:e=`Section Heading`,body:n=`Body copy for this section. Describes context, approach, outcomes, or any narrative content for the case study.`,showMedia:r=!1,ratio:i=`16:9`,caption:a=`Caption text`,showCaption:o=!1}={}){return`<section class="content-section">
  <h2 class="content-section__heading">${e}</h2>
  <p class="content-section__body">${n}</p>${r?`\n  ${t({ratio:i,showCaption:o,caption:a})}`:``}
</section>`}var i,a;function o(){return(o=e((()=>{n(),i={heading:`Section Heading`,body:`Body copy for this section. Describes context, approach, outcomes, or any narrative content for the case study.`,showMedia:!1,ratio:`16:9`,showCaption:!1,caption:`Caption text`},a={heading:{control:`text`,description:`Section heading`},body:{control:`text`,description:`Body copy`},showMedia:{control:`boolean`,description:`Show media block below copy`},ratio:{control:`select`,options:[`16:9`,`4:3`],description:`Media aspect ratio`,if:{arg:`showMedia`,truthy:!0}},showCaption:{control:`boolean`,description:`Show caption below media`,if:{arg:`showMedia`,truthy:!0}},caption:{control:`text`,description:`Caption text`,if:{arg:`showCaption`,truthy:!0}}}})))()}var s,c,l,u,d,f;function p(){return(p=e((()=>{o(),s={title:`Components/ContentSection`,argTypes:a,args:i},c=e=>r(e),l={render:c},u={args:{showMedia:!0},render:c},d={args:{showMedia:!0,showCaption:!0},render:c},f=[`Default`,`WithMedia`,`WithCaption`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    showMedia: true
  },
  render
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    showMedia: true,
    showCaption: true
  },
  render
}`,...d.parameters?.docs?.source}}}})))()}p();export{l as Default,d as WithCaption,u as WithMedia,f as __namedExportsOrder,s as default};