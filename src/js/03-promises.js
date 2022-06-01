const form = document.querySelector('form');
const submit = document.querySelector('button');
// const DELEY = 0;

// form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);
// =======================================================
function onFormSubmit(evt) {
  evt.preventDefault();
  let delay = parseInt(evt.target.delay.value);
  const delayStep = parseInt(evt.target.step.value);
  const amount = parseInt(evt.target.amount.value);
  //
  evt.currentTarget.reset();
  // визвемо функцію <<createPromise>>  кількість разів = amount
  for (let position = 0; position < amount; position++) {
    createPromise(position, delay);
    delay += delayStep;
  }
}
// ====================================================
function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay }); // Fulfill (position, delay)
      } else {
        reject({ position, delay }); // Reject (position, delay)
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
