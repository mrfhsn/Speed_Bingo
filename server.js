const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


// all the static files -> css, js
app.use(express.static(path.join(__dirname, 'public')));


// index.html -> landing page
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
let players = [];
let gen = false;

io.on('connection', (socket) => {

    client++;
    ids.push(socket.id);
    console.log(ids);

    console.log(`New client connected. Total clients: ${client}`);

    // io.emit('client-count', client);


    // ```````````````````````````````````````````````````

    class Player
    {
        constructor()
        {
            this.host = false;
            this.id;
            this.name;
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
    }

    // let plyr = new Player();

    class Game
    {
        constructor()
        {
            this.start = false;
            this.win_player;
        }

        createPlayer(sid, playerName)
        {
            let plyr = new Player();

            plyr.set_id(sid);
            plyr.set_name(playerName);  
            // console.log(plyr);

            socket.emit('self-info', {

                info: plyr
            })

            players.push(plyr);
        }

    }

    let game = new Game();


    // `````````````````````

    socket.on('playerName', (playerName) => {

        game.createPlayer(socket.id, playerName);

        // set the 1st player as host
        players[0].set_host();

        sendPlayerData();
    });


    function sendPlayerData()
    {
        // console.log(players);        
        io.emit('players-data', {

            data: players
        })
    }


    socket.on('game', () => {

        io.emit('to-game', {})
    })


    socket.on('random-start', () => {

        gen = true;
        setTimeout(generate, 5500);

    })


    // function generate()
    // {
    //     let int = setInterval(() => {
            
    //         io.emit('random', {
    //             num: (Math.floor(Math.random() * 16) + 1)
    //         })

    //     }, 1400)

    //     socket.on('win', () => {
            
    //         clearInterval(int);
    //         socket.broadcast.emit('lose', {});
    //     })
    // }


    function generate()
    {
        io.emit('random', {
            num: (Math.floor(Math.random() * 16) + 1)
        })

        if(gen) setTimeout(generate, 1400);
    }

    socket.on('win', () => {
            
        // clearInterval(int);
        gen = false
        socket.broadcast.emit('lose', {});
    })


    socket.on('disconnect', () => {

        client--;
        // console.log("Disconnected: ", socket.id);

        for(let i=0; i<ids.length; i++)
        {
            if(ids[i] == socket.id) delete ids[i];
            if(players[i])
            {
                if(players[i].id == socket.id) delete players[i];
            }
        }

        let t_ids = [];
        let t_players = [];
        for(let i=0; i<ids.length; i++)
        {
            if(ids[i]) t_ids.push(ids[i]);
            if(players[i]) t_players.push(players[i]);
        }

        ids = t_ids;
        players = t_players;

        // set the updated 1st player as host
        if(players[0]) players[0].set_host();

        console.log(`Client disconnected. Total clients: ${client}`);
        // console.log(ids);

        sendPlayerData();

    });

});



// server on port 3000
server.listen(3000, '0.0.0.0', () => {

    // console.log('http://localhost:3000');
    let ip = "10.29.163.158";
    // let ip = "192.168.202.66";
    console.log(`http://${ip}:3000`);

});

