function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону < body >
//     на випадкове значення, використовуючи інлайн стиль.
//  Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.
const refs = {
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
};

let intervalId = null;
isActive = false;

refs.startButton.addEventListener('click', () => {
  if (isActive) {
    return console.log('"START" is already pressed');
  }
  isActive = true;
  intervalId = setInterval(() => {
    console.log('START');
    console.log(getRandomHexColor());
  }, 1000);
});

refs.stopButton.addEventListener('click', () => {
  clearInterval(intervalId);
  isActive = false;
  console.log('STOP');
});

console.log(intervalId);
