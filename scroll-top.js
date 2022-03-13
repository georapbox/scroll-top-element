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

  <button type="button" part="button"><slot>Scroll to top</slot></button>
`;

export class ScrollTop extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._onClick = this._onClick.bind(this);
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

  static get observedAttributes() {
    return ['visible-after'];
  }

  attributeChangedCallback(name, _, newValue) {
    if (name === 'visible-after') {
      this._setContainerHeight(newValue);
    }
  }

  connectedCallback() {
    this.$button = this.shadowRoot.querySelector('button');

    this._setContainerHeight(this.visibleAfter);
    this._upgradeProperty('visibleAfter');
    this._upgradeProperty('smoothScrolling');
    this._upgradeProperty('topOffset');

    try {
      this.observer = new IntersectionObserver(([entry]) => {
        this.hidden = entry.isIntersecting;
        this.$button.part.toggle('button--hidden', entry.isIntersecting);

        this.dispatchEvent(new CustomEvent('scroll-top:visibilitychange', {
          bubbles: true,
          detail: {
            visible: !entry.isIntersecting
          }
        }));
      });

      this.observer.observe(this);
    } catch (err) {
      console.error(err);
    }

    this.$button.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    this.$button.removeEventListener('click', this._onClick);
  }

  /**
   * https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
   * This is to safe guard against cases where, for instance, a framework
   * may have added the element to the page and set a value on one of its
   * properties, but lazy loaded its definition. Without this guard, the
   * upgraded element would miss that property and the instance property
   * would prevent the class property setter from ever being called.
   */
  _upgradeProperty(prop) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  _setContainerHeight(value) {
    if (typeof value === 'string') {
      this.style.height = value;
    }
  }

  _onClick(evt) {
    evt.preventDefault();

    const opts = {
      top: Number(this.topOffset) || 0
    };

    if (this.smoothScrolling) {
      opts.behavior = 'smooth';
    }

    document.documentElement.scrollTo(opts);
  }

  static defineCustomElement(elementName = 'scroll-top') {
    if (typeof window !== 'undefined' && !window.customElements.get(elementName)) {
      window.customElements.define(elementName, ScrollTop);
    }
  }
}
