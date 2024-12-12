import React, {useState} from 'react';
import { Box, Typography, Paper, Divider, Button, Snackbar, Alert } from '@mui/material';
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
    title: '3. WebSocket Server Code',
    description:
      'Here is the WebSocket server code that sends random Chuck Norris jokes to connected clients.',
    code: `
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
    title: '4. Run the WebSocket Server',
    description:
      'Start the WebSocket server by running the following command. The server will send a random Chuck Norris joke to connected clients every 3 seconds.',
    code: `
npm start
    `,
  },
  {
    title: '5. JavaScript Code',
    description:
      'Here is the code for the frontend application. It connects to the WebSocket server and displays the received jokes.',
    code: `
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
    `,
  },
  {
    title: '6. Open the Frontend Application',
    description:
      'Open the `index.html` file from the `frontend` folder in your browser to connect to the WebSocket server and display the jokes.',
    code: `
    `,
    image: '/ws-tutorial.png',
  },
];


function WebSocketTutorial() {
    const handleCopy = (code) => {
      navigator.clipboard.writeText(code);
      setSnackbarMessage('Code copied to clipboard!');
      setSnackbarOpen(true);
    };

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
          return;
      }
      setSnackbarOpen(false);
  };
  
    return (
      <Box sx={{ padding: 2 }}>
        <Paper elevation={3} sx={{ padding: 4, maxWidth: '1200px', margin: 'auto' }}>
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
                {index !== 5 ? <><Button
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
                </pre></> : <img
                src={step.image}
                alt={`${step.title} illustration`}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />}
              </Box>
            </Box>
          ))}
  
          <Divider sx={{ my: 3 }} />
          <Typography variant="body2" color="textSecondary">
          💡 Tip: Try this code on your local environment by running the WebSocket server and opening the frontend in multiple browser tabs or devices to see the real-time jokes in action.
        </Typography>
        </Paper>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
              {snackbarMessage}
          </Alert>
      </Snackbar>
      </Box>
    );
  }
  
  export default WebSocketTutorial;