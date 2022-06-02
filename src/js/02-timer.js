// Напиши скрипт таймера, який здійснює зворотний відлік до певної дати. Такий таймер може використовуватися у блогах та інтернет-магазинах, сторінках реєстрації подій, під час технічного обслуговування тощо.
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  blockTimer: document.querySelector('.timer'),
  start: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

const SELECTEDTIME = 'savedTimeInStorage'; //використаємо  session storage для того щоб зберегти значення selectedDates[0];

refs.start.setAttribute('disabled', true); //Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в майбутньому.
// Натисканням на кнопку «Start» починається відлік часу до обраної дати з моменту натискання.
refs.start.addEventListener('click', onStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    // Якщо користувач вибрав дату в минулому, покажи window.alert() з текстом "Please choose a date in the future".
    if (selectedDates[0] - options.defaultDate < 0) {
      console.log(options.defaultDate);
      return Notiflix.Notify.warning('Please choose a date in the future');
    }
    //   Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає активною.
    console.log('active button');
    refs.start.removeAttribute('disabled');
    sessionStorage.setItem('savedTimeInStorage', selectedDates[0]);
  },
};

flatpickr('input', options); //запускаємо плагін з опціями;

const timer = {
  start() {
    const futureTime = new Date(sessionStorage.getItem(SELECTEDTIME)).getTime(); //отримаємо вибраний час в мс , з комірки пам'яті;
    // console.log('futureTime is', futureTime);
    const intervalId = setInterval(() => {
      const currentTime = Date.now(); //отримуємо поточний час
      const delta = futureTime - currentTime; //обчислимо різницю між вибраним часом і поточним
      if (delta > 0) {
        const { days, hours, minutes, seconds } = addLeadingZero(convertMs(delta));
        // console.log(addLeadingZero(convertMs(delta)));
        refs.days.textContent = days;
        refs.hours.textContent = hours;
        refs.minutes.textContent = minutes;
        refs.seconds.textContent = seconds;
        console.log(delta);
      } else {
        clearInterval(intervalId);
        refs.start.removeAttribute('disabled'); //робимо активною кнопку старт;
        console.log('Timer is Stoped. You can choose a new Date!');
      }
    }, 1000);
  },
};

function onStart() {
  console.log('You pushed start!');
  timer.start();
  refs.input.setAttribute('disabled', true);
  refs.start.setAttribute('disabled', true);
}

// В інтерфейсі таймера необхідно додавати 0, якщо в числі менше двох символів
function addLeadingZero(value) {
  for (const key in value) {
    //для кожного ключа в об'єкті
    value[key] = String(value[key]).padStart(2, '0'); //змінимо значення ключа
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

refs.blockTimer.style.display = 'flex';
refs.blockTimer.style.justifyContent = 'space-evenly';
refs.blockTimer.style.backgroundColor = 'gray';
