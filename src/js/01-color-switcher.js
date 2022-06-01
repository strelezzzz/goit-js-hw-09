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
refs.stopButton.disabled = true;
let intervalId = null; // правило хорошошо тону :)
let isActive = false; //присвоюємо початковий статус, який нижче будем змінювати, коли натиснута кнопка Старт
// ====================================
refs.startButton.addEventListener('click', () => {
  //вішаємо слухача на кнопку "Старт"
  if (isActive) {
    //Перевіряємо статус кнопки і якщо true виходимо
    return;
  }
  isActive = true; //міняємо статус кнопки
  console.log('START');
  intervalId = setInterval(() => {
    //запускаємо інтервал та створюємо intervalId
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.startButton.disabled = true; // вимикаємо вмикаємо відповідні кнопки
  refs.stopButton.disabled = false;
});
// ================================================================
refs.stopButton.addEventListener('click', () => {
  //вішаємо слухача на кнопку "Стоп"
  clearInterval(intervalId); //зупиняємо інтервал по (intervalId)
  isActive = false; //змінюємо статус кнопки "Старт"
  refs.startButton.disabled = false;
  refs.stopButton.disabled = true;
  console.log('STOP');
});
