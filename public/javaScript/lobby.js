let client_count;
let players = [];

socket.on('players-data', (data) => {

    players = data.data;
    // console.log(players); 

    if(ID === players[0].id)
    {
        joinGame.hidden = false;
    }

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


// ``````````````````````````


// id & class intialization

const leavePlayer = document.getElementById('leave-button')
const joinGame = document.getElementById('join-button-lobby')
const playerList = document.querySelector('.player-list')


// Declaring Actions

leavePlayer.addEventListener("click", playerTerminator)
joinGame.addEventListener("click", game)


//All Functions

function playerAdder() {

    playerList.innerHTML = "";  

    for(let i=0; i<players.length; i++)
    {
        const HTMLString = `<p id="player-serial${players[i].id}" class="players-name"> [${i+1}] ${players[i].name}</p>`;
        playerList.insertAdjacentHTML("beforeend", HTMLString)
    }
}

function playerTerminator()
{
    window.location.replace("/thanks");
}

// revision
let countDownEnded = false

function goToGame() {

    // button.disabled = true
    exitButton.disabled = true
    document.querySelector('.join-area').style.display = "none"
    document.getElementById('lobby-div').style.display = "none"
    document.getElementById('bingo-div').style.display = ""

    if(!countDownEnded) {
        let timeLeft = 4
    
        const countdownInterval = setInterval(() => {
            timeLeft -= 1
            randomNumber.textContent = `Starts in ${timeLeft}`;
    
            if (timeLeft <= 0) {
                clearInterval(countdownInterval)
                randomNumber.textContent = "GO!"
                // button.disabled = false
                exitButton.disabled = false
            }
        }, 1000)
    
        countDownEnded = true
    }
}