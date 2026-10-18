import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./sprite-DyCcgjkB.js";function r(e,t,n){let r=e===`multi`,i=l.map((e,t)=>{let i=n===e;return`<li class="select__option${i?` select__option--selected`:``}" role="option" aria-selected="${i}" tabindex="0"><span>${e}</span>${r?i?s:c:``}</li>`}).join(`
        `);return`
      <ul class="select__dropdown" id="select-listbox" role="listbox" aria-labelledby="select-label"${r?` aria-multiselectable="true"`:``}${t?``:` style="display:none"`}>
        ${i}
      </ul>`}function i(e,{multi:n=!1}={}){let r=e.querySelector(`.select`),i=e.querySelector(`.select__field`),a=e.querySelector(`.select__value`),o=e.querySelector(`.select__dropdown`),s=e.querySelectorAll(`.select__option`);if(e.querySelector(`.select__icon`),!r||!i||!o||r.classList.contains(`select--disabled`))return;let c=o.style.display!==`none`;function l(e){t(i.querySelector(`.select__icon`),e?`#icon-arrow-drop-up`:`#icon-arrow-drop-down`)}function u(){[`select--hover`,`select--focus`,`select--focus-hover`,`select--error`].forEach(e=>r.classList.remove(e)),r.classList.add(`select--open`),o.style.display=``,i.setAttribute(`aria-expanded`,`true`),l(!0),c=!0}function d(){r.classList.remove(`select--open`),o.style.display=`none`,i.setAttribute(`aria-expanded`,`false`),l(!1),c=!1}function f(){let e=[...s].filter(e=>e.classList.contains(`select__option--selected`)).map(e=>e.querySelector(`span`).textContent);a.textContent=e.length?e.join(`, `):`Select option...`,r.classList.toggle(`select--filled`,e.length>0)}i.addEventListener(`click`,e=>{e.stopPropagation(),c?d():u()}),i.addEventListener(`keydown`,e=>{if((e.key===`Enter`||e.key===` `||e.key===`ArrowDown`||e.key===`ArrowUp`)&&(e.preventDefault(),!c)){u();let e=o.querySelector(`.select__option:not([aria-disabled="true"])`);e&&e.focus()}e.key===`Escape`&&c&&d()});let p=[...s];function m(e){if(n){let n=!e.classList.contains(`select__option--selected`);e.classList.toggle(`select__option--selected`,n),e.setAttribute(`aria-selected`,String(n));let r=e.querySelector(`use`);r&&t(r.closest(`svg`),n?`#icon-checkbox-checked`:`#icon-checkbox`),f()}else p.forEach(e=>{e.classList.remove(`select__option--selected`),e.setAttribute(`aria-selected`,`false`)}),e.classList.add(`select__option--selected`),e.setAttribute(`aria-selected`,`true`),a.textContent=e.querySelector(`span`).textContent,r.classList.add(`select--filled`),d(),i.focus()}s.forEach(e=>{e.addEventListener(`keydown`,t=>{let n=p.indexOf(e);if(t.key===`ArrowDown`){t.preventDefault();let e=p[n+1];e&&e.focus()}else t.key===`ArrowUp`?(t.preventDefault(),n===0?i.focus():p[n-1].focus()):t.key===`Enter`||t.key===` `?(t.preventDefault(),m(e)):(t.key===`Escape`||t.key===`Tab`)&&(d(),i.focus())}),e.addEventListener(`click`,t=>{t.stopPropagation(),m(e)})}),document.addEventListener(`click`,()=>{c&&d()})}var a,o,s,c,l,u,d,f;function p(){return(p=e((()=>{n(),a=`<svg class="select__icon" aria-hidden="true" focusable="false" viewBox="0 0 16 16"><use href="#icon-arrow-drop-up"/></svg>`,o=`<svg class="select__icon" aria-hidden="true" focusable="false" viewBox="0 0 16 16"><use href="#icon-arrow-drop-down"/></svg>`,s=`<svg class="select__option-check" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><use href="#icon-checkbox-checked"/></svg>`,c=`<svg class="select__option-check" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><use href="#icon-checkbox"/></svg>`,l=[`Option one`,`Option two`,`Option three`,`Option four`,`Option five`],u=({state:e=`default`,label:t=`Label`,required:n=!1,value:i=``})=>{let s=e===`disabled`,c=e===`filled`,l=e===`select-single-select`,u=e===`select-multiselect`,d=l||u,f=u?`multi`:`single`,p=c?i||`Option one`:``,m=d?` select--open`:e==="default"?``:` select--${e}`,h=c?` select--filled`:``,g=s?` aria-disabled="true"`:``,_=c?i||`Option one`:`Select option...`,v=d?a:o,y=e===`error`?`<p class="select__helper">Error message</p>`:`<p class="select__helper">Helper text</p>`;return`
    <div class="select${m}${h}" style="max-width:320px;padding-bottom:220px;"${g}>
      <div class="select__label-row">
        <span class="select__label" id="select-label">${t}</span>${n?`<span class="select__required" aria-hidden="true">*</span>`:``}
      </div>
      <div class="select__field-wrap">
        <div class="select__field" role="combobox" aria-haspopup="listbox" aria-expanded="${d}" aria-labelledby="select-label" aria-controls="select-listbox" tabindex="0">
          <span class="select__value">${_}</span>
          ${v}
        </div>
        ${r(f,d,p)}
      </div>
      ${y}
    </div>
  `},d={label:{control:`text`},required:{control:`boolean`},value:{control:`text`,description:`Selected value (shown in filled state)`},state:{control:`select`,options:[`default`,`hover`,`focus`,`focus-hover`,`filled`,`disabled`,`error`,`select-single-select`,`select-multiselect`],description:`Simulated interaction state`}},f={label:`Label`,state:`default`,required:!1,value:``}})))()}var m,h,g,_,v,y,b,x,S,C,w,T,E,D,O;function k(){return(k=e((()=>{p(),m={title:`Components/Select`,argTypes:d,args:f},h=e=>u(e),g=({canvasElement:e})=>i(e),_=({canvasElement:e})=>i(e,{multi:!0}),v={args:{state:`default`},render:h,play:g},y={args:{state:`hover`},render:h,play:g},b={args:{state:`focus`},render:h,play:g},x={args:{state:`focus-hover`},render:h,play:g},S={args:{state:`filled`},render:h,play:g},C={args:{state:`disabled`},render:h},w={args:{state:`error`},render:h,play:g},T={args:{state:`default`,required:!0},render:h,play:g},E={args:{state:`select-single-select`},render:h,play:g},D={args:{state:`select-multiselect`},render:h,play:_},O=[`Default`,`Hover`,`Focus`,`FocusHover`,`Filled`,`Disabled`,`Error`,`Required`,`SingleSelect`,`Multiselect`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'default'
  },
  render,
  play: makeSingle
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'hover'
  },
  render,
  play: makeSingle
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'focus'
  },
  render,
  play: makeSingle
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'focus-hover'
  },
  render,
  play: makeSingle
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'filled'
  },
  render,
  play: makeSingle
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'disabled'
  },
  render
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'error'
  },
  render,
  play: makeSingle
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'default',
    required: true
  },
  render,
  play: makeSingle
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'select-single-select'
  },
  render,
  play: makeSingle
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'select-multiselect'
  },
  render,
  play: makeMulti
}`,...D.parameters?.docs?.source}}}})))()}k();export{v as Default,C as Disabled,w as Error,S as Filled,b as Focus,x as FocusHover,y as Hover,D as Multiselect,T as Required,E as SingleSelect,O as __namedExportsOrder,m as default};