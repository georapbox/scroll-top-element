# &lt;scroll-to-top&gt; element

"Scroll to Top" Web Component that is revealed after the user has scrolled down.  
[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) API is used under the hood to detect when the element will be revealed.

## Attributes
| Name | Default | Description |
| ---- | ------- | ----------- |
| `visible-after` | `"50vh"` | Optional. It defines the distance the user needs to scroll from top so that the button is revealed. The value provided must have a valid absolute or relative length unit, eg `px`, `rem`, `vh`, etc. |

## Installation

```js
import { ScrollToTop } from '<YOUR_PATH>/scroll-to-top.js';
```

## Usage

### JS
```js
if (!window.customElements.get('scroll-to-top')) {
  window.customElements.define('scroll-to-top', ScrollToTop);
}
```

### HTML
```html
<!-- Usage with defaults -->
<scroll-to-top></scroll-to-top>

<!-- Customize button's text content and properties -->
<scroll-to-top visible-after="200px">
  Back to top
</scroll-to-top>
```

### CSS
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
