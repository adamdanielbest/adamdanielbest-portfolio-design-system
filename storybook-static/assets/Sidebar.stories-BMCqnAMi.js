import{n as e}from"./rolldown-runtime-DkW27tQK.js";import"./button-YSpWHDVp.js";import"./content-section-C824I60w.js";import"./text-link-DbhvFB9v.js";import"./timeline-BZ4rga64.js";function t(e){return`<ol class="timeline" aria-label="Career timeline">
          ${e.map(e=>`<li class="timeline-item${e.current?` timeline-item--current`:``}">
              <span class="timeline-item__icon" aria-hidden="true"></span>
              <div class="timeline-item__body">
                <span class="timeline-item__company">${e.company}</span>
                <span class="timeline-item__meta">${e.meta}</span>
              </div>
            </li>`).join(`
          `)}
          </ol>`}function n({bio:e=`Senior Product Designer, London.<br>15 years across luxury heritage (Burberry, Harrods) and high-growth product (giffgaff, Lickd). PoC to launch, DesignOps, measurable impact.`,timeline:n=r,cvLinkLabel:i=`Learn more about my experience`,cvLinkHref:a=`#`,buttonLabel:o=`View CV`,emailLabel:s=`Email`,emailHref:c=`mailto:eyeofsourceproductions@gmail.com`,linkedinLabel:l=`LinkedIn`,linkedinHref:u=`https://www.linkedin.com/in/adamdanielbest`}={}){return`
        <section class="content-section" aria-label="About">
          <h2 class="content-section__heading">About me</h2>
          <p class="content-section__body">${e}</p>
        </section>

        <section class="content-section" aria-label="Career timeline">
          <h2 class="content-section__heading">Career timeline</h2>
          ${t(n)}
          <div class="sidebar__cv">
            <p class="sidebar__cv-label">${i}</p>
            <button class="btn btn--primary btn--large btn--full-width" type="button">${o}</button>
          </div>
        </section>

        <footer class="content-section" aria-label="Contact">
          <h2 class="content-section__heading">Get in touch</h2>
          <div class="sidebar__links">
            <a class="text-link" href="${c}">${s}</a>
            <a class="text-link" href="${u}" target="_blank" rel="noopener">${l}</a>
          </div>
        </footer>`}var r;function i(){return(i=e((()=>{r=[{company:`giffgaff`,meta:`Product Designer · 2023`,current:!0},{company:`Lickd`,meta:`Product Designer · 2020`,current:!1},{company:`HubbleHQ`,meta:`Product Designer · 2019`,current:!1},{company:`ORDRE`,meta:`UI Designer · 2019`,current:!1},{company:`Harrods`,meta:`Lead Digital Designer · 2018`,current:!1},{company:`Boutique 1`,meta:`Digital Designer · 2017`,current:!1},{company:`Burberry`,meta:`Digital Designer · 2009`,current:!1}]})))()}function a({breakpoint:e=`desktop`,bio:t=`Senior Product Designer, London.<br>15 years across luxury heritage (Burberry, Harrods) and high-growth product (giffgaff, Lickd). PoC to launch, DesignOps, measurable impact.`,timeline:i=r,cvLinkLabel:a=`Learn more about my experience`,buttonLabel:o=`View CV`,emailLabel:s=`Email`,linkedinLabel:c=`LinkedIn`}={}){let l=n({bio:t,timeline:i,cvLinkLabel:a,buttonLabel:o,emailLabel:s,emailHref:`#`,linkedinLabel:c,linkedinHref:`#`});return e===`mobile`?`<aside class="sidebar-demo sidebar-demo--mobile" aria-label="Sidebar, mobile">
  <div class="sidebar__inner">${l}
  </div>
</aside>`:e===`tablet`?`<aside class="sidebar-demo sidebar-demo--tablet" aria-label="Sidebar, tablet">
  <div class="sidebar__inner">${l}
  </div>
</aside>`:`<aside class="sidebar-demo sidebar-demo--desktop" aria-label="Sidebar, desktop">
  <div class="sidebar__inner">${l}
  </div>
</aside>`}var o,s;function c(){return(c=e((()=>{i(),o={breakpoint:`desktop`,bio:`Senior Product Designer, London.<br>15 years across luxury heritage (Burberry, Harrods) and high-growth product (giffgaff, Lickd). PoC to launch, DesignOps, measurable impact.`,timeline:r,cvLinkLabel:`Learn more about my experience`,buttonLabel:`View CV`,emailLabel:`Email`,linkedinLabel:`LinkedIn`},s={breakpoint:{control:`select`,options:[`mobile`,`tablet`,`desktop`],description:`Breakpoint variant`},bio:{control:`text`,description:`About me body copy`},timeline:{control:`object`,description:`Career timeline items`},cvLinkLabel:{control:`text`,description:`CV text link label`},buttonLabel:{control:`text`,description:`Primary button label`},emailLabel:{control:`text`,description:`Email link label`},linkedinLabel:{control:`text`,description:`LinkedIn link label`}}})))()}var l,u,d,f,p,m;function h(){return(h=e((()=>{c(),l={title:`Components/Sidebar`,argTypes:s,args:o},u=e=>a(e),d={args:{breakpoint:`desktop`},render:u},f={args:{breakpoint:`tablet`},render:u},p={args:{breakpoint:`mobile`},render:u},m=[`Desktop`,`Tablet`,`Mobile`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    breakpoint: 'desktop'
  },
  render
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    breakpoint: 'tablet'
  },
  render
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    breakpoint: 'mobile'
  },
  render
}`,...p.parameters?.docs?.source}}}})))()}h();export{d as Desktop,p as Mobile,f as Tablet,m as __namedExportsOrder,l as default};