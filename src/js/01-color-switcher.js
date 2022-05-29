function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону < body >
//     на випадкове значення, використовуючи інлайн стиль.
//  Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.
const refs = {
  body: document.querySelector('body'),
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
};

let intervalId = null; // правило хорошошо тону :)
let isActive = false; //присвоюємо початковий статус, який нижче будем змінювати, коли натиснута кнопка Старт

refs.startButton.addEventListener('click', () => {
  //вішаємо слухача на кнопку "Старт"
  if (isActive) {
    //Перевіряємо статус кнопки і якщо true
    return console.log('"START" is already pressed'); //зразу ж виходимо + пишемо в консоль
  }
  isActive = true; //міняємо статус кнопки
  intervalId = setInterval(() => {
    //запускаємо інтервал, створюємо intervalId
    console.log('START');
    // console.log(getRandomHexColor());
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

refs.stopButton.addEventListener('click', () => {
  //вішаємо слухача на кнопку "Стоп"
  clearInterval(intervalId); //зупиняємо інтервал по (intervalId)
  isActive = false; //змінюємо статус кнопки "Старт"
  console.log('STOP');
});

// console.log(intervalId);
