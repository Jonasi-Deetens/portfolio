import expressWs from 'express-ws';

let Wss;

const configureWebSocket = (app) => {
    const { getWss } = expressWs(app);
  
    app.ws('/ws', (ws, req) => {
      console.log('WebSocket connected');
  
      ws.on('message', (msg) => {
        console.log('Received message:', msg);
        ws.send(`You sent: ${msg}`);
      });
  
      ws.on('close', () => {
        console.log('WebSocket disconnected');
      });
    });
  
    Wss = getWss();
};

const sendMessageToClients = () => {
    if (Wss) {
        Wss.clients.forEach((client) => {
            if (client._readyState === client.OPEN) {
              client.send(JSON.stringify({ event: "update" }));
            }
        });
    }
}
  
export {
    configureWebSocket,
    sendMessageToClients
}