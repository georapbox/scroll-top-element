# CHANGELOG

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
