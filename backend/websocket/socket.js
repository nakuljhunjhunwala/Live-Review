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
    wss = new ws.Server({ server });

    wss.on('connection', (ws) => {
        console.log('Client connected');
        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
};

module.exports = {
    createWebSocketServer,
    wss,
    sendData
}


