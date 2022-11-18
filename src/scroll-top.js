const template = document.createElement('template');

const html = String.raw;

template.innerHTML = html`
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

class ScrollTop extends HTMLElement {
  #buttonEl;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  get visibleAfter() {
    return this.getAttribute('visible-after');
  }

  set visibleAfter(value) {
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
    return Number(this.getAttribute('top-offset')) || 0;
  }

  set topOffset(value) {
    const numValue = Number(value) || 0;
    this.setAttribute('top-offset', numValue > 0 ? numValue : 0);
  }

  static get observedAttributes() {
    return ['visible-after'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'visible-after') {
      this.#setContainerHeight(newValue);
    }
  }

  connectedCallback() {
    this.#upgradeProperty('visibleAfter');
    this.#upgradeProperty('smoothScrolling');
    this.#upgradeProperty('topOffset');

    if (!this.topOffset) {
      this.topOffset = 0;
    }

    if (!this.visibleAfter) {
      this.visibleAfter = '50vh';
    }

    this.#buttonEl = this.shadowRoot.querySelector('button');

    this.#setContainerHeight(this.visibleAfter);

    try {
      this.observer = new IntersectionObserver(([entry]) => {
        this.hidden = entry.isIntersecting;
        this.#buttonEl.part.toggle('button--hidden', entry.isIntersecting);

        this.dispatchEvent(new CustomEvent('scroll-top:visibility-change', {
          bubbles: true,
          composed: true,
          detail: {
            visible: !entry.isIntersecting
          }
        }));
      });

      this.observer.observe(this);
    } catch (err) {
      console.error(err);
    }

    this.#buttonEl.addEventListener('click', this.#onClick);
  }

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    this.#buttonEl.removeEventListener('click', this.#onClick);
  }

  /**
   * https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
   * This is to safe guard against cases where, for instance, a framework
   * may have added the element to the page and set a value on one of its
   * properties, but lazy loaded its definition. Without this guard, the
   * upgraded element would miss that property and the instance property
   * would prevent the class property setter from ever being called.
   */
  #upgradeProperty(prop) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  #setContainerHeight(value) {
    if (typeof value === 'string') {
      this.style.height = value;
    }
  }

  #onClick = evt => {
    evt.preventDefault();

    const opts = {
      top: this.topOffset
    };

    if (this.smoothScrolling) {
      opts.behavior = 'smooth';
    }

    document.scrollingElement.scrollTo(opts);
  };

  static defineCustomElement(elementName = 'scroll-top') {
    if (typeof window !== 'undefined' && !window.customElements.get(elementName)) {
      window.customElements.define(elementName, ScrollTop);
    }
  }
}

export { ScrollTop };
