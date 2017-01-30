'use strict';

(function() {


    var WIDTH = 50;
    var LENGTH = 50;

    var canvas = document.getElementById('game_board');
    var context = canvas.getContext('2d');

    var URL = "https://daju.herokuapp.com/";

    //var URL = "http://localhost:3000/";

    var socket = io(URL);
    var my_id = null;

    socket.on("connect",function(){
        my_id = socket.id;
    })


    socket.on("new user",function(new_player, players){
        // make same announcment
        updateSquares(players);
    })

    socket.on("delete user",function(players){
        // make same announcment
        updateSquares(players);
    })


    socket.on('moving', function(players){
        updateSquares(players);
    });


    $(window).keydown(function(event){

        var movement ={
            socket_id: my_id,
            vel_x:0,
            vel_y:0,
        }
        if(event.which == 39){ //right
            console.log("right ->")
            movement.vel_x = 20;
            socket.emit('moving',movement)
        }
        if(event.which == 37){ //left
            console.log("<- left")
            movement.vel_x = -20;
            socket.emit('moving',movement)
        }
        if(event.which == 38){ //up
            console.log("up ^")
            movement.vel_y = -20;
            socket.emit('moving',movement)
        }
        if(event.which == 40){ //down
            console.log("down \\/")
            movement.vel_y = 20;
            socket.emit('moving',movement)
        }

    })

    function updateSquares(players){
        context.clearRect(0,0,canvas.width,canvas.height)
        $.each(players,function(index,player){

            context.beginPath();
            context.rect(player.pos.x, player.pos.y, WIDTH, LENGTH);
            context.stroke();
            context.closePath();
        })
    }



})();
