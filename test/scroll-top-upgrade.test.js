import { elementUpdated, expect, fixture, fixtureCleanup, html } from '@open-wc/testing';
import { ScrollTop } from '../src/scroll-top.js';

describe('scroll-top upgrading', () => {
  it('default properties', async () => {
    const el = await fixture(html`<scroll-top></scroll-top>`);

    // Update properties before upgrading
    el.visibleAfter = '300px';
    el.smoothScrolling = true;
    el.topOffset = 100;

    // Upgrade custom element
    ScrollTop.defineCustomElement();

    await elementUpdated(el);

    expect(el.getAttribute('visible-after')).to.equal('300px');
    expect(el.getAttribute('smooth-scrolling')).to.equal('');
    expect(el.getAttribute('top-offset')).to.equal('100');
  });

  afterEach(() => {
    fixtureCleanup();
  });
});
