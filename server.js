const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


// all the static files -> css, js
app.use(express.static(path.join(__dirname, 'public')));


// client.html or index.html -> landing page
app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'index.html'));

});

app.get('/thanks', (req, res) => {

    res.sendFile(path.join(__dirname, 'public', 'thanks.html'));

});


app.use('/socket.io', express.static(path.join(__dirname, 'node_modules/socket.io/client-dist')));


// new connections
let client = 0;
let ids = [];
// let num = 0;

io.on('connection', (socket) => {

    client++;
    ids.push(socket.id);
    console.log(ids);

    console.log(`New client connected. Total clients: ${client}`);

    io.emit('client-count', client);


    socket.on('disconnect', () => {

        client--;
        // console.log("Disconnected: ", socket.id);

        for(let i=0; i<ids.length; i++)
        {
            if(ids[i] == socket.id)
            {
                delete ids[i];
                break;
            }
        }

        console.log(`Client disconnected. Total clients: ${client}`);
        // console.log(ids);        
        // io.emit('client-count', client);

    });


    // ```````````````````````````````````````````````````

    class Player
    {
        constructor()
        {
            this.host = false;
            this.id;
            this.name;
            this.point = 0;
            this.play = false;
        }

        set_host()
        {
            this.host = true;
        }

        set_id(id)
        {
            this.id = id;
        }

        set_name(name)
        {
            this.name = name;
        }

        point_add()
        {
            this.point++;
        }

        plays()
        {
            this.play = true;
        }

    }

    plyr = new Player();

    class Game
    {
        constructor()
        {
            this.players = [];
            this.start = false;
            this.win_player;
        }

        createPlayer(sid, playerName)
        {
            if(ids[0] === sid) plyr.set_host();
            plyr.set_id(sid);
            plyr.set_name(playerName);  
            // console.log(plyr);

            socket.emit('self-info', {
                info: plyr
            })

            this.players.push(plyr);
        }

        game_start()
        {
            this.start = true;
        }

        game_end()
        {
            this.start = false;
        }
    }

    const game = new Game();


    socket.on('playerName', (playerName) => {

        // console.log(`Message received: ${playerName}`);
        game.createPlayer(socket.id, playerName);

        console.log(game.players);
        
        io.emit('plyers-data', {
            data: game.players
        })

    });


    socket.on('game', () => {

        io.emit('to-game', {})
    })


    socket.on('random-start', () => {
        setTimeout(generate, 3000);
    })


    function generate()
    {
        let int = setInterval(() => {
            
            io.emit('random', {
                num: (Math.floor(Math.random() * 16) + 1)
            })

        }, 1400)

        socket.on('win', () => {
            
            clearInterval(int);
            socket.broadcast.emit('lose', {});
        })
    }

});



// server on port 3000
server.listen(3000, '0.0.0.0', () => {

    console.log('http://localhost:3000');

});

