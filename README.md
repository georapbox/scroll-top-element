[![npm version](https://img.shields.io/npm/v/@georapbox/scroll-top-element.svg)](https://www.npmjs.com/package/@georapbox/scroll-top-element)
[![npm license](https://img.shields.io/npm/l/@georapbox/scroll-top-element.svg)](https://www.npmjs.com/package/@georapbox/scroll-top-element)

[demo]: https://georapbox.github.io/scroll-top-element/
[support]: https://caniuse.com/#feat=custom-elementsv1
[polyfill]: https://github.com/webcomponents/polyfills/tree/master/packages/custom-elements
[license]: https://georapbox.mit-license.org/@2022

# &lt;scroll-top&gt; element

A custom element that scrolls to the top of the page. The element is not visible until the user scrolls down a specified amount of pixels. [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) API is used under the hood to detect when the element will be visible.

[API documentation](#api) &bull; [Demo][demo]

## Install

```sh
$ npm install --save @georapbox/scroll-top-element
```

## Usage

### Script
```js
import { ScrollTop } from './node_modules/@georapbox/scroll-top-element/dist/scroll-top.min.js';

// Manually define the element.
ScrollTop.defineCustomElement();
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

By default, the component is style-free to remain as less opinionated as possible. However, you can style the various elements of the component using the ::part() CSS pseudo-elements provided for this purpose. Below are demonstrated all available parts for styling.

```css
scroll-top::part(button) {
  /* Custom styling for button */
}

scroll-top::part(button button--hidden) {
  /* Custom styling for button's hidden state */
}
```

## API

### Properties/Attributes
| Property | Attribute | Type | Default | Description |
| -------- | --------- | ---- | ------- | ----------  |
| `visibleAfter` | `visible-after` | String | `"50vh"` | Optional. It defines the distance the user needs to scroll from top so that the button is revealed. The value provided must have a valid absolute or relative length unit, eg `px`, `rem`, `vh`, etc. |
| `smoothScrolling` | `smooth-scrolling` | Boolean | `false` | Optional. Specifies whether the scrolling should animate smoothly, or happen instantly in a single jump which is the default behavior. |
| `topOffset` | `top-offset` | Number | `0` | Optional. Specifies the number of pixels along the Y axis to scroll the window. |

All properties reflect their values as HTML attributes to keep the element's DOM representation in sync with its JavaScript state.

### Slots

| Name | Description |
| ---- | ----------- |
| (default) | The scroll to top button's content. |

### CSS Parts

| Name | Description |
| ---- | ----------- |
| `button` | The scroll to top button. |
| `button--hidden` | The scroll to top button when is hidden. |

### Methods

| Name | Type | Description | Arguments |
| ---- | ---- | ----------- | --------- |
| `defineCustomElement` | Static | Defines/registers the custom element with the name provided. If no name is provided, the default name is used. The method checks if the element is already defined, hence will skip trying to redefine it. | `elementName='scroll-top'` |

### Events

`scroll-top:visibility-change` - Emitted when the visibility of the element changes.

```js
document.addEventListener('scroll-top:visibility-change', evt => {
  console.log(evt.detail); // => { visible: true }
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
