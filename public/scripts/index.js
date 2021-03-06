var socket = io();

document.addEventListener ("DOMContentLoaded", init, false);

function init () {
    document.getElementById("submitUsername").addEventListener ("click", setUsername, false);
}

function setUsername() {
    socket.emit ("setName", document.getElementById("usernameInput").value);
}

socket.on ("nameConfirmation", function (data) {
    console.log(data);
    $("#inputArea").fadeOut();
    window.setTimeout (function() {
        $("#inputArea").html("<button id='joinGameButton'>Join a game</button><br><button id='selectGameButton'>Select a Game</button><br><button id='createGameButton'>Create Game</button>");
        $("#inputArea").fadeIn();
        $("#joinGameButton").on("click", joinGameClick);
        $("#selectGameButton").on("click", selectGameClick);
        $("#createGameButton").on("click", createGameClick);
    }, 500);
});

socket.on ("welcomeToGame", function (data){
    console.log (data);
});

socket.on ("returnGame", function (data){
    // console.log ("Game ID: " + data[0] + "\nPlayers: " + data[1]);
    console.log ("Game ID: " + data);
});

function joinGameClick () {
    socket.emit ("gameSelect", "Join");
}

function selectGameClick () {
    socket.emit ("gameSelect", "Select");
}

function createGameClick () {
    socket.emit ("gameSelect", "Create");
}