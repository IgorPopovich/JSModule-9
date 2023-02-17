function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let start = document.querySelector('[data-start]');
let stop = document.querySelector('[data-stop]');
const body = document.querySelector("body")

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


start.addEventListener('click', (event) => {
    const updateColor =  setInterval(() => {
        body.style.background = getRandomHexColor()
    }, 1000);

    stop.addEventListener('click', (event) => {
        clearInterval(updateColor);
    })
})
