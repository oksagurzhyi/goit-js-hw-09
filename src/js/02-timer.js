import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_red.css';

const inputElem = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');

let selectedDate;
let pickedTime;
let data = {};
let timerId = null;

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0];
    pickedTime = selectedDate - Date.now();

    if (pickedTime <= 0) {
      alert`Please choose a date in the future`;
    } else {
      btnStart.disabled = false;
    }
  },
};
flatpickr(inputElem, options);

btnStart.addEventListener('click', onClickBtnStart);

function onClickBtnStart() {
  timerId = setInterval(() => {
    const ms = selectedDate - Date.now();
    data = convertMs(ms);
    if (ms <= 0) {
      removerInterval(timerId);
    }
    document.querySelector('span[data-days]').textContent = pad(data.days);
    document.querySelector('span[data-hours]').textContent = pad(data.hours);
    document.querySelector('span[data-minutes]').textContent = pad(
      data.minutes
    );
    document.querySelector('span[data-seconds]').textContent = pad(
      data.seconds
    );
  }, 1000);
  inputElem.disabled = true;
  btnStart.disabled = true;
}
function removerInterval() {
  clearInterval(timerId);
  timerId = null;

  inputElem.disabled = false;
  btnStart.disabled = false;
  data = { days: 0, hours: 0, minutes: 0, seconds: 0 };
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function pad(value) {
  return String(value).padStart(2, '0');
}
