const WebSocket = require('ws');
const axios = require('axios');

const server = new WebSocket.Server({ port: 3001 });


const CHUCK_NORRIS_API = 'https://api.chucknorris.io/jokes/random';

const getChuckNorrisJoke = async () => {
  const response = await axios.get(CHUCK_NORRIS_API);
  return response.data.value;
}

server.on('connection', (socket) => {
  console.log('Client connected');

  socket.send('Welcome to the WebSocket server!');
  setInterval(async () => {
    const joke = await getChuckNorrisJoke();
    socket.send(joke);
  }
  , 3500);

  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);

    socket.send(`Server received: ${message}`);
    
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

