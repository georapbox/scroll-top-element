[![npm version](https://img.shields.io/npm/v/@georapbox/scroll-top-element.svg)](https://www.npmjs.com/package/@georapbox/scroll-top-element)
[![npm license](https://img.shields.io/npm/l/@georapbox/scroll-top-element.svg)](https://www.npmjs.com/package/@georapbox/scroll-top-element)

[demo]: https://georapbox.github.io/scroll-top-element/
[license]: https://github.com/georapbox/scroll-top-element/blob/main/LICENSE
[changelog]: https://github.com/georapbox/scroll-top-element/blob/main/CHANGELOG.md

# &lt;scroll-top&gt;

A custom element that scrolls to the top of the page. The element is not visible until the user scrolls down a specified amount of pixels. [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) API is used under the hood to detect when the element will be visible.

[API documentation](#api) &bull; [Demo][demo]

## Install

```sh
$ npm install --save @georapbox/scroll-top-element
```

## Usage

### Script
```js
import { ScrollTop } from './node_modules/@georapbox/scroll-top-element/dist/scroll-top.js';

// Manually define the element.
ScrollTop.defineCustomElement();
```

Alternatively, you can import the automatically defined custom element.

```js
import './node_modules/@georapbox/scroll-top-element/dist/scroll-top-defined.js';
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

By default, the component is style-free to remain as less opinionated as possible. However, you can style the various elements of the component using [CSS Parts](#css-parts) provided for this purpose.

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
| Name | Reflects | Type | Required | Default | Description |
| ---- | -------- | ---- | -------- | ------- | ----------- |
| `visibleAfter`<br>*`visible-after`* | ✓ | String | - | `"50vh"` | The distance the user needs to scroll from top so that the button is revealed. The value provided must have a valid absolute or relative length unit, eg `px`, `rem`, `vh`, etc. |
| `smoothScrolling`<br>*``smooth-scrolling``* | ✓ | Boolean | - | `false` | Whether the scrolling should animate smoothly, or happen instantly in a single jump which is the default behavior. |
| `topOffset`<br>*`top-offset`* | ✓ | Number | - | `0` | The offset (in pixels) from the top of the page when scrolling to the top. |

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

| Name | Description | Event Detail |
| ---- | ----------- | ------------ |
| `scroll-top:visibility-change` | Emitted when the visibility of the element changes. | `{ visible: boolean }` |

## Changelog

For API updates and breaking changes, check the [CHANGELOG][changelog].

## Development setup

### Prerequisites

The project requires `Node.js` and `npm` to be installed on your environment. Preferrably, use [nvm](https://github.com/nvm-sh/nvm) Node Version Manager and use the version of Node.js specified in the `.nvmrc` file by running `nvm use`.

### Install dependencies

Install the project dependencies by running the following command.

```sh
npm install
```

### Build for development

Watch for changes and start a development server by running the following command.

```sh
npm start
```

### Linting

Lint the code by running the following command.

```sh
npm run lint
```

### Testing

Run the tests by running any of the following commands.

```sh
npm test
npm run test:watch # watch mode
```

### Build for production

Create a production build by running the following command.

```sh
npm run build
```

## License

[The MIT License (MIT)][license]
