import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./sprite-DyCcgjkB.js";var n,r,i,a,o;function s(){return(s=e((()=>{t(),n=`<svg aria-hidden="true" focusable="false"><use href="#icon-visibility-off"/></svg>`,r=`<svg aria-hidden="true" focusable="false"><use href="#icon-search"/></svg>`,i=({type:e=`text`,state:t=`default`,label:i=`Label`,placeholder:a,value:o,required:s=!1})=>{let c=t===`disabled`,l=t===`filled`,u=t==="default"?``:` input--${t}`,d=l?o||(e===`password`?`password`:`User input`):``,f=a||(e===`search`?`Search...`:e===`password`?`••••••`:`Placeholder text`),p=t===`error`?` aria-invalid="true"`:``,m=c?` disabled`:``,h=e===`search`?`<span class="input__leading-icon" aria-hidden="true">${r}</span>
       <input class="input__value" type="search" placeholder="${f}" value="${d}"${p}${m}>`:e===`password`?`<input class="input__value" type="password" placeholder="${f}" value="${d}" autocomplete="current-password"${p}${m}>
       <span class="input__trailing-icon" aria-hidden="true">${n}</span>`:`<input class="input__value" type="text" placeholder="${f}" value="${d}"${p}${m}>`;return`
    <div class="input input--${e}${u}" style="max-width:320px">
      <div class="input__label-row">
        <span class="input__label">${i}</span>${s?`<span class="input__required" aria-hidden="true">*</span>`:``}
      </div>
      <div class="input__field">${h}</div>
      ${e===`search`?``:`<p class="input__helper">${t===`error`?`Error message`:`Helper text`}</p>`}
    </div>
  `},a={label:{control:`text`},required:{control:`boolean`},state:{control:`select`,options:[`default`,`hover`,`focus`,`filled`,`disabled`,`error`,`focus-hover`],description:`Simulated interaction state`}},o={label:`Label`,state:`default`}})))()}export{a as i,s as n,i as r,o as t};