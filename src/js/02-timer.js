import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');

let selectedDate;
let intervalId = null;

startBtn.addEventListener('click', startTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    startBtn.disabled = false;
  },
};
flatpickr(input, options);

function startTimer() {
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedDate - currentTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    updateTimerText({ days, hours, minutes, seconds });
    input.disabled = true;
    if (deltaTime < 1000) {
      clearInterval(intervalId);
      input.disabled = false;
      startBtn.disabled = true;
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerText({ days, hours, minutes, seconds }) {
  daysTimer.textContent = `${days}`;
  hoursTimer.textContent = `${hours}`;
  minutesTimer.textContent = `${minutes}`;
  secondsTimer.textContent = `${seconds}`;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = String(Math.floor(ms / day)).padStart(3, ' ');
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
