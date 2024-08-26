# CHANGELOG

## v2.0.2 (2024-08-26)

- Add type definitions for TypeScript.
- Replace parcel with esbuild for bundling.
- Update ESLint to use flat configuration.
- Use Prettier for code formatting.
- Update dev dependencies.

## v2.0.1 (2023-05-17)

- Fix a bug that caused the `scroll-top` element to endlessly toggle its state between visible and hidden when not intersecting the viewport.
- Ensure that the element is by default hidden to avoid a flash of the element when the page loads.
- Update dev dependencies.

## v2.0.0 (2022-11-18)

- Refactor to use private class fields.
- Replace rollup.js with parcel.js for bundling.
- Update dev dependencies.

### Breaking Changes

- Only minified production builds will be included in the `dist` folder from now on.

## v1.1.1 (2022-06-28)

- Use `composed: true` for all dispatched events, to make them propagate across the shadow DOM boundary into the standard DOM.

## v1.1.0 (2022-04-08)

- Export the defined custom element as `scroll-top-defined.js` in case you don't want to manualy define it.

## v1.0.0 (2022-03-20)

- Initial release
