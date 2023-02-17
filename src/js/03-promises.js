import Notiflix from 'notiflix';

let delay = document.querySelector('input[name="delay"]');
let step = document.querySelector('input[name="step"]');
let amount = document.querySelector('input[name="amount"]');
let btnSubmit = document.querySelector('button[type="submit"]');
let count = 1;

function createPromise( position, delay ) {
  return new Promise(( resolve, reject ) => {
    const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
})}

function stopFunc () {
  count = 0
  delay.value = ''
  step.value = ''
  amount.value = ''
}


btnSubmit.addEventListener('click', (event) => {
  event.preventDefault();
  setTimeout(() => {

    createPromise(count, step.value)
    .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        count++
    })
    .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        count++
    })

    let timerId = setInterval(() => 
    createPromise(count, step.value)
    .then(({ position, delay }) => {
      if (count >= amount.value) {
        clearInterval(timerId); 
        stopFunc()
      }
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        count++
    })
    .catch(({ position, delay }) => {
      if (count >= amount.value) {
        clearInterval(timerId);
        stopFunc()
      }
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        count++
    }), step.value);
  },  delay.value)
})


/*
      if (count <= 1) {
        steped = 0
      } else {
        steped = step.value
      }
      */