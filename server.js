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

    // res.sendFile(path.join(__dirname, 'client.html'));
    res.sendFile(path.join(__dirname, 'index.html'));

});


app.use('/socket.io', express.static(path.join(__dirname, 'node_modules/socket.io/client-dist')));


// new connections
let client = 0;
let ids = [];
let num = 0;

io.on('connection', (socket) => {

    client++;
    // p.set_no(client);
    // p.set_id(socket.id);
    ids.push(socket.id);

    console.log(`New client connected. Total clients: ${client}`);

    io.emit('client count: ', client);

    // socket.on('playerName', (playerName) => {

    //     console.log(`Message received: ${playerName}`);
    //     p.set_name(playerName);
    //     console.log(p);

    // });

    socket.on('disconnect', () => {

        client--;
        console.log(`Client disconnected. Total clients: ${client}`);
        io.emit('client', client);

    });


    // ```````````````````````````````````````````````````

    class Player
    {
        constructor()
        {
            this.no;
            this.id;
            this.name;
            this.point = 0;
            this.play = false;
        }

        set_no(no)
        {
            this.no = no;
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
            num++;
            plyr.set_no(num);
            plyr.set_id(sid);
            plyr.set_name(playerName);  
            console.log(plyr);

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

    game = new Game();
    // game.createPlayer();

    socket.on('playerName', (playerName) => {

        console.log(`Message received: ${playerName}`);
        game.createPlayer(socket.id, playerName);

    });

});



// server on port 3000
server.listen(3000, '0.0.0.0', () => {

    console.log('http://localhost:3000');

});


/**
 * io.emit -> to all clients
 * 
 * socket.emit -> to the client from whom data is received
 * socket.broadcast.emit -> to all the client except from whom data is received
 * 
 */