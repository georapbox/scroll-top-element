import { ScrollTop } from 'https://unpkg.com/@georapbox/scroll-top-element/dist/scroll-top.min.js';

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

ScrollTop.defineCustomElement();
