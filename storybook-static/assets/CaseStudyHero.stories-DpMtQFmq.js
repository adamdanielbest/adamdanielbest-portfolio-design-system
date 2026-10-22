import{n as e}from"./rolldown-runtime-DkW27tQK.js";import"./media-block-B0miDWPV.js";function t({breakpoint:e=`desktop`,title:t=`Case study hook`,outcome:n=`Figma variables to production CSS, with a full component library built and documented.`,role:r=`Product Designer · Company · Year`}={}){return`<article class="case-study-hero case-study-hero--${e}">
  <div class="case-study-hero__media">
    <figure class="media-block">
      <div class="media-block__image" role="img" aria-label="Media placeholder"></div>
    </figure>
  </div>
  <div class="case-study-hero__copy">
    <div class="case-study-hero__top">
      <h1 class="case-study-hero__title">${t}</h1>
      <p class="case-study-hero__outcome">${n}</p>
    </div>
    <div class="case-study-hero__bottom">
      <p class="case-study-hero__role">${r}</p>
    </div>
  </div>
</article>`}var n,r;function i(){return(i=e((()=>{n={breakpoint:`desktop`,title:`Case study hook`,outcome:`Figma variables to production CSS, with a full component library built and documented using Claude.`,role:`Product Designer · adamdanielbest · 2026`},r={breakpoint:{control:`select`,options:[`desktop`,`tablet`,`mobile`],description:`Breakpoint variant`},title:{control:`text`,description:`Hook — the one-line case study statement`},outcome:{control:`text`,description:`Outcome / subtitle`},role:{control:`text`,description:`Role · company · year meta`}}})))()}var a,o,s,c,l,u;function d(){return(d=e((()=>{i(),a={title:`Components/CaseStudyHero`,argTypes:r,args:n},o=e=>t(e),s={args:{breakpoint:`desktop`},render:o},c={args:{breakpoint:`tablet`},render:o},l={args:{breakpoint:`mobile`},render:o},u=[`Desktop`,`Tablet`,`Mobile`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    breakpoint: 'desktop'
  },
  render
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    breakpoint: 'tablet'
  },
  render
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    breakpoint: 'mobile'
  },
  render
}`,...l.parameters?.docs?.source}}}})))()}d();export{s as Desktop,l as Mobile,c as Tablet,u as __namedExportsOrder,a as default};