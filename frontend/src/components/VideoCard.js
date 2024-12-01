import { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';

const servers = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }; // STUN server for NAT traversal

export default function VideoCard() {
  const [signalingSocket, setSignalingSocket] = useState(null); // WebSocket signaling connection
  const [peerConnection, setPeerConnection] = useState(null); // RTCPeerConnection instance
  const [localStream, setLocalStream] = useState(null); // Local media stream
  const [remoteStream, setRemoteStream] = useState(null); // Remote media stream received from peer

  const localVideoRef = useRef(null); // Ref to local video element
  const remoteVideoRef = useRef(null); // Ref to remote video element

  useEffect(() => {
    // 1. Establish WebSocket connection
    const socket = new WebSocket('wss://fd28-2600-1011-a18f-181d-d43b-6200-e46f-edb0.ngrok-free.app'); // Update with correct backend URL
    const startTime = performance.now();

    setSignalingSocket(socket); // Store WebSocket instance

    socket.onopen = () => {
      // 2. WebSocket connected
      const endTime = performance.now();
      console.log(`2. WebSocket connection opened in ${endTime - startTime} ms`);
    };

    socket.onclose = () => {
      console.log('WebSocket closed. Attempting to reconnect...');
      setTimeout(() => {
        const newSocket = new WebSocket('wss://fd28-2600-1011-a18f-181d-d43b-6200-e46f-edb0.ngrok-free.app');
        setSignalingSocket(newSocket);
      }, 3000); // Retry after 3 seconds
    };
    
    socket.onmessage = async (event) => {
      // 6. Handle incoming messages via WebSocket
      console.log('6. Received message:', event.data);
      let messageData;

      // Check if the data is a Blob and convert it to text
      if (event.data instanceof Blob) {
        messageData = await event.data.text(); // Convert Blob to string
      } else {
        messageData = event.data; // Assume it's already a string
      }

      try {
        const data = JSON.parse(messageData); // Parse JSON if possible
        // console.log('Received:', data);

        if (data.type === 'offer') {
          // 7. Handle received SDP offer
          console.log('7. Received SDP offer:', data);
          await peerConnection.setRemoteDescription(new RTCSessionDescription(data)); // Set remote description
          const answer = await peerConnection.createAnswer(); // Create SDP answer
          await peerConnection.setLocalDescription(answer); // Set local description
          socket.send(JSON.stringify(peerConnection.localDescription)); // Send SDP answer
        } else if (data.type === 'answer') {
          // 8. Handle received SDP answer
          console.log('8. Received SDP answer:', data);
          await peerConnection.setRemoteDescription(new RTCSessionDescription(data));
        } else if (data.type === 'candidate') {
          // 9. Handle received ICE candidate
          console.log('9. Received ICE candidate:', data);
          await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    return () => {
      // Cleanup on component unmount
      console.log('11. WebSocket disconnected');
      socket.close(); // 11. Close WebSocket connection
    };
  }, []); // Effect runs whenever peerConnection changes

  const startConnection = async () => {
    // 3. Capture local media
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true }); // Read camera and microphone
    setLocalStream(stream);
    localVideoRef.current.srcObject = stream; // Display local video
    console.log('3. Displaying Local stream:', stream);

    const pc = new RTCPeerConnection(servers); // Create RTCPeerConnection
    setPeerConnection(pc);

    stream.getTracks().forEach((track) => pc.addTrack(track, stream)); // Add local A/V tracks to peer connection

    const remoteStream = new MediaStream();
    setRemoteStream(remoteStream);
    remoteVideoRef.current.srcObject = remoteStream; // Prepare to display remote video

    pc.ontrack = (event) => {
      // 10. Handle remote media streams
      console.log('10. Received remote stream:', event.streams[0]);
      event.streams[0].getTracks().forEach((track) => remoteStream.addTrack(track)); // Add remote tracks to remote stream
    };

    pc.onicecandidate = (event) => {
      // 5. Send ICE candidates via WebSocket
      if (event.candidate) {
        console.log('5. Sending ICE candidate:', event.candidate);
        signalingSocket.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
      }
    };
  };

  const createOffer = async () => {
    // 4. Create SDP offer
    console.log('4. Creating SDP offer');
    if (!signalingSocket || signalingSocket.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not open. Cannot send the offer.');
      alert('WebSocket connection is not ready. Please wait and try again.');
      return;
    }

    try {
      const offer = await peerConnection.createOffer(); // Create SDP offer
      await peerConnection.setLocalDescription(offer); // Set local description
      signalingSocket.send(JSON.stringify(peerConnection.localDescription)); // Send SDP offer
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  };

  return (
    <div>
      <h1>WebRTC</h1>
      {/* Local video feed */}
      <video ref={localVideoRef} autoPlay playsInline style={{ width: '300px' }}></video>
      {/* Remote video feed */}
      <video ref={remoteVideoRef} autoPlay playsInline style={{ width: '300px' }}></video>
      <br />
      <Button variant="contained" color="primary" onClick={startConnection}>
        Start Connection
      </Button>
      <br /><br />
      <Button variant="contained" color="primary" onClick={createOffer}>
        Call
      </Button>
    </div>
  );
}
