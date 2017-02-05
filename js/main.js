'use strict';


$(function() {
    var width = 50,
        length = 50,
        url = 'localhost:3000',
        socket = io(url),
        myId = 1,
        playerColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16),
        cooldown = false,
        explosionCounter = 1,
        explosionAudio = new Audio('sounds/explosion.mp3');

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
        console.log(players);
    });

    setInterval(movePlayer, 20);

    var keys = {}

    $(document).keydown(function(e) {
        keys[e.keyCode] = true;
    });

    $(document).keyup(function(e) {
        delete keys[e.keyCode];
    });

    function explode () {
       setTimeout(function () {
        $('#explosion').width(2 * explosionCounter+ 50);
        $('#explosion').height(2 * explosionCounter+ 50);
        $('#explosion').animate({left: "-=1"}, 0);
        $('#explosion').animate({top: "-=1"}, 0);
          explosionCounter++;
          if (explosionCounter < 30) {
             explode();
          } else {
            implode();
          }
       }, 1);
    }    

    function implode () {
       setTimeout(function () {
        $('#explosion').width(2 * explosionCounter+ 50);
        $('#explosion').height(2 * explosionCounter+ 50);
        $('#explosion').animate({left: "+=1"}, 0);
        $('#explosion').animate({top: "+=1"}, 0);
          explosionCounter--;
          if (explosionCounter > 0) {
             implode();
          } else {
            $('#explosion').remove();
          }
       }, 1);
    }

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
            if (direction == 32 && cooldown == false) {
                console.log("attack");
                cooldown = true;
                $('#explosionCD').css("background-color", "red");
                var img = $('<img id="explosion">');
                img.attr('src', 'img/explosion.png');
                img.css({
                    'height': '60px',
                    'width': '60px',
                    'position': 'absolute',
                    'left':     $('#player').position().left,
                    'top':      $('#player').position().top
                });                
                img.appendTo('#container');
                explosionCounter = 1;
                explosionAudio.play();
                explode();
                setTimeout(function(){ 
                    $('#explosionCD').css("background-color", "#20D40C");
                    cooldown = false; 
                }, 3000);
            }
        }
    }
});
