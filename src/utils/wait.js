/**
 * `Promise` version of `setTimeout`.
 * From: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
 */
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

export default wait