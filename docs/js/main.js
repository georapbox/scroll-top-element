const isLocalhost = window.location.href.includes('127.0.0.1') || window.location.href.includes('localhost');
const componentUrl = isLocalhost ? '../../dist/scroll-top-defined.js' : '../lib/scroll-top-defined.js';

import(componentUrl).then(() => {
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
}).catch(err => {
  console.error(err);
});
