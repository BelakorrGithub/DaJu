'use strict';


$(function() {
    var width = 50,
        length = 50,
        url = 'localhost:3000',
        socket = io(url),
        myId = 1,
        playerColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);

    socket.on('connect', function() {
        myId = socket.id;
    });

    socket.on('new user', function(new_player, players) {
        //updateSquares(players);
    });

    socket.on('delete user', function(players) {
        //updateSquares(players);
    });

    socket.on('moving', function(players) {
        //updateSquares(players);
    });

    setInterval(movePlayer, 20);

    var keys = {}

    $(document).keydown(function(e) {
        keys[e.keyCode] = true;
    });

    $(document).keyup(function(e) {
        delete keys[e.keyCode];
    });

    function movePlayer() {
        for (var direction in keys) {
            if (!keys.hasOwnProperty(direction)) continue;
            if (direction == 37) {
                if (($("#player").position().left-5) >= 0) {
                    //socket.emit('moving', {left: "-=5"});
                    $("#player").animate({left: "-=5"}, 0);                
                }
            }
            if (direction == 38) {
                if (($("#player").position().top-5) >= 0) {
                    //socket.emit('moving', {top: "-=5"});
                    $("#player").animate({top: "-=5"}, 0);           
                }
            }
            if (direction == 39) {
                if (($("#player").position().left+5) <= 450) {
                    //socket.emit('moving', {left: "+=5"});
                    $("#player").animate({left: "+=5"}, 0);          
                }
            }
            if (direction == 40) {
                if (($("#player").position().top+5) <= 450) {
                    //socket.emit('moving', {top: "+=5"});
                    $("#player").animate({top: "+=5"}, 0);          
                }
            }
        }
    }
});