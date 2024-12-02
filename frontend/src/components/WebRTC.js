import { useEffect, useRef, useState } from 'react';
import { Button, Typography, Box, Grid, Paper } from '@mui/material';

const servers = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

export default function VideoCard() {
  const signalingSocketRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const SOCKET_URL = 'ws://localhost:3002';
  const [statusMessages, setStatusMessages] = useState([]);

  const addStatusMessage = (message) => {
    setStatusMessages((prevMessages) => [...prevMessages, message]);
  };

  useEffect(() => {
    const socket = new WebSocket(SOCKET_URL);
    signalingSocketRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket connected');
      addStatusMessage('WebSocket connected');
    };

    socket.onmessage = async (event) => {
      let messageData;
      if (event.data instanceof Blob) {
        messageData = await event.data.text();
      } else {
        messageData = event.data;
      }

      try {
        const data = JSON.parse(messageData);
        console.log('Received:', data);

        if (data.type === 'offer') {
          if (!peerConnectionRef.current) {
            await initializePeerConnection();
          }
          await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data));
          const answer = await peerConnectionRef.current.createAnswer();
          await peerConnectionRef.current.setLocalDescription(answer);
          signalingSocketRef.current.send(JSON.stringify(peerConnectionRef.current.localDescription));
          addStatusMessage('SDP offer received and answer sent.');
        } else if (data.type === 'answer') {
          if (!peerConnectionRef.current) {
            console.error('PeerConnection is not established yet.');
            return;
          }
          await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data));
          addStatusMessage('SDP answer received.');
        } else if (data.type === 'candidate') {
          if (!peerConnectionRef.current) {
            console.error('PeerConnection is not established yet.');
            return;
          }
          await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
          addStatusMessage('ICE candidate received and added.');
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket closed');
      addStatusMessage('WebSocket connection closed.');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      // addStatusMessage('WebSocket error.');
    };

    return () => {
      socket.close();
    };
  }, []);

  const initializePeerConnection = async () => {
    if (!peerConnectionRef.current) {
      peerConnectionRef.current = new RTCPeerConnection(servers);

      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate && signalingSocketRef.current.readyState === WebSocket.OPEN) {
          signalingSocketRef.current.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
          addStatusMessage('ICE candidate sent.');
        }
      };

      const remoteStream = new MediaStream();
      setRemoteStream(remoteStream);
      remoteVideoRef.current.srcObject = remoteStream;

      peerConnectionRef.current.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => remoteStream.addTrack(track));
      };

      peerConnectionRef.current.onconnectionstatechange = () => {
        if (
          peerConnectionRef.current.connectionState === 'disconnected' ||
          peerConnectionRef.current.connectionState === 'failed' ||
          peerConnectionRef.current.connectionState === 'closed'
        ) {
          console.log('Peer connection closed');
          signalingSocketRef.current.close();
          addStatusMessage('Peer connection closed.');
        }
      };

      if (localStream) {
        localStream.getTracks().forEach((track) => peerConnectionRef.current.addTrack(track, localStream));
        addStatusMessage('Local tracks added to peer connection.');
      }
    }
  };

  const startConnection = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Your browser does not support WebRTC.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      localVideoRef.current.srcObject = stream;
      addStatusMessage('Local media stream started.');

      await initializePeerConnection();

      stream.getTracks().forEach((track) => peerConnectionRef.current.addTrack(track, stream));
      addStatusMessage('Local tracks added to peer connection.');
    } catch (error) {
      console.error('Error accessing media devices:', error);
      alert('Could not access your camera/microphone. Please check permissions.');
      addStatusMessage('Error accessing media devices.');
    }
  };

  const createOffer = async () => {
    if (
      peerConnectionRef.current &&
      signalingSocketRef.current &&
      signalingSocketRef.current.readyState === WebSocket.OPEN
    ) {
      try {
        const offer = await peerConnectionRef.current.createOffer();
        await peerConnectionRef.current.setLocalDescription(offer);
        signalingSocketRef.current.send(JSON.stringify(peerConnectionRef.current.localDescription));
        addStatusMessage('SDP offer created and sent.');
      } catch (error) {
        console.error('Error creating offer:', error);
        addStatusMessage('Error creating SDP offer.');
      }
    } else {
      alert('WebSocket connection is not open or peer connection is not established.');
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, maxWidth: '800px', margin: 'auto' }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              style={{ width: '100%', borderRadius: '8px', border: '2px solid #1976d2' }}
            />
            <Typography variant="subtitle1" align="center" sx={{ marginTop: 1 }}>
              Local Video
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              style={{ width: '100%', borderRadius: '8px', border: '2px solid #1976d2' }}
            />
            <Typography variant="subtitle1" align="center" sx={{ marginTop: 1 }}>
              Remote Video
            </Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            marginTop: 4,
          }}
        >
          <Button variant="contained" color="primary" onClick={startConnection}>
            Start Connection
          </Button>
          <Button variant="contained" color="success" onClick={createOffer}>
            Call
          </Button>
        </Box>
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6" gutterBottom>
            Status Messages:
          </Typography>
          <Box sx={{ maxHeight: 200, overflowY: 'auto', backgroundColor: '#f5f5f5', padding: 2 }}>
            {statusMessages.map((msg, index) => (
              <Typography key={index} variant="body2" sx={{ marginBottom: 1 }}>
                {msg}
              </Typography>
            ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
