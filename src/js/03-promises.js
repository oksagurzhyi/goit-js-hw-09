import Notiflix from 'notiflix';

const formElem = document.querySelector('.form');

let data = { delay: 0, step: 0, amount: 0 };

formElem.addEventListener('submit', onSubmit);
function onSubmit(e) {
  e.preventDefault();
  const delayValue = formElem.elements.delay.value;
  const stepValue = formElem.elements.step.value;
  const amountValue = formElem.elements.amount.value;
  data = {
    ...data,
    delay: Number(delayValue),
    step: Number(stepValue),
    amount: Number(amountValue),
  };

  for (let i = 1; i <= data.amount; i++) {
    createPromise(i, data.delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    data.delay += Number(data.step);
  }
  formElem.reset();
}
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    const timerId = setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
