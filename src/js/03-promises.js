import Notiflix from 'notiflix';

let delay = document.querySelector('input[name="delay"]');
let step = document.querySelector('input[name="step"]');
let amount = document.querySelector('input[name="amount"]');
let btnSubmit = document.querySelector('button[type="submit"]');
let count = 1;
let num = 0;

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
  count = 0;
  delay.value = '';
  step.value = '';
  amount.value = '';
  num = 0;
}

btnSubmit.addEventListener('click', (event) => {
  num = Number(delay.value)
  event.preventDefault();
  setTimeout(() => {

    createPromise(count, num)
    .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        count++
        num += Number(step.value)
    })
    .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        count++
        num += Number(step.value)
    })

    let timerId = setInterval(() => 
    createPromise(count, num)
    .then(({ position, delay }) => {
      if (count >= amount.value) {
        clearInterval(timerId); 
        stopFunc()
      }
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        count++
        num += Number(step.value)
    })
    .catch(({ position, delay }) => {
      if (count >= amount.value) {
        clearInterval(timerId);
        stopFunc()
      }
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        count++
        num += Number(step.value)
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