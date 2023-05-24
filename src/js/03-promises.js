function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

const formElem = document.querySelector('.form');
console.log(formElem);
const btnCreatProm = document.querySelector('[button]');
console.log(btnCreatProm);
console.log(123);
