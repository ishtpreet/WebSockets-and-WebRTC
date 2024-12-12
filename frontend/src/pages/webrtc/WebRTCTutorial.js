import React, {useState} from 'react';
import { Box, Typography, Paper, Divider, Button, Snackbar, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const steps = [
  {
    title: '1. Setting Up WebRTC',
    description:
      'To start with WebRTC, you need to set up a basic React project and add the required components for accessing media streams, creating peer connections, and handling signaling. Below is the setup for your project:',
    code: `
import { useState, useRef, useEffect } from 'react';

const servers = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

export default function WebRTCApp() {
  const signalingSocketRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  // Your setup code will go here.
}
`,
  },
  {
    title: '2. Accessing Media Streams',
    description:
      'Access the user’s camera and microphone using the `navigator.mediaDevices.getUserMedia` API. The stream will be displayed in the local video element.',
    code: `
async function startConnection() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert('Your browser does not support WebRTC.');
    return;
  }

  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  setLocalStream(stream);
  localVideoRef.current.srcObject = stream;
}
`,
  },
  {
    title: '3. Initializing the Peer Connection',
    description:
      'Create a new `RTCPeerConnection` instance and set up event listeners for handling ICE candidates and media tracks. This step is crucial for enabling communication between peers.',
    code: `
async function initializePeerConnection() {
  if (!peerConnectionRef.current) {
    peerConnectionRef.current = new RTCPeerConnection(servers);

    peerConnectionRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        signalingSocketRef.current.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
      }
    };

    const remoteStream = new MediaStream();
    setRemoteStream(remoteStream);
    remoteVideoRef.current.srcObject = remoteStream;

    peerConnectionRef.current.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => remoteStream.addTrack(track));
    };
  }
}
`,
  },
  {
    title: '4. Creating an SDP Offer',
    description:
      'Use the peer connection to create an SDP offer. This offer is then sent to the signaling server to initiate the connection.',
    code: `
async function createOffer() {
  const offer = await peerConnectionRef.current.createOffer();
  await peerConnectionRef.current.setLocalDescription(offer);
  signalingSocketRef.current.send(JSON.stringify(peerConnectionRef.current.localDescription));
}
`,
  },
  {
    title: '5. Handling SDP Answers and ICE Candidates',
    description:
      'Once the remote peer responds with an SDP answer, set it as the remote description. Also, ensure you handle ICE candidates for seamless communication.',
    code: `
signalingSocketRef.current.onmessage = async (event) => {
  const data = JSON.parse(event.data);

  if (data.type === 'answer') {
    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data));
  } else if (data.type === 'candidate') {
    await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
  }
};
`,
  },
  {
    title: '6. Adding Tracks and Streaming Media',
    description:
      'Add the local media tracks to the peer connection, allowing the remote peer to receive and display the media streams.',
    code: `
localStream.getTracks().forEach((track) => peerConnectionRef.current.addTrack(track, localStream));
`,
  },
  {
    title: '7. Displaying Video Streams',
    description:
      'Bind the media streams to video elements in the DOM to display the local and remote video feeds.',
    code: `
<video ref={localVideoRef} autoPlay playsInline muted />
<video ref={remoteVideoRef} autoPlay playsInline />
`,
  },
];

function WebRTCTutorial() {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleCopy = (code) => {
      navigator.clipboard.writeText(code);
      setSnackbarMessage('Code copied to clipboard!');
      setSnackbarOpen(true);
    };

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
            📚 WebRTC Tutorial: Build a Peer-to-Peer Video Application
          </Typography>
          <Typography variant="body1" gutterBottom>
            This tutorial provides a step-by-step guide to implement WebRTC in your React application. Learn how to access media streams, establish peer connections, and exchange media between two users.
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
            💡 Tip: Try this code on your local environment by setting up a signaling server and testing between two different devices.
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
  
  export default WebRTCTutorial;