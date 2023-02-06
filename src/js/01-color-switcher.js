const body = document.querySelector('body');
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let intervalId = setInterval(getRandomHexColor, 1000);

btnStart.addEventListener('click', startChangeColor);
btnStop.addEventListener('click', stopChangeColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startChangeColor() {
  body.style.backgroundColor = intervalId;
  // intervalId = setInterval(getRandomHexColor, 1000);
}

function stopChangeColor() {
  clearInterval(intervalId);
}
