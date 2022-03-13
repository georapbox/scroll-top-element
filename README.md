[demo]: https://georapbox.github.io/scroll-top-element/
[support]: https://caniuse.com/#feat=custom-elementsv1
[polyfill]: https://github.com/webcomponents/polyfills/tree/master/packages/custom-elements
[license]: https://georapbox.mit-license.org/@2022

# &lt;scroll-top&gt; element

A custom element that scrolls to the top of the page. The element is not visible until the user scrolls down a specified amount of pixels. [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) API is used under the hood to detect when the element will be visible.

[API documentation](#api) &bull; [Demo][demo]

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
<scroll-top visible-after="200px" smooth-scrolling>
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

scroll-top::part(button button--hidden) {
  /* Custom styling for button's hidden state */
}
```

## API

### Properties/Attributes
| Property name | Attribute name | Type | Default | Description |
| ------------- | -------------- | ---- | ------- | ----------  |
| `visibleAfter` | `visible-after` | String | `"50vh"` | Optional. It defines the distance the user needs to scroll from top so that the button is revealed. The value provided must have a valid absolute or relative length unit, eg `px`, `rem`, `vh`, etc. |
| `smoothScrolling` | `smooth-scrolling` | Boolean | `false` | Optional. Specifies whether the scrolling should animate smoothly, or happen instantly in a single jump which is the default behavior. |
| `topOffset` | `top-offset` | Number | `0` | Optional. Specifies the number of pixels along the Y axis to scroll the window. |

All properties reflect their values as HTML attributes to keep the element's DOM representation in sync with its JavaScript state.

### Static methods

#### ScrollTop.defineCustomElement(elementName='scroll-top')

Defines/registers the custom element with the name provided. If no name is provided, the default name is used. The method checks if the element is already defined, hence will skip trying to redefine it.

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| elementName | `string` | `scroll-top` | Name for the new custom element |

### Events

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

## License

[The MIT License (MIT)][license]
