const Client = require("socket.io-client");
const clientSocket = new Client(`http://localhost:8083/api/socket.io`);
const { v4: uuidV4 } = require('uuid')

clientSocket.on("connect", () => {
	console.log('connect');
});

clientSocket.on("message", (e) => {
	console.log('message', e)

});
// clientSocket.join('room1')
clientSocket.send("i m fine, thank u, and u?");
clientSocket.send("how r u");

clientSocket.emit('join-room', `room1`, uuidV4())
clientSocket.on('user-connected', userId => {
	console.log(userId, ' user-connected');

})
clientSocket.on('user-disconnected', userId => {
	console.log(userId, ' user-disconnected');
})
