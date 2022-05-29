// Напиши скрипт таймера, який здійснює зворотний відлік до певної дати. Такий таймер може використовуватися у блогах та інтернет-магазинах, сторінках реєстрації подій, під час технічного обслуговування тощо.
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  start: document.querySelector('button[data-start]'),
};

refs.start.setAttribute('disabled', true); //Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в майбутньому.
refs.start.addEventListener('click', onStart);
// Натисканням на кнопку «Start» починається відлік часу до обраної дати з моменту натискання.
function onStart() {
  console.log('You pushed start!');
  refs.start.setAttribute('disabled', true);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    // Якщо користувач вибрав дату в минулому, покажи window.alert() з текстом "Please choose a date in the future".
    if (selectedDates[0] - Date.now() < 0) {
      return alert('Please choose a date in the future');
    }
    //   Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає активною.
    refs.start.removeAttribute('disabled');
  },
};

flatpickr('#datetime-picker', options);
// console.log(options.onClose.selectedDates[0]);

// const timer = {
//   start() {
//     const startTime = Date.now();

//     setInterval(() => {
//       const currentTime = Date.now();
//       console.log(startTime - currentTime);
//     }, 1000);
//   },
// };

// timer.start();

// В інтерфейсі таймера необхідно додавати 0, якщо в числі менше двох символів
function addLeadingZero(value) {
  for (const key in value) {
    value[key] = String(value[key]).padStart(2, '0');
  }
  return value;
}

// ms - різниця між кінцевою і поточною датою в мілісекундах.
function convertMs(ms) {
  // Number of milliseconds per unit of time
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
//
console.log(convertMs(24140000));
console.log(addLeadingZero(convertMs(24140000)));
