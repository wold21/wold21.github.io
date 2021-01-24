/* D-day counter */

const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h2");

function timeMaker() {
  const date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes();
  // const sec = date.getSeconds();
  clockTitle.innerText = `
  ${hour < 10 ? `0${hour}` : `${hour}`}:${min < 10 ? `0${min}` : `${min}`}`;
}

function init() {
  timeMaker();
  setInterval(timeMaker, 1000);
}

init();
