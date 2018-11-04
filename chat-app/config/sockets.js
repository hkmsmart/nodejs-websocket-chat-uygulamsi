module.exports = function(io){
	var app    = require('express');
	var router = app.Router();
	io.on('connect', function(socket){
		console.log('yeni bağlanti');

		socket.send(JSON.stringify({
			type    : 'serverMessage', message : 'Sohbet Odasına Hoşgeldiniz', sender  : socket.id }));

		socket.on('message', function(message){
			message = JSON.parse(message);
			if(message.type == 'userMessage'){
				socket.broadcast.send(JSON.stringify(message));
				message.type = "myMessage";
				socket.send(JSON.stringify(message));
			}
		});
	});
}
