// Connect to the server dynamically
const socket = io();
let ID;

socket.on('client-count', (count) => {
    // console.log('Connected clients:', count);
    // console.log(socket.id);
    ID = socket.id;
});


let self;

socket.on('self-info', (data) => {

    self = data.info;
    // console.log(self);
    
    if(!self.host)
    {
        // the join is button is hidden for other playres, only host can make that join
        joinGame.disabled = true;
        joinGame.hidden = true;
    }
})


// Element initialization
const joinButton = document.getElementById('join-button')
const message = document.getElementById('welcome-message')
const inputName = document.getElementById('entry-box')


// Action declaration

joinButton.addEventListener("click", sendName)

window.onload = defaultCursor
document.getElementById('lobby-div').style.display = "none"
document.getElementById('bingo-div').style.display = "none"

inputName.addEventListener("keypress", function (pressed) {
    if (pressed.key === 'Enter') sendName()
})


// All functions

function sendName()
{
    joinButton.disabled = true
    const playerName = inputName.value
    let spaceCounter = 0;

    for (let i = 0; i < playerName.length; i++) {
        if (playerName[i] === ' ') spaceCounter++
    }

    if (playerName.length !== 0 && spaceCounter < playerName.length)
    {
        message.innerText = `Welcome ${playerName}\nPlease wait...`
        setTimeout(() => {
            document.getElementById('lobby-div').style.display = ""
            document.getElementById('bingo-div').style.display = "none"
            document.querySelector('.join-area').style.display = "none"
        }, 1500)
    }

    socket.emit('playerName', playerName);
}

function defaultCursor() {
    inputName.focus()
}
