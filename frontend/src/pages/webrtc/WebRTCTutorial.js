import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const steps = [
  {
    title: "Clone the Starter Repo",
    description:
      "Start by cloning the GitHub starter repository to your local machine. This repo contains the basic setup for the WebRTC signaling server and a simple HTML, CSS, and JavaScript frontend.",
    code: `
git clone https://github.com/dpate258/webrtc-starter
cd webrtc-starter
    `,
  },
  {
    title: "Install Server Dependencies",
    description:
      "Navigate to the backend directory and install the required dependencies.",
    code: `
cd backend
npm install
    `,
  },
  {
    title: 'WebRTC Server Code',
    description:
      'Here is the WebRTC signaling server code that receives signaling messages and broadcasts them to other clients. Paste the below code in "backend/index.js"',
    code: `
  const port = 3001;
  const server = new WebSocket.Server({ port });
  const clients = new Set();

  server.on('connection', (socket) => {
    console.log('WebRTC Client connected');
    clients.add(socket);

    socket.on('message', (message) => {
      console.log(\`Received WebRTC message: \${message}\`);

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

  console.log(\`WebRTC signaling server running on ws://localhost:\${port}\`);    `,
  },
  {
    title: 'Run the WebRTC Server',
    description:
      'Make sure you are in the backend/ directory, then start the WebRTC server by running the following command.',
    code: `cd backend
npm start
    `,
  },
  {
    title: "Websocket frontend code - (a)",
    description:
      "To start with WebRTC, you need to complete your basic html file. We start with initializing the basic variables. Paste the code below in your frontend/index.html file in your your 'script' tag.",
    code: `
const SOCKET_URL = "ws://localhost:3001";
const servers = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

const localVideo = document.getElementById("local-video");
const remoteVideo = document.getElementById("remote-video");

let signalingSocket = null;
let peerConnection = null;
let localStream = null;
`,
  },
  {
    title: "Websocket frontend code - (b)",
    description:
      "Initializes the WebSocket connection for signaling. Sets up event handlers for connection, messages, and closure. Paste the code below the corresponding comment for initWebSocket() .",
    code: `
function initWebSocket() {
  signalingSocket = new WebSocket(SOCKET_URL);
  const pendingCandidates = [];

  signalingSocket.onopen = () => {
    console.log("WebSocket connected");
  };

  signalingSocket.onmessage = async (event) => {
    try {
      const data =
        typeof event.data === "string"
          ? JSON.parse(event.data)
          : await event.data.text().then(JSON.parse);

      console.log("Received:", data);

      if (data.type === "offer") {
        await handleRemoteOffer(data);
      } else if (data.type === "answer") {
        await handleRemoteAnswer(data);
      } else if (data.type === "candidate") {
        await handleRemoteCandidate(data.candidate);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  };

  signalingSocket.onclose = () => {
    console.log("WebSocket disconnected");
  };
}
`,
  },
  {
    title: "Websocket frontend code - (c)",
    description:
      "Initiates the local media stream by accessing user's camera and microphone. Connects to the WebSocket if not already connected. Paste the code below the corresponding comment for startConnection()",
    code: `
async function startConnection() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    localVideo.srcObject = localStream;
    console.log("Local stream started");

    if (!signalingSocket || signalingSocket.readyState !== WebSocket.OPEN) {
      initWebSocket();
    }
  } catch (error) {
    console.error("Error starting connection:", error);
  }
}
`,
  },
  {
    title: "Websocket frontend code - (d)",
    description:
      "Creates a WebRTC offer to initiate a peer connection. Sets up local media tracks and ICE candidate handling. Paste the code below the corresponding comment for createOffer()",
    code: `
async function createOffer() {
  if (!localStream) {
    alert("Please start connection first");
    return;
  }

  try {
    peerConnection = new RTCPeerConnection(servers);

    peerConnection.ontrack = (event) => {
      const remoteStream = new MediaStream();
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
      remoteVideo.srcObject = remoteStream;
      console.log("Remote stream received");
    };

    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        signalingSocket.send(
          JSON.stringify({
            type: "candidate",
            candidate: event.candidate,
          })
        );
      }
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    signalingSocket.send(
      JSON.stringify({
        type: "offer",
        ...peerConnection.localDescription.toJSON(),
      })
    );

    console.log("Offer created and sent");
  } catch (error) {
    console.error("Error creating offer:", error);
  }
}

`,
  },
  {
    title: "Websocket frontend code - (e)",
    description:
      "Handles an incoming WebRTC offer from a remote peer. Creates a peer connection, sets remote description, and sends an answer. Paste the code below the corresponding comment for handleRemoteOffer()",
    code: `
async function handleRemoteOffer(offer) {
  try {
    peerConnection = new RTCPeerConnection(servers);

    peerConnection.ontrack = (event) => {
      const remoteStream = new MediaStream();
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
      remoteVideo.srcObject = remoteStream;
      console.log("Remote stream received");
    };

    if (localStream) {
      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });
    }

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        signalingSocket.send(
          JSON.stringify({
            type: "candidate",
            candidate: event.candidate,
          })
        );
      }
    };

    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    signalingSocket.send(
      JSON.stringify({
        type: "answer",
        ...peerConnection.localDescription.toJSON(),
      })
    );

    console.log("Received offer, sent answer");
  } catch (error) {
    console.error("Error handling remote offer:", error);
  }
}

`,
  },
  {
    title: "Websocket frontend code - (f)",
    description:
      "Handles an incoming WebRTC 'answer' from the remote peer. Sets the remote description to complete the peer connection setup. Paste the code below the corresponding comment for handleRemoteAnswer()",
    code: `
async function handleRemoteAnswer(answer) {
  if (!peerConnection) {
    console.error("No peer connection");
    return;
  }

  try {
    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
    console.log("Remote answer received");
  } catch (error) {
    console.error("Error setting remote description:", error);
  }
}
`,
  },
  {
    title: "Websocket frontend code - (g)",
    description:
      "Handles incoming 'ICE candidates' from the remote peer. Adds candidates to the peer connection to establish the most efficient connection path. Paste the code below the corresponding comment for handleRemoteCandidate()",
    code: `
async function handleRemoteCandidate(candidate) {
  if (!peerConnection) {
    console.error("No peer connection");
    return;
  }

  try {
    if (peerConnection.remoteDescription) {
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      console.log("ICE candidate added");
    } else {
      console.warn("Remote description not set, candidate queued");
    }
  } catch (error) {
    console.error("Error adding ICE candidate:", error);
  }
}
`,
  },
  {
    title: "Open the Frontend Application",
    description:
      "Open the `index.html` file from the `frontend` folder in your browser to connect to the WebRTC server.(Scroll down to see the image)",
    code: `
    `,
    image: "/webrtc-tutorial.png",
  },
];

function WebRTCTutorial() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setSnackbarMessage("Code copied to clipboard!");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Paper
        elevation={3}
        sx={{ padding: 4, maxWidth: "1200px", margin: "auto" }}
      >
        <Typography variant="h4" gutterBottom>
          WebRTC Tutorial: Build a Peer-to-Peer Video Application
        </Typography>
        <Typography variant="body1" gutterBottom>
          This tutorial provides a step-by-step guide to implement WebRTC in
          your React application. Learn how to access media streams, establish
          peer connections, and exchange media between two users.
        </Typography>
        <Divider sx={{ my: 3 }} />

        {steps.map((step, index) => (
          <Box key={index} sx={{ marginBottom: 4 }}>
            <Typography variant="h5" gutterBottom>
              {index+1}. {step.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {step.description}
            </Typography>
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                padding: 2,
                borderRadius: "4px",
                border: "1px solid #ddd",
                position: "relative",
                maxHeight: 580,
                overflow: "auto",
                fontFamily: "monospace",
              }}
            >
              {index !== 11 ? 
              <><Button
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
          💡 Tip: Try this code on your local environment by setting up a
          signaling server and testing between two different devices.
        </Typography>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default WebRTCTutorial;
