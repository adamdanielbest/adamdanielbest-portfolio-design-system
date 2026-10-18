import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./sprite-DrJHSH6n.js";import"./nav-link-CrFopdLz.js";function n({labels:e=!0,backLabel:t=`Back`,title:n=`Title`,prevLabel:r=`Previous`,nextLabel:i=`Next`}={}){return e?`<nav class="page-nav" aria-label="Page navigation">
  <div class="page-nav__back">
    <a class="nav-link page-nav__link" href="#">
      <span class="nav-link__icon" aria-hidden="true">
        <svg focusable="false"><use href="#icon-arrow-backwards"/></svg>
      </span>
      <span class="nav-link__label">${t}</span>
    </a>
  </div>
  <p class="page-nav__title">${n}</p>
  <div class="page-nav__prev-next">
    <a class="nav-link page-nav__link" href="#" aria-label="${r}">
      <span class="nav-link__icon" aria-hidden="true">
        <svg focusable="false"><use href="#icon-chevron-backward"/></svg>
      </span>
      <span class="nav-link__label">${r}</span>
    </a>
    <a class="nav-link page-nav__link" href="#" aria-label="${i}">
      <span class="nav-link__label">${i}</span>
      <span class="nav-link__icon" aria-hidden="true">
        <svg focusable="false"><use href="#icon-chevron-forward"/></svg>
      </span>
    </a>
  </div>
</nav>`.trim():`<nav class="page-nav page-nav--icons-only" aria-label="Page navigation">
  <div class="page-nav__back">
    <a class="nav-link page-nav__link page-nav__link--icon-only" href="#" aria-label="${t}">
      <span class="nav-link__icon" aria-hidden="true">
        <svg focusable="false"><use href="#icon-arrow-backwards"/></svg>
      </span>
    </a>
  </div>
  <p class="page-nav__title">${n}</p>
  <div class="page-nav__prev-next">
    <a class="nav-link page-nav__link page-nav__link--icon-only" href="#" aria-label="${r}">
      <span class="nav-link__icon" aria-hidden="true">
        <svg focusable="false"><use href="#icon-chevron-backward"/></svg>
      </span>
    </a>
    <a class="nav-link page-nav__link page-nav__link--icon-only" href="#" aria-label="${i}">
      <span class="nav-link__icon" aria-hidden="true">
        <svg focusable="false"><use href="#icon-chevron-forward"/></svg>
      </span>
    </a>
  </div>
</nav>`.trim()}var r,i;function a(){return(a=e((()=>{r={labels:{control:`boolean`,description:`Show text labels (false = icons only, mobile)`},backLabel:{control:`text`},title:{control:`text`},prevLabel:{control:`text`},nextLabel:{control:`text`}},i={labels:!0,backLabel:`Back`,title:`Title`,prevLabel:`Previous`,nextLabel:`Next`}})))()}function o(){return(o=e((()=>{t(),a()})))()}var s,c,l,u,d;function f(){return(f=e((()=>{o(),s={title:`Components/PageNav`,argTypes:r,args:i},c=e=>n(e),l={args:{labels:!0},render:c},u={args:{labels:!1},render:c},d=[`WithLabels`,`IconsOnly`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    labels: true
  },
  render
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    labels: false
  },
  render
}`,...u.parameters?.docs?.source}}}})))()}f();export{u as IconsOnly,l as WithLabels,d as __namedExportsOrder,s as default};