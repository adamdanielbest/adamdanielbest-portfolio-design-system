import{n as e}from"./rolldown-runtime-DkW27tQK.js";import"./button-KmAI3NQ4.js";import"./content-section-C824I60w.js";import"./text-link-DZ6mnAVp.js";import"./timeline-BZ4rga64.js";function t(e){return`<ol class="timeline" aria-label="Career timeline">
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
        </footer>`}var r;function i(){return(i=e((()=>{r=[{company:`giffgaff`,meta:`Product Designer · 2023`,current:!0},{company:`Lickd`,meta:`Product Designer · 2020`,current:!1},{company:`HubbleHQ`,meta:`Product Designer · 2019`,current:!1},{company:`ORDRE`,meta:`UI Designer · 2019`,current:!1},{company:`Harrods`,meta:`Lead Digital Designer · 2018`,current:!1},{company:`Boutique 1`,meta:`Digital Designer · 2017`,current:!1},{company:`Burberry`,meta:`Digital Designer · 2009`,current:!1}]})))()}function a({breakpoint:e=`desktop`,bio:t=`Senior Product Designer, London.<br>15 years across luxury heritage (Burberry, Harrods) and high-growth product (giffgaff, Lickd). PoC to launch, DesignOps, measurable impact.`,timeline:i=r,cvLinkLabel:a=`Learn more about my experience`,buttonLabel:o=`View CV`,emailLabel:s=`Email`,linkedinLabel:c=`LinkedIn`}={}){let l=n({bio:t,timeline:i,cvLinkLabel:a,buttonLabel:o,emailLabel:s,emailHref:`#`,linkedinLabel:c,linkedinHref:`#`}),u=`
  <div class="sidebar-footer">
    <a class="sidebar-logo" href="/" aria-label="Adam Daniel Best — home">
      <svg class="sidebar-logo__icon" width="36" height="32" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <mask id="logo-icon-border-mask-sb" fill="white"><path d="M2 0H34V32H2V0Z"/></mask>
        <path d="M2 0H34V32H2V0Z" fill="var(--background-page)"/>
        <path d="M34 0H32V32H34H36V0H34ZM2 32H4V0H2H0V32H2Z" fill="var(--brand-cobalt)" mask="url(#logo-icon-border-mask-sb)"/>
        <rect y="15" width="2" height="2" fill="var(--brand-cobalt)"/>
        <rect x="34" y="15" width="2" height="2" fill="var(--brand-cobalt)"/>
        <rect x="4" y="30" width="2" height="2" fill="var(--brand-cobalt)"/>
        <rect x="30" width="2" height="2" fill="var(--brand-cobalt)"/>
        <rect x="30" y="30" width="2" height="2" fill="var(--brand-cobalt)"/>
        <rect x="4" width="2" height="2" fill="var(--brand-cobalt)"/>
        <path d="M20.796 16.9C18.012 16.9 16.38 17.028 15.9 17.284C15.404 17.54 15.156 18.004 15.156 18.676C15.156 19.748 15.868 20.284 17.292 20.284C19.628 20.284 20.796 19.372 20.796 17.548V16.9ZM16.788 22.516C15.316 22.516 14.22 22.156 13.5 21.436C12.78 20.716 12.42 19.764 12.42 18.58C12.42 17.06 13.092 15.996 14.436 15.388C14.756 15.244 15.06 15.14 15.348 15.076C15.652 14.996 16.26 14.924 17.172 14.86C18.084 14.78 19.292 14.74 20.796 14.74V14.116C20.796 12.596 19.908 11.836 18.132 11.836C16.58 11.836 15.7 12.452 15.492 13.684H12.708C12.836 12.468 13.34 11.468 14.22 10.684C15.116 9.88401 16.444 9.48401 18.204 9.48401C19.98 9.48401 21.316 9.89201 22.212 10.708C23.124 11.524 23.58 12.668 23.58 14.14V22.228H20.94V20.908C20.044 21.98 18.66 22.516 16.788 22.516Z" fill="var(--text-primary)"/>
      </svg>
      <span class="sidebar-logo__handle"><span class="sidebar-logo__copyright">©</span><span class="sidebar-logo__text">adamdanielbest 2026</span></span>
    </a>
  </div>`;return e===`mobile`?`<aside class="sidebar-demo sidebar-demo--mobile" aria-label="Sidebar, mobile">
  <div class="sidebar__inner">${l}${u}
  </div>
</aside>`:e===`tablet`?`<aside class="sidebar-demo sidebar-demo--tablet" aria-label="Sidebar, tablet">
  <div class="sidebar__inner">${l}${u}
  </div>
</aside>`:`<aside class="sidebar-demo sidebar-demo--desktop" aria-label="Sidebar, desktop">
  <div class="sidebar__inner">${l}${u}
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