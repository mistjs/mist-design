// Test via a getter in the options object to see if the passive property is accessed
let supportsPassive = false;
try {
  let opts = Object.defineProperty({}, 'passive', {
    // eslint-disable-next-line getter-return
    get() {
      supportsPassive = true;
    },
  });
  window.addEventListener('testPassive', null, opts);
  window.removeEventListener('testPassive', null, opts);
  // eslint-disable-next-line no-empty
} catch (e) {}

export default supportsPassive;
