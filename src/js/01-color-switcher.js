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

refs.startButton.addEventListener('click', onStartClick);
refs.stopButton.addEventListener('click', onStopClick);

function onStartClick() {
  console.log('START');
  console.log(getRandomHexColor());
}

function onStopClick() {
  console.log('STOP');
}
