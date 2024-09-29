// Element initialization

const joinButton = document.getElementById('join-button')
const message = document.getElementById('welcome-message')
const inputName = document.getElementById('entry-box')


// Action declaration

joinButton.addEventListener("click", sendName)

window.onload = defaultCursor
document.getElementById('lobby-div').style.display = "none"
document.getElementById('bingo-div').style.display = "none"

inputName.addEventListener("keypress", function(pressed)
{
    if(pressed.key === 'Enter') sendName()
})


// All functions

function sendName() {
    joinButton.disabled = true
    const playerName = inputName.value
    let spaceCounter = 0;

    for(let i = 0; i < playerName.length; i++) {
        if(playerName[i] === ' ') spaceCounter++
    }
    if(playerName.length !== 0 && spaceCounter < playerName.length) {
        message.innerText = `Welcome ${playerName}\nPlease wait...`
        setTimeout(() => {
            document.getElementById('lobby-div').style.display = ""
            document.getElementById('bingo-div').style.display = "none"
            document.querySelector('.join-area').style.display = "none"
        }, 2500)
    }
    socket.emit('playerName', playerName);
}

function defaultCursor() {
    inputName.focus()
}


// Connect to the server dynamically
const socket = io();

socket.on('clientCount', (count) => {
    console.log('Connected clients:', count);
});