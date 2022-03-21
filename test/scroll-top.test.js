import { elementUpdated, expect, fixture, fixtureCleanup, html, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';
import { ScrollTop } from '../src/scroll-top.js';

ScrollTop.defineCustomElement();

describe('<scroll-top>', () => {
  it('passes accessibility test', async () => {
    const el = await fixture(html`<scroll-top></scroll-top>`);

    await expect(el).to.be.accessible();
  });

  it('default properties', async () => {
    const el = await fixture(html`<scroll-top></scroll-top>`);

    expect(el.visibleAfter).to.equal('50vh');
    expect(el.getAttribute('visible-after')).to.equal('50vh');

    expect(el.smoothScrolling).to.be.false;
    expect(el.getAttribute('smooth-scrolling')).to.be.null;

    expect(el.topOffset).to.equal(0);
    expect(el.getAttribute('top-offset')).to.equal('0');
  });

  it('change default properties', async () => {
    const el = await fixture(html`<scroll-top visible-after="300px" smooth-scrolling top-offset="100"></scroll-top>`);

    expect(el.visibleAfter).to.equal('300px');
    expect(el.getAttribute('visible-after')).to.equal('300px');

    expect(el.smoothScrolling).to.be.true;
    expect(el.getAttribute('smooth-scrolling')).to.equal('');

    expect(el.topOffset).to.equal(100);
    expect(el.getAttribute('top-offset')).to.equal('100');
  });

  it('change visibleAfter property', async () => {
    const el = await fixture(html`<scroll-top></scroll-top>`);

    el.visibleAfter = '100px';

    await elementUpdated(el);

    expect(el.visibleAfter).to.equal('100px');
    expect(el.getAttribute('visible-after')).to.equal('100px');
  });

  it('change smoothScrolling property', async () => {
    const el = await fixture(html`<scroll-top></scroll-top>`);

    el.smoothScrolling = false;

    await elementUpdated(el);

    expect(el.smoothScrolling).to.be.false;
    expect(el.getAttribute('smooth-scrolling')).to.be.null;

    el.smoothScrolling = true;

    await elementUpdated(el);

    expect(el.smoothScrolling).to.be.true;
    expect(el.getAttribute('smooth-scrolling')).to.equal('');
  });

  it('change topOffset property', async () => {
    const el = await fixture(html`<scroll-top></scroll-top>`);

    el.topOffset = 200;

    await elementUpdated(el);

    expect(el.topOffset).to.equal(200);
    expect(el.getAttribute('top-offset')).to.equal('200');
  });

  it('default slot is properly updated', async () => {
    const el = await fixture(html`<scroll-top>Back to top</scroll-top>`);

    expect(el).lightDom.to.equal('Back to top');
  });

  it('element is hidden by default', async () => {
    const el = await fixture(html`<scroll-top></scroll-top>`);
    const btn = el.shadowRoot.querySelector('button');

    await elementUpdated(el);

    expect(el.hidden).to.be.true;
    expect(btn.part.contains('button--hidden')).to.be.true;
  });

  it('toggle element\'s visibility depending on scroll distance', async () => {
    const el = await fixture(html`<scroll-top visible-after="100px"></scroll-top>`);
    const btn = el.shadowRoot.querySelector('button');

    document.scrollingElement.style.height = '1000px';
    document.scrollingElement.scrollTop = 300;

    await elementUpdated(el);

    expect(el.hidden).to.be.false;
    expect(btn.part.contains('button--hidden')).to.be.false;

    btn.click();

    await elementUpdated(el);

    expect(el.hidden).to.be.true;
    expect(btn.part.contains('button--hidden')).to.be.true;
  });

  it('scroll-top:visibility-change event is emitted', async () => {
    const el = await fixture(html`<scroll-top visible-after="100px"></scroll-top>`);
    const handler = sinon.spy();

    el.addEventListener('scroll-top:visibility-change', handler);

    document.scrollingElement.style.height = '1000px';
    document.scrollingElement.scrollTop = 300;

    await waitUntil(() => handler.calledOnce);

    expect(handler).to.have.been.calledOnce;
  });

  it('scrolls to top of page asynchronously', async () => {
    const el = await fixture(html`<scroll-top visible-after="100px" smooth-scrolling></scroll-top>`);
    const btn = el.shadowRoot.querySelector('button');

    document.scrollingElement.style.height = '1000px';
    document.scrollingElement.scrollTop = 300;

    btn.click();

    await elementUpdated(el);
    await waitUntil(() => document.scrollingElement.scrollTop === 0);

    expect(document.scrollingElement.scrollTop).to.equal(0);
  });

  afterEach(() => {
    fixtureCleanup();
  });
});
