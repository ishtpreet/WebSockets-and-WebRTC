import React from 'react';
import { Box, Typography, Paper, Divider, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const steps = [
  {
    title: '1. Clone the Starter Repo',
    description:
      'Start by cloning the GitHub starter repository to your local machine. This repo contains the basic setup for the WebSocket server and a simple HTML, CSS, and JavaScript frontend.',
    code: `
git clone https://github.com/ishtpreet/websocket-starter
cd websocket-starter
    `,
  },
  {
    title: '2. Install Server Dependencies',
    description:
      'Navigate to the server directory and install the required dependencies.',
    code: `
cd server
npm install
    `,
  },
  {
    title: '3. Run the WebSocket Server',
    description:
      'Start the WebSocket server by running the following command. The server will send a random Chuck Norris joke to connected clients every 3 seconds.',
    code: `
node index.js
    `,
  },
  {
    title: '4. Open the Frontend App',
    description:
      'Open the `index.html` file from the `frontend` folder in your browser to connect to the WebSocket server and display the jokes.',
    code: `
# Example command to open the file
open frontend/index.html
    `,
  },
  {
    title: '5. WebSocket Server Code',
    description:
      'Here is the WebSocket server code that sends random Chuck Norris jokes to connected clients.',
    code: `
const WebSocket = require('ws');
const fetch = require('node-fetch');

const CHUCK_NORRIS_API = 'https://api.chucknorris.io/jokes/random';
const PORT = 8080;

const wss = new WebSocket.Server({ port: PORT }, () => {
  console.log(\`WebSocket server running on ws://localhost:\${PORT}\`);
});

wss.on('connection', (ws) => {
  console.log('New client connected!');

  const sendJoke = async () => {
    try {
      const response = await fetch(CHUCK_NORRIS_API);
      const data = await response.json();
      ws.send(JSON.stringify({ joke: data.value }));
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
  };

  const jokeInterval = setInterval(sendJoke, 3000);

  ws.on('close', () => {
    console.log('Client disconnected.');
    clearInterval(jokeInterval);
  });
});
    `,
  },
  {
    title: '6. Frontend HTML and JavaScript Code',
    description:
      'Here is the code for the frontend application. It connects to the WebSocket server and displays the received jokes.',
    code: `
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chuck Norris Jokes</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      text-align: center;
      margin: 0;
      padding: 20px;
    }
    #joke-box {
      max-width: 600px;
      margin: 20px auto;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    h1 {
      font-size: 24px;
      color: #333;
    }
    p {
      font-size: 18px;
      color: #555;
    }
  </style>
</head>
<body>
  <h1>Chuck Norris Jokes</h1>
  <div id="joke-box">
    <p id="joke">Waiting for jokes...</p>
  </div>
  <script>
    const WS_URL = 'ws://localhost:8080';
    const jokeElement = document.getElementById('joke');

    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.joke) {
        jokeElement.textContent = data.joke;
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  </script>
</body>
</html>
    `,
  },
];


function WebSocketTutorial() {
    const handleCopy = (code) => {
      navigator.clipboard.writeText(code);
      alert('Code copied to clipboard!');
    };
  
    return (
      <Box sx={{ padding: 4 }}>
        <Paper elevation={3} sx={{ padding: 4, maxWidth: '800px', margin: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          📚 WebSocket Tutorial: Build a Real-Time Chuck Norris Joke App
        </Typography>
        <Typography variant="body1" gutterBottom>
          This tutorial provides a step-by-step guide to implement WebSocket in a simple HTML, CSS, and JavaScript application. Learn how to set up a WebSocket server and create a real-time joke application that fetches and displays Chuck Norris jokes every 3 seconds.
        </Typography>
          <Divider sx={{ my: 3 }} />
  
          {steps.map((step, index) => (
            <Box key={index} sx={{ marginBottom: 4 }}>
              <Typography variant="h5" gutterBottom>
                {step.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {step.description}
              </Typography>
              <Box
                sx={{
                  backgroundColor: '#f5f5f5',
                  padding: 2,
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  position: 'relative',
                  maxHeight: 250,
                  overflow: 'auto',
                  fontFamily: 'monospace',
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<ContentCopyIcon />}
                  onClick={() => handleCopy(step.code)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    zIndex: 10,
                    backgroundColor: 'white',
                  }}
                >
                  Copy
                </Button>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {step.code}
                </pre>
              </Box>
            </Box>
          ))}
  
          <Divider sx={{ my: 3 }} />
          <Typography variant="body2" color="textSecondary">
          💡 Tip: Try this code on your local environment by running the WebSocket server and opening the frontend in multiple browser tabs or devices to see the real-time jokes in action.
        </Typography>
        </Paper>
      </Box>
    );
  }
  
  export default WebSocketTutorial;