# &lt;scroll-to-top&gt; element

"Scroll to Top" Web Component that is revealed after the user has scrolled down. [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) API is used under the hood to detect when the element will be revealed.

## Usage

### Script
```js
import { ScrollToTop } from '<YOUR_PATH>/scroll-to-top.js';

ScrollToTop.defineCustomElement();

// Alternatively, you can use the `CustomElementRegistry.define()` method to define the element,
// which is what the `ScrollToTop.defineCustomElement()` static method uses under the hood.
window.customElements.define('scroll-to-top', ScrollToTop);
```

### Markup
```html
<!-- Usage with defaults -->
<scroll-to-top></scroll-to-top>

<!-- Customize button's text content and properties -->
<scroll-to-top visible-after="200px">
  Back to top
</scroll-to-top>
```

### Style
```css
/* Custom styling */

scroll-to-top:not(:defined) {
  /* Custom styling if element is not defined */
}

scroll-to-top::part(button) {
  /* Custom styling for button */
}

scroll-to-top::part(button):hover {
  /* Custom styling for button's hover state */
}

scroll-to-top[hidden]::part(button) {
  /* Custom styling for button's hidden state */
}
```

## Attributes
| Name | Default | Description |
| ---- | ------- | ----------- |
| `visible-after` | `"50vh"` | Optional. It defines the distance the user needs to scroll from top so that the button is revealed. The value provided must have a valid absolute or relative length unit, eg `px`, `rem`, `vh`, etc. |

## Static methods

### ScrollToTop.defineCustomElement([elementName])

Defines/registers the custom element with the name provided. If no name is provided, the default name is used. The method checks if the element is already defined, hence will skip trying to redefine it.

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| elementName | `string` | `scroll-to-top` | Name for the new custom element |

## Events

Every time the visibility of the element changes a `scroll-to-top:visibilitychange` event is dispatched from the <scroll-to-top> element:

```js
document.addEventListener('scroll-to-top:visibilitychange', event => {
  console.log(event.detail); // => { visible: true }
});
```

## Browser support

Browsers without native [custom element support][support] require a [polyfill][polyfill].

- Firefox
- Chrome
- Microsoft Edge
- Safari

[support]: https://caniuse.com/#feat=custom-elementsv1
[polyfill]: https://github.com/webcomponents/polyfills/tree/master/packages/custom-elements

## License

[The MIT License (MIT)](https://georapbox.mit-license.org/@2022)
