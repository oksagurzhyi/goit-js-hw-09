const body = document.querySelector('body');

const btnStartElem = document.querySelector('[data-start]');

const btnStopElem = document.querySelector('[data-stop]');

btnStopElem.disabled = true;

btnStartElem.addEventListener('click', startChangeColor);

btnStopElem.addEventListener('click', stopChangeColor);

let timerId = null;

function startChangeColor() {
  btnStopElem.disabled = false;
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  btnStartElem.disabled = true;
}

function stopChangeColor() {
  clearInterval(timerId);
  btnStartElem.disabled = false;
  btnStopElem.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
