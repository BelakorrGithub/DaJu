'use strict';

$(function() {
    var width = 50,
        length = 50,
        canvas = document.getElementById('game_board'),
        context = canvas.getContext('2d'),
        url = 'https://daju.herokuapp.com/',
        socket = io(url),
        myId,
        playerColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);

    var keysPressed = {
        "39":false,
        "37":false,
        "38":false,
        "49":false,
    };

    socket.on('connect', function() {
        myId = socket.id;
    });

    socket.on('new user', function(new_player, players) {
        updateSquares(players);
    });

    socket.on('delete user', function(players) {
        updateSquares(players);
    });

    socket.on('moving', function(players) {
        updateSquares(players);
    });

    $(window).keyup(function(event){
        if(event.which === 39 || event.which === 37 || event.which === 38 || event.which === 40) {
            keysPressed[event.which]=false;
        }
    })

    $(window).keydown(function(event){
        var movement = {
                socket_id: myId,
                vel_x: 0,
                vel_y: 0
            };

            // right               left                    up                  down
        if(event.which === 39 || event.which === 37 || event.which === 38 || event.which === 40) {
            keysPressed[event.which]=true;
            moveSquare();
        }
    });

    function moveSquare(){
        var mov = {
                socket_id: myId,
                vel_x: 0,
                vel_y: 0
        };

        if (keysPressed['37']) mov.vel_x+=-5;
        if (keysPressed['38']) mov.vel_y+=-5;
        if (keysPressed['39']) mov.vel_x+=+5;
        if (keysPressed['40']) mov.vel_y+=+5;
        socket.emit('moving', mov);
    }

    function updateSquares(players) {
        context.clearRect(0,0,canvas.width,canvas.height);

        $.each(players, function(i, player) {
            context.beginPath();
            context.rect(player.pos.x, player.pos.y, width, length);
            if (player.id === myId) {
                context.fillStyle = playerColor;
                context.fill();
            } else {
                context.fillStyle = 'red';
                context.fill();
            }

            context.shadowColor = '#999';
            context.shadowBlur = 10;
            context.shadowOffsetX = 10;
            context.shadowOffsetY = 10;
            context.stroke();
            context.closePath();
        });
    }
});