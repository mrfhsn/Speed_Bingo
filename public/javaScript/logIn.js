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

// All functions

function sendName()
{
    const playerName = inputName.value   
    message.innerText = `Welcome ${playerName}\nPlease wait...`;
    socket.emit('playerName', playerName);
}


// Connect to the server dynamically
const socket = io();

socket.on('clientCount', (count) => {
    console.log('Connected clients:', count);
});
