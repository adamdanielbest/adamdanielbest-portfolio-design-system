import{n as e}from"./rolldown-runtime-DkW27tQK.js";import"./media-block-Ds6xoRt9.js";function t({breakpoint:e=`desktop`,title:t=`Project title`,outcome:n=`Outcome or subtitle`,hookHeading:r=`Hook`,hookBody:i=`One strong statement that sets the stakes and makes the reader want to keep going.`,role:a=`Product Designer · Company · Year`}={}){return`<article class="case-study-hero case-study-hero--${e}">
  <div class="case-study-hero__media">
    <figure class="media-block">
      <div class="media-block__image" role="img" aria-label="Media placeholder"></div>
    </figure>
  </div>
  <div class="case-study-hero__copy">
    <div class="case-study-hero__top">
      <div class="case-study-hero__title-group">
        <h1 class="case-study-hero__title">${t}</h1>
        <p class="case-study-hero__outcome">${n}</p>
      </div>
      <div class="case-study-hero__hook">
        <h2 class="case-study-hero__hook-heading">${r}</h2>
        <p class="case-study-hero__hook-body">${i}</p>
      </div>
    </div>
    <div class="case-study-hero__bottom">
      <p class="case-study-hero__role">${a}</p>
    </div>
  </div>
</article>`}var n,r;function i(){return(i=e((()=>{n={breakpoint:`desktop`,title:`Design to code pipeline`,outcome:`Figma variables to production CSS, with a full component library built and documented using Claude.`,hookHeading:`Hook`,hookBody:`One strong statement that sets the stakes and makes the reader want to keep going.`,role:`Product Designer · adamdanielbest · 2026`},r={breakpoint:{control:`select`,options:[`desktop`,`tablet`,`mobile`],description:`Breakpoint variant`},title:{control:`text`,description:`Case study title`},outcome:{control:`text`,description:`Outcome / subtitle`},hookHeading:{control:`text`,description:`Hook section heading`},hookBody:{control:`text`,description:`Hook body copy`},role:{control:`text`,description:`Role · company · year meta`}}})))()}var a,o,s,c,l,u;function d(){return(d=e((()=>{i(),a={title:`Components/CaseStudyHero`,argTypes:r,args:n},o=e=>t(e),s={args:{breakpoint:`desktop`},render:o},c={args:{breakpoint:`tablet`},render:o},l={args:{breakpoint:`mobile`},render:o},u=[`Desktop`,`Tablet`,`Mobile`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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