# scroll-to-top

A "Scroll to Top" custom element that is revealed after the user has scrolled down.  
[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) API is used under the hood to detect when the button willbe revealed.

## Attributes/Properties
| Name | Default | Description |
| ---- | ------- | ----------- |
| `top-offset` | `"50vh"` | Optional. It defines the distance the user needs to scroll from top so that the button is revealed. |
| `visible` | - | Optional. If set, the button is always visible by default. |

## Usage

### HTML
```html
<!-- Default usage -->
<scroll-to-top></scroll-to-top>

<!-- Customize button's text content and properties -->
<scroll-to-top 
  top-offset="200px" 
  visible
>
  Back to top
</scroll-to-top>
```

### CSS
```css
/* Custom styling */

scroll-to-top::part(button) {
  background-color: #0d6efd;
  border-color: #0d6efd;
  border-style: solid;
  border-width: 1px;
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
