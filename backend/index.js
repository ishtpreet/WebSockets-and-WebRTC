const http = require('http');
const WebSocket = require('ws');
const axios = require('axios');

const CHUCK_NORRIS_API = 'https://api.chucknorris.io/jokes/random';

const getChuckNorrisJoke = async () => {
  const response = await axios.get(CHUCK_NORRIS_API);
  return response.data.value;
};

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Shared WebSocket and WebRTC server is running!');
});

const wss = new WebSocket.Server({ noServer: true });

const webrtcClients = new Set();

wss.on('connection', (socket, request) => {
  const path = request.url;

  if (path === '/websocket') {
    console.log('WebSocket Client connected');
    socket.send('Welcome to the WebSocket server!');

    setInterval(async () => {
      const joke = await getChuckNorrisJoke();
      socket.send(joke);
    }, 3500);

    socket.on('message', (message) => {
      console.log(`WebSocket received message: ${message}`);
      socket.send(`Server received: ${message}`);
    });

    socket.on('close', () => {
      console.log('WebSocket Client disconnected');
    });

  } else if (path === '/webrtc') {
    console.log('WebRTC Client connected');
    webrtcClients.add(socket);

    socket.on('message', (message) => {
      console.log(`Received WebRTC message: ${message}`);
      webrtcClients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    socket.on('close', () => {
      webrtcClients.delete(socket);
      console.log('WebRTC Client disconnected');
    });
  } else {
    console.log('Unknown connection path:', path);
    socket.close();
  }
});

server.on('upgrade', (request, socket, head) => {
  const path = request.url;

  if (path === '/websocket' || path === '/webrtc') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`WebSocket endpoint: ws://localhost:${PORT}/websocket`);
  console.log(`WebRTC endpoint: ws://localhost:${PORT}/webrtc`);
});
