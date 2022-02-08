import { copyFile } from 'fs';

copyFile('lib/scroll-top.js', 'docs/scroll-top-lib.js', err => {
  if (err) {
    throw err;
  }
  console.log('scroll-top.js was copied to destination directory');
});
