// @ts-check

/**
 * Represents a value that may be of type T, or null.
 *
 * @template T
 * @typedef {T | null} Nullable
 */

const styles = /* css */ `
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
`;

const template = document.createElement('template');

template.innerHTML = /* html */ `
  <style>${styles}</style>
  <button type="button" class="button button--hidden" part="button button--hidden"><slot>Scroll to top</slot></button>
`;

/**
 * @summary A custom element that scrolls to the top of the page.
 * @documentation https://github.com/georapbox/scroll-top-element#readme
 *
 * @tagname scroll-top - This is the default tag name, unless overridden by the `defineCustomElement` method.
 *
 * @property {string} visibleAfter - The distance from the top of the page at which the button becomes visible.
 * @property {boolean} smoothScrolling - Whether to scroll smoothly or not.
 * @property {number} topOffset - The offset from the top of the page to scroll to.
 *
 * @attribute {boolean} visible-after - Reflects the `visibleAfter` property.
 * @attribute {boolean} smooth-scrolling - Reflects the `smoothScrolling` property.
 * @attribute {boolean} top-offset - Reflects the `topOffset` property.
 *
 * @slot - the default slot where the content of the scroll-top button is placed.
 *
 * @csspart button - The scroll to top button.
 * @csspart button--hidden - The hidden state of the scroll to top button.
 *
 * @event scroll-top:visibility-change - Emitted when the visibility of the button changes.
 *
 * @method defineCustomElement - Static method. Defines the custom element with the given name.
 */
class ScrollTop extends HTMLElement {
  /** @type {Nullable<IntersectionObserver>} */
  #observer = null;

  /** @type {Nullable<HTMLButtonElement>} */
  #buttonEl = null;

  constructor() {
    super();

    if (!this.shadowRoot) {
      const shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: true });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  static get observedAttributes() {
    return ['visible-after'];
  }

  /**
   * Lifecycle method that is called when attributes are changed, added, removed, or replaced.
   *
   * @param {string} name - The name of the attribute.
   * @param {string} oldValue - The old value of the attribute.
   * @param {string} newValue - The new value of the attribute.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'visible-after') {
      this.#setContainerHeight(newValue);
    }
  }

  /**
   * Lifecycle method that is called when the element is added to the DOM.
   */
  connectedCallback() {
    this.#upgradeProperty('visibleAfter');
    this.#upgradeProperty('smoothScrolling');
    this.#upgradeProperty('topOffset');

    this.#buttonEl = this.shadowRoot?.querySelector('button') ?? null;

    this.#setContainerHeight(this.visibleAfter);

    try {
      this.#observer = new IntersectionObserver(([entry]) => {
        this.#buttonEl?.classList.toggle('button--hidden', entry.isIntersecting);
        this.#buttonEl?.part.toggle('button--hidden', entry.isIntersecting);

        this.dispatchEvent(
          new CustomEvent('scroll-top:visibility-change', {
            bubbles: true,
            composed: true,
            detail: {
              visible: !entry.isIntersecting
            }
          })
        );
      });

      this.#observer.observe(this);
    } catch (err) {
      console.error(err);
    }

    this.#buttonEl?.addEventListener('click', this.#handleClick);
  }

  /**
   * Lifecycle method that is called when the element is removed from the DOM.
   */
  disconnectedCallback() {
    if (this.#observer) {
      this.#observer.disconnect();
      this.#observer = null;
    }

    this.#buttonEl?.removeEventListener('click', this.#handleClick);
  }

  /**
   * @type {string} - The distance from the top of the page at which the button becomes visible.
   * @default '50vh'
   * @attribute visible-after - Reflects the `visibleAfter` property.
   */
  get visibleAfter() {
    return this.getAttribute('visible-after') || '50vh';
  }

  set visibleAfter(value) {
    this.setAttribute('visible-after', value);
  }

  /**
   * @type {boolean} - Whether to scroll smoothly or not.
   * @default false
   * @attribute smooth-scrolling - Reflects the `smoothScrolling` property.
   */
  get smoothScrolling() {
    return this.hasAttribute('smooth-scrolling');
  }

  set smoothScrolling(value) {
    this.toggleAttribute('smooth-scrolling', !!value);
  }

  /**
   * @type {number} - The offset from the top of the page to scroll to.
   * @default 0
   * @attribute top-offset - Reflects the `topOffset` property.
   */
  get topOffset() {
    return Number(this.getAttribute('top-offset')) || 0;
  }

  set topOffset(value) {
    const numValue = Math.abs(Number(value)) || 0;
    this.setAttribute('top-offset', numValue.toString());
  }

  /**
   * Sets the height of the container.
   *
   * @param {string} value - The height value with unit.
   */
  #setContainerHeight(value) {
    if (typeof value !== 'string') {
      return;
    }

    this.style.height = value;
  }

  /**
   * Handles the click event on the button.
   *
   * @param {MouseEvent} evt - The event object.
   */
  #handleClick = evt => {
    evt.preventDefault();

    document.scrollingElement?.scrollTo({
      top: this.topOffset,
      behavior: this.smoothScrolling ? 'smooth' : 'instant'
    });
  };

  /**
   * This is to safe guard against cases where, for instance, a framework may have added the element to the page and set a
   * value on one of its properties, but lazy loaded its definition. Without this guard, the upgraded element would miss that
   * property and the instance property would prevent the class property setter from ever being called.
   *
   * https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
   *
   * @param {'visibleAfter' | 'smoothScrolling' | 'topOffset'} prop - The property name to upgrade.
   */
  #upgradeProperty(prop) {
    /** @type {any} */
    const instance = this;

    if (Object.prototype.hasOwnProperty.call(instance, prop)) {
      const value = instance[prop];
      delete instance[prop];
      instance[prop] = value;
    }
  }

  /**
   * Defines a custom element with the given name.
   * The name must contain a dash (-).
   *
   * @param {string} [elementName='scroll-top'] - The name of the custom element.
   * @example
   *
   * ScrollTop.defineCustomElement('my-scroll-top');
   */
  static defineCustomElement(elementName = 'scroll-top') {
    if (typeof window !== 'undefined' && !window.customElements.get(elementName)) {
      window.customElements.define(elementName, ScrollTop);
    }
  }
}

export { ScrollTop };
