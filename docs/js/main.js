const url = window.location.href;
const isLocalhost = url.includes('127.0.0.1') || url.includes('localhost');
const componentUrl = isLocalhost ? '../../dist/scroll-top.js' : '../lib/scroll-top.js';

document.addEventListener('scroll-top:visibility-change', evt => {
  console.log('event.detail ->', evt.detail);
});

document.getElementById('scroll-down').addEventListener('click', evt => {
  evt.preventDefault();
  document.scrollingElement.scrollTo({
    top: 1000,
    behavior: 'smooth'
  });
});

document.addEventListener('DOMContentLoaded', () => {
  window.hljs.highlightAll();
});

const { ScrollTop } = await import(componentUrl);
ScrollTop.defineCustomElement();
