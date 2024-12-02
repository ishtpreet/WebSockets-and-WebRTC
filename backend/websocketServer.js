const WebSocket = require('ws');
const axios = require('axios');

const CHUCK_NORRIS_API = 'https://api.chucknorris.io/jokes/random';

const getChuckNorrisJoke = async () => {
  const response = await axios.get(CHUCK_NORRIS_API);
  return response.data.value;
};

const startWebSocketServer = (port = 3001) => {
  const server = new WebSocket.Server({ port });

  server.on('connection', (socket) => {
    console.log('WebSocket Client connected');

    socket.send('Welcome to the WebSocket server!');
    setInterval(async () => {
      const joke = await getChuckNorrisJoke();
      socket.send(joke);
    }, 3500);

    socket.on('message', (message) => {
      console.log(`Received message: ${message}`);
      socket.send(`Server received: ${message}`);
    });

    socket.on('close', () => {
      console.log('WebSocket Client disconnected');
    });
  });

  console.log(`WebSocket server running on ws://localhost:${port}`);
};

module.exports = startWebSocketServer;
