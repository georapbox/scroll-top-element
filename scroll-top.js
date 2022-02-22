const template = document.createElement('template');

template.innerHTML = /*template*/`
  <style>
    :host {
      all: initial;
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      width: 1px;
    }

    :host button {
      position: fixed;
      bottom: 16px;
      right: 16px;
      cursor: pointer;
    }

    :host([hidden]) button {
      opacity: 0;
      visibility: hidden;
    }
  </style>

  <div class="container" part="container">
    <button type="button" part="button"><slot>Scroll to top</slot></button>
  </div>
`;

export class ScrollTop extends HTMLElement {
  constructor() {
    super();

    this.observer = null;
    this.$container = null;
    this.$button = null;

    const shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.appendChild(template.content.cloneNode(true));

    this.onClick = this.onClick.bind(this);
  }

  get visibleAfter() {
    return this.getAttribute('visible-after') || '50vh';
  }

  set visibleAfter(value) {
    if (typeof value !== 'string') {
      return;
    }
    this.setAttribute('visible-after', value);
  }

  get smoothScrolling() {
    return this.hasAttribute('smooth-scrolling');
  }

  set smoothScrolling(value) {
    if (value) {
      this.setAttribute('smooth-scrolling', '');
    } else {
      this.removeAttribute('smooth-scrolling');
    }
  }

  get topOffset() {
    return this.getAttribute('top-offset');
  }

  set topOffset(value) {
    if (typeof value !== 'number') {
      return;
    }
    this.setAttribute('top-offset', value);
  }

  onClick() {
    const opts = {
      top: Number(this.topOffset) || 0
    };

    if (this.smoothScrolling) {
      opts.behavior = 'smooth';
    }

    document.documentElement.scrollTo(opts);
  }

  setContainerHeight(value) {
    if (typeof value === 'string' && this.$container) {
      this.$container.style.height = value;
    }
  }

  connectedCallback() {
    this.$container = this.shadowRoot.querySelector('.container');
    this.$button = this.shadowRoot.querySelector('button');

    this.setContainerHeight(this.visibleAfter);

    try {
      this.observer = new IntersectionObserver(([entry]) => {
        this.hidden = entry.isIntersecting;

        this.dispatchEvent(new CustomEvent('scroll-top:visibilitychange', {
          bubbles: true,
          detail: {
            visible: !entry.isIntersecting
          }
        }));
      });

      this.observer.observe(this.$container);
    } catch (err) {
      console.error(err);
    }

    this.$button.addEventListener('click', this.onClick);
  }

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    this.$button.removeEventListener('click', this.onClick);
  }

  attributeChangedCallback(name, _, newValue) {
    if (name === 'visible-after') {
      this.setContainerHeight(newValue);
    }
  }

  static get observedAttributes() {
    return ['visible-after'];
  }

  static defineCustomElement(elementName = 'scroll-top') {
    if (typeof window !== 'undefined' && !window.customElements.get(elementName)) {
      window.customElements.define(elementName, ScrollTop);
    }
  }
}
