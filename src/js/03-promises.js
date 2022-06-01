const form = document.querySelector('form');
const submit = document.querySelector('button');
// const DELEY = 0;

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  let firstDelay = evt.target.delay.value;
  let delay = evt.target.step.value;
  let amount = evt.target.amount.value;
  console.log(firstDelay, delay, amount);
  evt.currentTarget.reset();

  setTimeout(() => {
    let position = 0;
    createPromise(position, delay); //стільки разів, скільки ввели в поле amount.
  }, firstDelay);
}

function onFormInput(evt) {}

createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(console.log(`✅ Fulfilled promise ${position} in ${delay}ms`)); // Fulfill (position, delay)
      } else {
        reject(console.log(`❌ Rejected promise ${position} in ${delay}ms`)); // Reject
      }
    }, 2000);
  });
}
