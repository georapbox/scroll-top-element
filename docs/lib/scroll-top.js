/*!
 * @georapbox/scroll-top-element
 * A custom element that scrolls to the top of the page.
 *
 * @version 2.0.2
 * @homepage https://github.com/georapbox/scroll-top-element#readme
 * @author George Raptis <georapbox@gmail.com>
 * @license MIT
 */
var l=`
  :host {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
  }

  .button {
    position: fixed;
    bottom: 16px;
    right: 16px;
    cursor: pointer;
  }

  .button--hidden {
    opacity: 0;
    visibility: hidden;
  }
`,o=document.createElement("template");o.innerHTML=`
  <style>${l}</style>
  <button type="button" class="button button--hidden" part="button button--hidden"><slot>Scroll to top</slot></button>
`;var i=class n extends HTMLElement{#t=null;#e=null;constructor(){super(),this.shadowRoot||this.attachShadow({mode:"open",delegatesFocus:!1}).appendChild(o.content.cloneNode(!0))}static get observedAttributes(){return["visible-after"]}attributeChangedCallback(t,e,s){t==="visible-after"&&this.#i(s)}connectedCallback(){this.#s("visibleAfter"),this.#s("smoothScrolling"),this.#s("topOffset"),this.#e=this.shadowRoot?.querySelector("button")??null,this.#i(this.visibleAfter);try{this.#t=new IntersectionObserver(([t])=>{this.#e?.classList.toggle("button--hidden",t.isIntersecting),this.#e?.part.toggle("button--hidden",t.isIntersecting),this.dispatchEvent(new CustomEvent("scroll-top:visibility-change",{bubbles:!0,composed:!0,detail:{visible:!t.isIntersecting}}))}),this.#t.observe(this)}catch(t){console.error(t)}this.#e?.addEventListener("click",this.#o)}disconnectedCallback(){this.#t&&(this.#t.disconnect(),this.#t=null),this.#e?.removeEventListener("click",this.#o)}get visibleAfter(){return this.getAttribute("visible-after")||"50vh"}set visibleAfter(t){this.setAttribute("visible-after",t)}get smoothScrolling(){return this.hasAttribute("smooth-scrolling")}set smoothScrolling(t){this.toggleAttribute("smooth-scrolling",!!t)}get topOffset(){return Number(this.getAttribute("top-offset"))||0}set topOffset(t){let e=Math.abs(Number(t))||0;this.setAttribute("top-offset",e.toString())}#i(t){typeof t=="string"&&(this.style.height=t)}#o=t=>{t.preventDefault(),document.scrollingElement?.scrollTo({top:this.topOffset,behavior:this.smoothScrolling?"smooth":"instant"})};#s(t){let e=this;if(Object.prototype.hasOwnProperty.call(e,t)){let s=e[t];delete e[t],e[t]=s}}static defineCustomElement(t="scroll-top"){typeof window<"u"&&!window.customElements.get(t)&&window.customElements.define(t,n)}};export{i as ScrollTop};
