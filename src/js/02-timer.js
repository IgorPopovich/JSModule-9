import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


let start = document.querySelector('[data-start]');
let daysValue = document.querySelector('[data-days]');
let hoursValue = document.querySelector('[data-hours]');
let minutesValue = document.querySelector('[data-minutes]');
let secondsValue = document.querySelector('[data-seconds]');

let arr = [ daysValue, hoursValue, minutesValue, secondsValue ]

start.setAttribute("disabled", "true");

let miliseconds = 0;

const options = {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      let date = new Date();
      let timeInMs = Date.now();
      date.getDate()
      if (selectedDates[0].getTime() >= date.getTime()) {
        start.disabled = false;
        miliseconds = selectedDates[0].getTime() - timeInMs;
       
        const objTime = convertMs(miliseconds)

        console.log(objTime)

        if (objTime.days < 10) {
          daysValue.innerHTML = `0${objTime.days}`
        } else {
          daysValue.innerHTML = `${objTime.days}`
        }

        if (objTime.hours < 10) {
          hoursValue.innerHTML = `0${objTime.hours}`
        } else {
          hoursValue.innerHTML = `${objTime.hours}`
        }

        if (objTime.minutes < 10) {
          minutesValue.innerHTML = `0${objTime.minutes}`
        } else {
          minutesValue.innerHTML = `${objTime.minutes}`
        }

        if (objTime.seconds < 10) {
          secondsValue.innerHTML = `0${objTime.seconds}`
        } else {
          secondsValue.innerHTML = `${objTime.seconds}`
        }
      } else {
        start.disabled = true;
        secondsValue.textContent = "00"
        hoursValue.textContent = "00"
        minutesValue.textContent = "00"
        daysValue.textContent = "00"
        Notiflix.Notify.failure('Please choose a date in the future');
      }
    },
}

flatpickr('input[type="text"]', options)


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
  

start.addEventListener('click', () => {
  let interal = setInterval(() => {

  miliseconds -= 1000

  if (miliseconds > 0) {
    convertMs(miliseconds)
    let obj = convertMs(miliseconds);

      if ( obj.days < 10 ) {
        daysValue.innerHTML = `0${obj.days}`;
      } else {
        daysValue.innerHTML = obj.days;
      }

      if ( obj.hours < 10 ) {
        hoursValue.innerHTML = `0${obj.hours}`;
      } else {
        hoursValue.innerHTML = obj.hours;
      }

      if ( obj.minutes < 10 ) {
        minutesValue.innerHTML = `0${obj.minutes}`;
      } else {
        minutesValue.innerHTML = obj.minutes;
      }

      if ( obj.seconds < 10 ) {
        secondsValue.innerHTML = `0${obj.seconds}`;
      } else {
        secondsValue.innerHTML = obj.seconds;
      }
    } else {
      clearInterval(interal);
      miliseconds = 0;
      start.disabled = true;
    }
  }, 1000);

  start.classList.add('disable')
});
