import { useEffect, useRef, useState } from 'react';
import { Button, Typography, Box, Grid, Paper, Divider } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const servers = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

export default function VideoCard() {
  const signalingSocketRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [connected, setConnected] = useState(false);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const SOCKET_URL = `${process.env.REACT_APP_WS_URI}/webrtc`;
  const [statusMessages, setStatusMessages] = useState([]);

  const addStatusMessage = (message) => {
    setStatusMessages((prevMessages) => [...prevMessages, message]);
  };

  useEffect(() => {
    const socket = new WebSocket(SOCKET_URL);
    signalingSocketRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket connected');
      addStatusMessage('🔗 WebSocket connected.');
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
          addStatusMessage('📨 SDP offer received.');
          const answer = await peerConnectionRef.current.createAnswer();
          await peerConnectionRef.current.setLocalDescription(answer);
          signalingSocketRef.current.send(JSON.stringify(peerConnectionRef.current.localDescription));
          addStatusMessage('📤 SDP answer created and sent.');
        } else if (data.type === 'answer') {
          if (!peerConnectionRef.current) {
            console.error('PeerConnection is not established yet.');
            addStatusMessage('❌ Error: PeerConnection is not established yet.');
            return;
          }
          await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data));
          addStatusMessage('📥 SDP answer received and set.');
        } else if (data.type === 'candidate') {
          if (!peerConnectionRef.current) {
            console.error('PeerConnection is not established yet.');
            addStatusMessage('❌ Error: PeerConnection is not established yet.');
            return;
          }
          await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
          addStatusMessage('🔗 ICE candidate received and added.');
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
        addStatusMessage('⚠️ Error parsing signaling message.');
      }
    };

    socket.onclose = () => {
      console.log('WebSocket closed');
      addStatusMessage('🔌 WebSocket connection closed.');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      addStatusMessage('⚠️ WebSocket encountered an error.');
    };

    return () => {
      socket.close();
    };
  }, []);

  // init PeerConnection
  const initializePeerConnection = async () => {
    if (!peerConnectionRef.current) {
      peerConnectionRef.current = new RTCPeerConnection(servers);
      addStatusMessage('🛠️ PeerConnection initialized.');

      // Handle ICE candidates
      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate && signalingSocketRef.current.readyState === WebSocket.OPEN) {
          signalingSocketRef.current.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
          addStatusMessage('🔗 ICE candidate sent.');
        }
      };

      // Handle remote stream
      const remoteStream = new MediaStream();
      setRemoteStream(remoteStream);
      remoteVideoRef.current.srcObject = remoteStream;

      peerConnectionRef.current.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => remoteStream.addTrack(track));
        addStatusMessage('🎥 Remote track added to remote stream.');
      };

      // Handle connection state changes
      peerConnectionRef.current.onconnectionstatechange = () => {
        const state = peerConnectionRef.current.connectionState;
        console.log('ICE Connection State:', state);
        addStatusMessage(`🔄 ICE Connection State: ${state}`);

        if (
          state === 'disconnected' ||
          state === 'failed' ||
          state === 'closed'
        ) {
          console.log('Peer connection closed');
          addStatusMessage('🔌 Peer connection closed.');
          signalingSocketRef.current.close();
        }
      };

      // Add local tracks if already available
      if (localStream) {
        localStream.getTracks().forEach((track) => peerConnectionRef.current.addTrack(track, localStream));
        addStatusMessage('🎬 Local tracks added to peer connection.');
      }
    }
  };

  const startConnection = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Your browser does not support WebRTC.');
      addStatusMessage('❌ Error: Browser does not support WebRTC.');
      return;
    }

    try {
      setConnected(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      localVideoRef.current.srcObject = stream;
      addStatusMessage('🎥 Local media stream started.');


      await initializePeerConnection();

      stream.getTracks().forEach((track) => peerConnectionRef.current.addTrack(track, stream));
      addStatusMessage('🎬 Local tracks added to peer connection.');
    } catch (error) {
      // console.error('Error accessing media devices:', error);
      // alert('Could not access your camera/microphone. Please check permissions.');
      addStatusMessage('❌ Error accessing media devices.');
      // setConnected(false);
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
        addStatusMessage('📤 SDP offer created and sent.');
      } catch (error) {
        console.error('Error creating offer:', error);
        addStatusMessage('⚠️ Error creating SDP offer.');
      }
    } else {
      alert('WebSocket connection is not open or peer connection is not established.');
      addStatusMessage('❌ Error: WebSocket not open or PeerConnection not established.');
    }
  };

  const disconnet = () => {
    setConnected(false);
    // localStream.getTracks().forEach((track) => track.stop());
    localVideoRef && localVideoRef.current && localVideoRef.current.srcObject && localVideoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    remoteStream && remoteStream.getTracks().forEach((track) => track.stop());
    localStream && localStream.getTracks().forEach((track) => track.stop());
    localVideoRef.current.srcObject = null;
    peerConnectionRef.current.close();
    signalingSocketRef.current.close();
    addStatusMessage('🔌 Connection stopped.');
    setLocalStream(null);
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 4, maxWidth: '1200px', margin: 'auto' }}>
<Box sx={{ marginBottom: 4 }}>
  <Typography variant="h5" gutterBottom>
    WebRTC Tutorial: Establishing a Peer-to-Peer Connection
  </Typography>
  <Typography variant="body1" gutterBottom>
    This tutorial guides you through establishing a real-time video connection between two peers using WebRTC. Follow the steps below and observe the status messages to understand each part of the connection process.
  </Typography>
  <Typography variant="subtitle2" gutterBottom>
    <strong>Note:</strong> Make sure the two devices are on the same network. Also, ASU Network may block the connection and this won't work on ASU Network.
  </Typography>
  <Divider sx={{ marginY: 2 }} />
  <Typography variant="h6" gutterBottom>
    Steps:
  </Typography>
      <Typography variant="body1">
        <strong>1. Start connection:</strong> Allow the application to access your camera and microphone to capture local media streams.
      </Typography>
      <Typography variant="body1">
        <strong>2. Initiate Call:</strong> Create and send an SDP offer to the remote peer to start the peer-to-peer(P2P) connection.
      </Typography>
      <Typography variant="body1">
        <strong>3. Stream Media:</strong> Once the connection is established, video streams are transmitted between local and remote peers.
      </Typography>
</Box>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
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
          {!connected ? <Button variant="contained" color="primary" onClick={startConnection}>
            <PlayCircleOutlineIcon /> &nbsp;Start Connection
          </Button>: <Button variant="contained" color="error" onClick={disconnet}>
            <HighlightOffIcon /> &nbsp;Stop Connection
          </Button>}
          <Button variant="contained" color="success" onClick={createOffer}>
            📞 Call
          </Button>
        </Box>

        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6" gutterBottom>
            Status Messages:
          </Typography>
          <Box
            sx={{
              maxHeight: 200,
              overflowY: 'auto',
              backgroundColor: '#f5f5f5',
              padding: 2,
              borderRadius: '4px',
              border: '1px solid #ddd',
            }}
          >
            {statusMessages.length === 0 ? (
              <Typography variant="body2" color="textSecondary">
                No status messages yet. Start the connection to begin.
              </Typography>
            ) : (
              statusMessages.map((msg, index) => (
                <Typography key={index} variant="body2" sx={{ marginBottom: 1 }}>
                  {msg}
                </Typography>
              ))
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
