let client_count;
let players;


socket.on('client-count', (count) => {

    client_count = count;
})

socket.on('plyers-data', (data) => {

    players = data.data;
    // console.log(players);
    // console.log(players[0].name);   

    playerAdder();
})

// join button clicked
function game()
{
    socket.emit('game', {})
    socket.emit('random-start', {});
}

socket.on('to-game', () => {

    goToGame();
})

// id & class intialization

const leavePlayer = document.getElementById('leave-button')
const joinGame = document.getElementById('join-button-lobby')
const playerList = document.querySelector('.player-list')


// Declaring Actions

leavePlayer.addEventListener("click", playerTerminator)
// joinGame.addEventListener("click", goToGame)
joinGame.addEventListener("click", game)


//All Functions

// let i = 0;

function playerAdder() {
    // const HTMLString = `<p id="player-serial${playerInfo[array[0]].serial}" class="players-name">${playerInfo[array[0]].serial}. ${playerInfo[array[0]].playerName} ${playerInfo[array[0]].serial}</p>`
    // i++;
    const HTMLString = `<p id="player-serial${players[0].id}" class="players-name"> -> ${players[0].name}</p>`;
    playerList.insertAdjacentHTML("beforeend", HTMLString)

}

function playerTerminator()
{
    const toBeRemoved = document.getElementById(`player-serial${ID}`)
    toBeRemoved.remove()
    out();
}

function out()
{
    document.querySelector('.join-area').style.display = ""
    document.getElementById('lobby-div').style.display = "none"
    document.getElementById('bingo-div').style.display = "none"
}

function goToGame() {

    button.disabled = true
    exitButton.disabled = true
    document.querySelector('.join-area').style.display = "none"
    document.getElementById('lobby-div').style.display = "none"
    document.getElementById('bingo-div').style.display = ""

    if(!countDownEnded) {
        let timeLeft = 4
    
        const countdownInterval = setInterval(() => {
            timeLeft -= 1
            randomNumber.textContent = timeLeft
    
            if (timeLeft <= 0) {
                clearInterval(countdownInterval)
                randomNumber.textContent = "GO!"
                // button.disabled = false
                exitButton.disabled = false

                // socket.emit('random-start', {});
            }
        }, 1000)
    
        countDownEnded = true
    }
}