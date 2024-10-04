// Variables

let isGenerated = false
let correctCounter = 0
let is_win = false;


// ID / Class initialization

const boxNumber = document.querySelectorAll('.random-number')
// const button = document.getElementById('button')
const reloadButton = document.getElementById('reload-button')
const randomNumber = document.getElementById('generated-number')
const exitButton = document.getElementById('exit-button')
const score1 = document.getElementById('scoreboard1')
const score2 = document.getElementById('scoreboard2')

const clicked1 = document.querySelector('.clickable1')
const clicked2 = document.querySelector('.clickable2')
const clicked3 = document.querySelector('.clickable3')
const clicked4 = document.querySelector('.clickable4')
const clicked5 = document.querySelector('.clickable5')
const clicked6 = document.querySelector('.clickable6')
const clicked7 = document.querySelector('.clickable7')
const clicked8 = document.querySelector('.clickable8')
const clicked9 = document.querySelector('.clickable9')
const clicked10 = document.querySelector('.clickable10')
const clicked11 = document.querySelector('.clickable11')
const clicked12 = document.querySelector('.clickable12')
const clicked13 = document.querySelector('.clickable13')
const clicked14 = document.querySelector('.clickable14')
const clicked15 = document.querySelector('.clickable15')
const clicked16 = document.querySelector('.clickable16')


// Action declaration
boxNumber.forEach(box => {
        box.innerText = Math.floor(Math.random() * 16) + 1
    }
)

// button.addEventListener("click", randomNumberGenerator)
// reloadButton.addEventListener("click", reloadFunction)
exitButton.addEventListener("click", exitTheGame)

clicked1.addEventListener("click", () => checker(clicked1))
clicked2.addEventListener("click", () => checker(clicked2))
clicked3.addEventListener("click", () => checker(clicked3))
clicked4.addEventListener("click", () => checker(clicked4))
clicked5.addEventListener("click", () => checker(clicked5))
clicked6.addEventListener("click", () => checker(clicked6))
clicked7.addEventListener("click", () => checker(clicked7))
clicked8.addEventListener("click", () => checker(clicked8))
clicked9.addEventListener("click", () => checker(clicked9))
clicked10.addEventListener("click", () => checker(clicked10))
clicked11.addEventListener("click", () => checker(clicked11))
clicked12.addEventListener("click", () => checker(clicked12))
clicked13.addEventListener("click", () => checker(clicked13))
clicked14.addEventListener("click", () => checker(clicked14))
clicked15.addEventListener("click", () => checker(clicked15))
clicked16.addEventListener("click", () => checker(clicked16))


// button.disabled = true;
// button.hidden = true;

// All functions

socket.on('random', (data) => {

    // console.log(data.num);
    // randomNumber.style.animation = 'none'
    // randomNumber.offsetHeight
    // randomNumber.style.animation = ''
    // if(!is_win) randomNumberGenerator(data.num);
    if(!is_win)
    {
        randomNumber.style.animation = 'none'
        randomNumber.offsetHeight
        randomNumber.style.animation = ''

        randomNumber.innerText = data.num;
        randomNumber.style.color = "#000"
        isGenerated = true;
    }
    // else {
    //     socket.on('lose', () => {

    //         // button.disabled = true
    //         // reloadButton.classList.remove('hidden')
    //         randomNumber.style.fontSize = "3rem"
    //         randomNumber.style.textAlign = "center"
    //         randomNumber.innerText = "You Lose"
    //         randomNumber.style.color = "#990000"
    //     })
    // }
    
})

// function randomNumberGenerator(num) {
//     // randomNumber.innerText = Math.floor(Math.random() * 16) + 1
//     randomNumber.innerText = num;
//     // randomNumber.style.color = "#000"
//     isGenerated = true;
// }

function checker(buttonVariable) {
    if(isGenerated) {
        if(buttonVariable.innerText === randomNumber.innerText) {
            buttonVariable.disabled = true
            buttonVariable.style.color = "#f7f7f7"
            randomNumber.style.color = "#36cc43"

            correctCounter++
            score1.innerText = correctCounter
            score2.innerText = correctCounter
        }
        else randomNumber.style.color = "#f61a1a"
    }

    isGenerated = false
    if(correctCounter === 16)
    {
        is_win = true;
        win()
        socket.emit('win', {});
    }
}


function win() {

    // button.disabled = true
    // is_win = true;
    // reloadButton.classList.remove('hidden')
    randomNumber.style.fontSize = "3rem"
    randomNumber.style.textAlign = "center"
    randomNumber.innerText = "You Won"
    randomNumber.style.color = "#00ee00"

}


socket.on('lose', () => {

    // button.disabled = true
    // // reloadButton.classList.remove('hidden')
    // randomNumber.style.fontSize = "3rem"
    // randomNumber.style.textAlign = "center"
    // randomNumber.innerText = "You Lose"
    // randomNumber.style.color = "#990000"
})



// function reloadFunction() {
//     // location.reload()
//     // reloadButton.classList.add('hidden')

//     document.getElementById('bingo-div').style.display = "none"
//     document.getElementById('lobby-div').style.display = ""
//     document.querySelector('.join-area').style.display = "none"
// }

function exitTheGame() {
    // window.location.href = "thanks.html"
    
    // no coming back...
    window.location.replace("/thanks");

    // document.getElementById('bingo-div').style.display = "none"
    // document.getElementById('lobby-div').style.display = "none"
    // document.querySelector('.join-area').style.display = ""
    // location.reload()
}