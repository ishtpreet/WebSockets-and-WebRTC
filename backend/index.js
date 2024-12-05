const startWebSocketServer = require('./websocketServer');
const startWebRTCServer = require('./webrtcServer');

const startServers = () => {
  // Start WebSocket server on port 3001
  startWebSocketServer(process.env.PORT || 3001);

  // Start WebRTC signaling server on port 3002
  startWebRTCServer(process.env.PORT || 3002);

  console.log('Both WebSocket and WebRTC servers are running');
};

startServers();
