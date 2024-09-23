// Variables
let isGenerated = false
let correctCounter = 0


// ID / Class initialization
const boxNumber = document.querySelectorAll('.random-number')
const button = document.getElementById('button')
const reloadButton = document.getElementById('reload-button')
const randomNumber = document.getElementById('generated-number')
const clicked1 = document.querySelector('.clickable1')
const clicked2 = document.querySelector('.clickable2')
const clicked3 = document.querySelector('.clickable3')
const clicked4 = document.querySelector('.clickable4')
const clicked5 = document.querySelector('.clickable5')
const clicked6 = document.querySelector('.clickable6')
const clicked7 = document.querySelector('.clickable7')
const clicked8 = document.querySelector('.clickable8')
const clicked9 = document.querySelector('.clickable9')


// Action declaration
boxNumber.forEach(box => {
        box.innerText = Math.floor(Math.random() * 9) + 1
    }
)

button.addEventListener("click", randomNumberGenerator)
reloadButton.addEventListener("click", reloadFunction)

clicked1.addEventListener("click", () => checker(clicked1))
clicked2.addEventListener("click", () => checker(clicked2))
clicked3.addEventListener("click", () => checker(clicked3))
clicked4.addEventListener("click", () => checker(clicked4))
clicked5.addEventListener("click", () => checker(clicked5))
clicked6.addEventListener("click", () => checker(clicked6))
clicked7.addEventListener("click", () => checker(clicked7))
clicked8.addEventListener("click", () => checker(clicked8))
clicked9.addEventListener("click", () => checker(clicked9))


// All functions
function randomNumberGenerator() {
    randomNumber.innerText = Math.floor(Math.random() * 9) + 1
    randomNumber.style.color = "#000"
    isGenerated = true;
}

function checker(buttonVariable) {
    if(isGenerated) {
        if(buttonVariable.innerText === randomNumber.innerText) {
            buttonVariable.disabled = true
            randomNumber.style.color = "#36cc43"

            correctCounter++
        }
        else randomNumber.style.color = "#f61a1a"
    }
    isGenerated = false
    if(correctCounter === 9) result()
}

function result() {
    button.disabled = true
    reloadButton.classList.remove('hidden')
    randomNumber.style.fontSize = "3rem"
    randomNumber.style.textAlign = "center"
    randomNumber.innerText = "You Won"
}

function reloadFunction() {
    location.reload()
    reloadButton.classList.add('hidden')
}
