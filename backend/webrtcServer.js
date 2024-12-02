const WebSocket = require('ws');

// Start WebRTC signaling server
const startWebRTCServer = (port = 3002) => {
  const server = new WebSocket.Server({ port });
  const clients = new Set();

  server.on('connection', (socket) => {
    console.log('WebRTC Client connected');
    clients.add(socket);

    socket.on('message', (message) => {
      console.log(`Received WebRTC message: ${message}`);

      // Broadcast the signaling message to all "other" clients and not the one who initiated it
      clients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    socket.on('close', () => {
      clients.delete(socket);
      console.log('WebRTC Client disconnected');
    });
  });

  console.log(`WebRTC signaling server running on ws://localhost:${port}`);
};

module.exports = startWebRTCServer;
