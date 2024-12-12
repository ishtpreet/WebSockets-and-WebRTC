import React from "react";
import { Box, Paper, Typography, Divider, Stack } from "@mui/material";

export default function WhyWS() {
  return (
    <Box sx={{ padding: 2 }}>
      <Paper
        elevation={3}
        sx={{ padding: 4, maxWidth: "1200px", margin: "auto" }}
      >
        {/* Header Section */}
        <Typography variant="h4" gutterBottom>
          🌐 History of WebSockets and WebRTC
        </Typography>
        <Typography variant="body1" gutterBottom>
          WebSockets and WebRTC were developed to address the increasing demand
          for real-time communication capabilities on the web, overcoming the
          limitations of HTTP-based methods like polling and long polling.
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Stack spacing={3}>
          {/* WebSocket Section */}
          <Box>
            <Typography variant="h5" gutterBottom>
              WebSockets: Revolutionizing Real-Time Communication
            </Typography>
            <Typography variant="body1" gutterBottom>
              WebSockets were introduced as a solution for enabling full-duplex,
              persistent communication between a client and server. Standardized
              in RFC 6455 by the IETF in 2011, WebSockets addressed
              inefficiencies such as high latency and resource consumption. This
              technology allowed applications like real-time chat, online
              gaming, collaborative editing, stock market updates, and live
              notifications to become feasible and efficient.
            </Typography>
          </Box>

          {/* WebRTC Section */}
          <Box>
            <Typography variant="h5" gutterBottom>
              WebRTC: Enabling Peer-to-Peer Connections
            </Typography>
            <Typography variant="body1" gutterBottom>
              WebRTC (Web Real-Time Communication), introduced by Google in
              2011, was designed to facilitate direct peer-to-peer communication
              between browsers, eliminating the need for plugins or intermediary
              servers. WebRTC relies on several key protocols, including ICE
              (Interactive Connectivity Establishment) for network traversal,
              STUN (Session Traversal Utilities for NAT) to discover the
              public-facing IP address, and TURN (Traversal Using Relays around
              NAT) to relay data when direct peer-to-peer communication is not
              possible.
            </Typography>
            <Typography variant="body1" gutterBottom>
              WebRTC was standardized by the World Wide Web Consortium (W3C) and
              the Internet Engineering Task Force (IETF). It supports
              low-latency, secure communication for audio, video, and arbitrary
              data, enabling applications such as video conferencing, live
              streaming, and real-time collaboration tools.
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Analytical Component */}
          <Box>
            <Typography variant="h5" gutterBottom>
              🧠 Analytical Component: Utility of WebSockets and WebRTC
            </Typography>
            <Typography variant="body1" gutterBottom>
              WebSockets are an ideal solution for scenarios requiring
              continuous, bidirectional communication between a client and a
              server. Their utility lies in their ability to maintain persistent
              connections, drastically reducing the overhead associated with
              frequent HTTP requests. Examples of applications leveraging
              WebSockets include:
            </Typography>
            <ul>
              <li>
                <Typography variant="body1">
                  Live Chat and Customer Support Applications: Tools like
                  Discord, Slack, and WhatsApp Web use WebSockets to ensure
                  real-time message delivery.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Collaborative Editing Tools: Figma employs WebSockets to
                  synchronize changes made by users in real-time, enhancing
                  collaboration.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Real-Time Location Sharing: Applications like Uber use
                  WebSockets to share the live location of rides and riders.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Live Updates: Platforms like Twitch, YouTube Live Chat, and
                  sports score update services use WebSockets for low-latency
                  data transmission.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Interactive Voting and Surveys: WebSockets facilitate
                  immediate feedback in voting systems and polls.
                </Typography>
              </li>
            </ul>
            <Typography variant="body1" gutterBottom>
              WebSockets excel in applications requiring real-time
              interactivity, and their adoption continues to expand in
              industries like finance, gaming, and e-commerce.
            </Typography>
          </Box>

          <Box>
            <Typography variant="body1" gutterBottom>
              WebRTC, on the other hand, is tailored for scenarios requiring
              direct, peer-to-peer connections, particularly for media
              streaming. Its key strengths include:
            </Typography>
            <ul>
              <li>
                <Typography variant="body1">
                  Audio and Video Communication: Platforms like Skype, Google
                  Meet, and Microsoft Teams rely on WebRTC for seamless voice
                  and video calls.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Game Streaming: Services like Google Stadia use WebRTC to
                  deliver low-latency gameplay streams directly to users.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  IoT Devices: Applications include real-time video feeds from
                  IoT devices such as CCTV cameras and drones.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Emerging Technologies: WebRTC is expected to play a critical
                  role in technologies like augmented reality (AR), virtual
                  reality (VR), and the Internet of Things (IoT), where
                  low-latency, high-quality data transmission is vital.
                </Typography>
              </li>
            </ul>
          </Box>
          <Box>
            <Typography variant="h5" gutterBottom>
              References
            </Typography>
            <ol>
              <li>
                I. Fette and A. Melnikov, "The WebSocket Protocol," RFC 6455,
                Internet Engineering Task Force (IETF), Dec. 2011. [Online].
                Available:{" "}
                <a href="https://tools.ietf.org/html/rfc6455">
                  https://tools.ietf.org/html/rfc6455
                </a>
                .
              </li>
              <li>
                W3C, "WebRTC 1.0: Real-Time Communication Between Browsers,"
                World Wide Web Consortium. [Online]. Available:
                <a href="https://www.w3.org/TR/webrtc/">
                  https://www.w3.org/TR/webrtc/
                </a>
                .
              </li>
              <li>
                IETF, "WebRTC Overview," Internet Engineering Task Force (IETF).
                [Online]. Available:
                <a href="https://datatracker.ietf.org/doc/html/draft-ietf-rtcweb-overview">
                  https://datatracker.ietf.org/doc/html/draft-ietf-rtcweb-overview
                </a>
                .
              </li>
              <li>
                Google Developers, "WebRTC Introduction," WebRTC.org. [Online].
                Available: <a href="https://webrtc.org/">https://webrtc.org/</a>
                .
              </li>
              <li>
                Mozilla Developer Network (MDN), "Using WebSockets," Mozilla.
                [Online]. Available:
                <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API">
                  https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
                </a>
                .
              </li>
            </ol>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
