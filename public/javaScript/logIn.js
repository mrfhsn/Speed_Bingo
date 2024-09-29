// Element initialization

const joinButton = document.getElementById('join-button')
const message = document.getElementById('welcome-message')
const inputName = document.getElementById('entry-box')

// Action declaration

joinButton.addEventListener("click", sendName)
inputName.addEventListener("keypress", function(pressed)
{
    if(pressed.key === 'Enter') sendName()
})
window.onload = defaultCursor

// All functions

function sendName()
{
    const playerName = inputName.value
    let spaceCounter = 0;

    for(let i = 0; i < playerName.length; i++) {
        if(playerName[i] === ' ') spaceCounter++
    }
    if(playerName.length !== 0 && spaceCounter < playerName.length) {
        message.innerText = `Welcome ${playerName}\nPlease wait...`
        setTimeout(() => {
            window.location.href = "lobby.html"
        }, 2500)
    }
    socket.emit('playerName', playerName);
}

function defaultCursor()
{
    inputName.focus()
}


// Connect to the server dynamically
const socket = io();

socket.on('clientCount', (count) => {
    console.log('Connected clients:', count);
});
