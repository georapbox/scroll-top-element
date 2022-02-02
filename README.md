# scroll-to-top

A "Scroll to Top" Web Component that is revealed after the user has scrolled down.  
[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) API is used under the hood to detect when the button will be revealed.

## Attributes/Properties
| Name | Default | Description |
| ---- | ------- | ----------- |
| `visible-after` | `"50vh"` | Optional. It defines the distance the user needs to scroll from top so that the button is revealed. The value provided must have a valid absolute or relative length unit, eg `px`, `rem`, `vh`, etc. |

## Usage

### HTML
```html
<!-- Default usage -->
<scroll-to-top></scroll-to-top>

<!-- Customize button's text content and properties -->
<scroll-to-top visible-after="200px">
  Back to top
</scroll-to-top>
```

### CSS
```css
/* Custom styling */

scroll-to-top::part(button) {
  background-color: #0d6efd;
  border: 1px solid #0d6efd;
  color: #ffffff;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  transition: all 0.3s ease-in-out;
  transform: translateY(100%);
}

scroll-to-top::part(button):hover {
  background-color: #0b5ed7;
  border-color: #0a58ca;
}

/* Customize button when its state is visible */
scroll-to-top[visible]::part(button) {
  transform: translateY(0);
}
```

## License

[The MIT License (MIT)](https://georapbox.mit-license.org/@2022)
