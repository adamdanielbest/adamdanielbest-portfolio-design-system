import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t={mobile:{id:`icon-top-panel-open-sm`,label:`Open menu`},tablet:{id:`icon-top-panel-open-sm`,label:`Open menu`},"desktop-open":{id:`icon-left-panel-close-sm`,label:`Close sidebar`},"desktop-closed":{id:`icon-left-panel-open-sm`,label:`Open sidebar`}}})))()}function r(){c||(c=!0,fetch(s).then(e=>e.text()).then(e=>{if(document.querySelector(`#header-sprite`))return;let t=document.createElement(`div`);t.id=`header-sprite`,t.style.display=`none`,t.setAttribute(`aria-hidden`,`true`),t.innerHTML=e,document.body.insertBefore(t,document.body.firstChild)}))}function i({hover:e=!1,focus:t=!1}={}){let n=[`header__logo`];return e&&n.push(`header__logo--hover`),t&&n.push(`header__logo--focus`),`<a href="/" class="${n.join(` `)}">adamdanielbest</a>`}function a(e){let{id:n,label:r}=t[e]??t.mobile;return`
    <button class="header__icon-btn" type="button" aria-label="${r}" tabindex="-1">
      <svg class="header__icon" aria-hidden="true" focusable="false">
        <use href="#${n}"></use>
      </svg>
    </button>`}function o({breakpoint:e=`mobile`}={},{logoHover:t=!1,logoFocus:n=!1}={}){r();let o=e===`mobile`,s=e===`desktop-closed`,c=[`header-demo`];o&&c.push(`header-demo--mobile`),s&&c.push(`header-demo--desktop-closed`);let l=`Site header, ${e.replace(`-`,` `)}`,u=s?``:i({hover:t,focus:n}),d=a(e);return`<header class="${c.join(` `)}" aria-label="${l}">${u}${d}</header>`}var s,c,l,u;function d(){return(d=e((()=>{n(),s=new URL(new URL(`sprite-CeAPqowK.svg`,import.meta.url).href,``+import.meta.url).href,c=!1,l={breakpoint:{control:`select`,options:[`mobile`,`tablet`,`desktop-open`,`desktop-closed`],description:`Viewport breakpoint variant`}},u={breakpoint:`mobile`}})))()}var f,p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{d(),f={title:`Components/Header`,argTypes:l,args:u},p=e=>o(e),m={args:{breakpoint:`mobile`},render:p},h={args:{breakpoint:`tablet`},render:p},g={args:{breakpoint:`desktop-open`},render:p},_={args:{breakpoint:`desktop-closed`},render:p},v={name:`Logo — Hover`,args:{breakpoint:`mobile`},render:e=>o(e,{logoHover:!0})},y={name:`Logo — Focus`,args:{breakpoint:`mobile`},render:e=>o(e,{logoFocus:!0})},b=[`Mobile`,`Tablet`,`DesktopOpen`,`DesktopClosed`,`LogoHover`,`LogoFocus`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    breakpoint: 'mobile'
  },
  render
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    breakpoint: 'tablet'
  },
  render
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    breakpoint: 'desktop-open'
  },
  render
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    breakpoint: 'desktop-closed'
  },
  render
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Logo — Hover',
  args: {
    breakpoint: 'mobile'
  },
  render: args => renderHeader(args, {
    logoHover: true
  })
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Logo — Focus',
  args: {
    breakpoint: 'mobile'
  },
  render: args => renderHeader(args, {
    logoFocus: true
  })
}`,...y.parameters?.docs?.source}}}})))()}x();export{_ as DesktopClosed,g as DesktopOpen,y as LogoFocus,v as LogoHover,m as Mobile,h as Tablet,b as __namedExportsOrder,f as default};