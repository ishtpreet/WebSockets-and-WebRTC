import React from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function WhatIsWS() {
  return (
    <Box sx={{ padding: 2 }}>
      <Paper
        elevation={3}
        sx={{ padding: 4, maxWidth: "1200px", margin: "auto" }}
      >
        {/* Header */}
        <Typography variant="h4" gutterBottom>
          🔍 How Does This Technology Work?
        </Typography>
        <Divider sx={{ my: 3 }} />

        {/* WebSocket Section */}
        <Box>
          <Typography variant="h5" gutterBottom>
            WebSocket: Establishing the Connection
          </Typography>
          <Typography variant="body1" gutterBottom>
            WebSocket establishes a socket connection through the following
            steps:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Handshake"
                secondary="Client makes an HTTP request to the server to upgrade the connection to WebSocket."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Upgrade Response"
                secondary='If the server supports WebSocket, it responds with a "101" status code, indicating a switch to WebSocket protocol.'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Connection Establishment"
                secondary="After a successful handshake, the connection is upgraded to WebSocket, operating over the same TCP/IP connection."
              />
            </ListItem>
          </List>
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom>
            How Does Data Transmission Occur?
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Bidirectional Communication"
                secondary="Over an open and persistent connection, both server and client can freely communicate without further requests or polling."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Message Framing"
                secondary={
                  <>
                    Data is transmitted as WebSocket messages, which are made up
                    of one or more frames. Each frame includes:
                    <List>
                      <ListItem>
                        <ListItemText
                          primary="FIN Bit"
                          secondary="Indicates if the frame is the final part of the fragment."
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Opcode"
                          secondary="Specifies how to interpret the payload data."
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Payload Length"
                          secondary="Indicates the size of the payload."
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Payload Data"
                          secondary="Contains the actual content being transmitted."
                        />
                      </ListItem>
                    </List>
                  </>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="WebSockets support both text and binary data formats." />
            </ListItem>
          </List>
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom>
            Closing the Connection
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Closure Initiation"
                secondary="Either the client or server can initiate the closure of the connection."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Connection Termination"
                secondary="Once closed, communication ends. A new connection must be established to resume communication."
              />
            </ListItem>
          </List>
          <img
            style={{ width: "50%", height: "auto" }}
            src="https://assets.gcore.pro/blog_containerizing_prod/uploads/2023/10/what-is-websocket-1.png"
            alt="WebSocket"
          />
          <p>
            *Image taken from -
            <a href="https://gcore.com/learning/what-is-websocket/">Here</a>
          </p>
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom>
            WebRTC: Direct Peer-to-Peer Communication
          </Typography>
          <Typography variant="body1" gutterBottom>
            WebRTC is a connection type that enables direct data transfer
            between web browsers or clients. It includes the following
            components:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="MediaStream (getUserMedia)"
                secondary="Accesses the user's audio and video devices."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="RTCPeerConnection"
                secondary="Handles audio and video communication."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="RTCDataChannel"
                secondary="Facilitates peer-to-peer exchange of arbitrary data."
              />
            </ListItem>
          </List>
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom>
            WebRTC Connection Establishment
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Signaling"
                secondary={
                  <>
                    Facilitates session creation and connection setup:
                    <List>
                      <ListItem>
                        <ListItemText
                          primary="Session Creation"
                          secondary="One peer offers to initiate the connection."
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Offer Exchange"
                          secondary="The offer is sent to the other peer via a signaling server."
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Answer Creation"
                          secondary="The other peer accepts the offer and sends back an answer."
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Signaling Server"
                          secondary="Acts as an intermediary to exchange session descriptions and network information."
                        />
                      </ListItem>
                    </List>
                  </>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="ICE (Interactive Connectivity Establishment)"
                secondary={
                  <>
                    Facilitates network traversal:
                    <List>
                      <ListItem>
                        <ListItemText
                          primary="Candidate Gathering"
                          secondary="Peers collect available connection methods (ICE candidates)."
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Candidate Exchange"
                          secondary="Peers exchange ICE candidates via the signaling server."
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Connectivity Checks"
                          secondary="Peers attempt to establish a direct connection."
                        />
                      </ListItem>
                    </List>
                  </>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="NAT Traversal"
                secondary={
                  <>
                    Overcomes network address translation:
                    <List>
                      <ListItem>
                        <ListItemText
                          primary="STUN"
                          secondary="Helps peers discover their public IP addresses and port mappings."
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="TURN"
                          secondary="Provides a fallback relay server when direct connections are not possible."
                        />
                      </ListItem>
                    </List>
                  </>
                }
              />
            </ListItem>
          </List>
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom>
            Media and Data Transfer
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Peer-to-Peer Communication"
                secondary="Audio, video, and data are transmitted directly between peers without going through a central server."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Real-Time Codecs"
                secondary="WebRTC uses efficient codecs like Opus for audio and VP8/VP9 for video to ensure high-quality, low-latency communication."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Data Channels"
                secondary="Allow the exchange of arbitrary data, enabling features like file sharing or game state synchronization."
              />
            </ListItem>
          </List>
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom>
            Security Measures
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Encryption"
                secondary="All WebRTC communications are encrypted using DTLS (Datagram Transport Layer Security) and SRTP (Secure Real-time Transport Protocol)."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Origin-Based Security"
                secondary="Browsers enforce same-origin policy for WebRTC applications."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="User Consent"
                secondary="Explicit user permission is required for accessing media devices."
              />
            </ListItem>
          </List>
          <img
            style={{ width: "50%", height: "auto" }}
            src="https://www.techtarget.com/rms/onlineimages/how_webrtc_works-f.png"
            alt="WebRTC"
          />
          <p>
            *Image taken from -{" "}
            <a href="https://www.techtarget.com/searchunifiedcommunications/definition/WebRTC-Web-Real-Time-Communications">
              Here
            </a>
          </p>
        </Box>
        <Box>
          <Typography variant="h5" gutterBottom>
            References
          </Typography>
          <li>
            “What are WebSockets used for? | Key use cases and who uses them
            today,” Ably Realtime, 2023.
            <a href="https://ably.com/topic/what-are-websockets-used-for">
              https://ably.com/topic/what-are-websockets-used-for
            </a>
          </li>
          <li>
            Adeyinka Adegbenro, “What is WebRTC? (Explanation, use cases, and
            features),” Ably Realtime, Mar. 31, 2022.
            <a href="https://ably.com/blog/what-is-webrtc">
              https://ably.com/blog/what-is-webrtc
            </a>
          </li>
          <li>
            “What Is WebSocket? How Does It Work? | Gcore,” Gcore, Nov. 26,
            2024.{" "}
            <a href="https://gcore.com/learning/what-is-websocket/">
              https://gcore.com/learning/what-is-websocket
            </a>
          </li>
          <li>
            M. E. Shacklett and S. Johnson, “WebRTC (Web Real-Time
            Communications),” Search Unified Communications, 2021.
            <a href="https://www.techtarget.com/searchunifiedcommunications/definition/WebRTC-Web-Real-Time-Communications">
              https://www.techtarget.com/searchunifiedcommunications/definition/WebRTC-Web-Real-Time-Communications
            </a>
          </li>
        </Box>
      </Paper>
    </Box>
  );
}
