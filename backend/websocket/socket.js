const reviews = [];
let wss; // WebSocket server instance
const ws = require('ws');

function sendData(data){
    wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
            client.send(JSON.stringify(data));
        }
    });

}

// Create WebSocket server
const createWebSocketServer = (server) => {
    // wss =  new ws.WebSocketServer({ port: 8080 });
    wss = new ws.Server({ server });

    wss.on('connection', (ws) => {
        ws.on('message', (message) => {
        const review = JSON.parse(message);
        reviews.push(review);
        wss.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
            client.send(JSON.stringify(reviews));
            }
        });
        });
    });
};

module.exports = {
    createWebSocketServer,
    reviews,
    wss,
    sendData
}


