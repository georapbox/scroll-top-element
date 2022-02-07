# &lt;scroll-top&gt; element

"Scroll to top" custom element that is revealed after the user has scrolled down. [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) API is used under the hood to detect when the element will be revealed.

## Usage

### Script
```js
import { ScrollTop } from '<YOUR_PATH>/scroll-top.js';

ScrollTop.defineCustomElement();

// Alternatively, you can use the `CustomElementRegistry.define()` method to define the element,
// which is what the `ScrollTop.defineCustomElement()` static method uses under the hood.
window.customElements.define('scroll-top', ScrollTop);
```

### Markup
```html
<!-- Usage with defaults -->
<scroll-top></scroll-top>

<!-- Customize button's text content and properties -->
<scroll-top visible-after="200px">
  Back to top
</scroll-top>
```

### Style
```css
/* Custom styling */

scroll-top:not(:defined) {
  /* Custom styling if element is not defined */
}

scroll-top::part(button) {
  /* Custom styling for button */
}

scroll-top::part(button):hover {
  /* Custom styling for button's hover state */
}

scroll-top[hidden]::part(button) {
  /* Custom styling for button's hidden state */
}
```

## Attributes
| Name | Default | Description |
| ---- | ------- | ----------- |
| `visible-after` | `"50vh"` | Optional. It defines the distance the user needs to scroll from top so that the button is revealed. The value provided must have a valid absolute or relative length unit, eg `px`, `rem`, `vh`, etc. |

## Static methods

### ScrollTop.defineCustomElement([elementName])

Defines/registers the custom element with the name provided. If no name is provided, the default name is used. The method checks if the element is already defined, hence will skip trying to redefine it.

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| elementName | `string` | `scroll-top` | Name for the new custom element |

## Events

Every time the visibility of the element changes a `scroll-top:visibilitychange` event is dispatched from the <scroll-top> element:

```js
document.addEventListener('scroll-top:visibilitychange', event => {
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
