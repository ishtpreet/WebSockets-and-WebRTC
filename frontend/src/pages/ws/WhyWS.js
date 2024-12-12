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
          History of WebSockets and WebRTC
        </Typography>
        <Typography variant="body1" gutterBottom>
          The development of real-time web technologies has significantly
          transformed how applications handle instantaneous data exchange and
          communication. Two pivotal technologies in this domain are WebSockets
          and WebRTC, each with its unique history and standardization process.
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Stack spacing={3}>
          {/* WebSocket Section */}
          <Box>
            <Typography variant="h5" gutterBottom>
              WebSockets:
            </Typography>
            <Typography variant="body1" gutterBottom>
              WebSockets emerged as a solution to the limitations of traditional
              HTTP communication, which was primarily unidirectional and
              inefficient for real-time applications. The need for a protocol
              that enabled full-duplex, persistent connections between clients
              and servers became apparent with the rise of interactive web
              applications. WebSockets were first standardized by the Internet
              Engineering Task Force (IETF) in RFC 6455 in 2011 [2]. This
              protocol allows for continuous two-way communication over a single
              TCP connection, significantly reducing latency and resource usage
              compared to repeated HTTP requests.
            </Typography>
            <Typography variant="body1" gutterBottom>
              In addition to the IETF's role in formalizing the protocol, the
              World Wide Web Consortium (W3C) standardized the WebSocket API,
              ensuring seamless integration with web browsers and enabling
              developers to implement real-time features such as live chats,
              online gaming, collaborative editing, stock market updates, and
              live notifications efficiently.
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5" gutterBottom>
              WebRTC:
            </Typography>
            <Typography variant="body1" gutterBottom>
              WebRTC (Web Real-Time Communication), introduced by Google in [3],
              was designed to facilitate direct peer-to-peer communication
              between browsers[1], eliminating the need for plugins or
              intermediary servers. WebRTC relies on several key protocols,
              including ICE (Interactive Connectivity Establishment) for network
              traversal, STUN (Session Traversal Utilities for NAT) to discover
              the public-facing IP address, and TURN (Traversal Using Relays
              around NAT) to relay data when direct peer-to-peer communication
              is not possible.
            </Typography>
            <Typography variant="body1" gutterBottom>
              WebRTC was jointly standardized by the World Wide Web Consortium
              (W3C) and the Internet Engineering Task Force (IETF). The W3C
              focused on defining the JavaScript APIs and browser integration
              aspects, while the IETF developed the underlying transport
              protocols and security frameworks. This collaborative
              standardization has ensured that WebRTC remains interoperable
              across different platforms and browsers, promoting widespread
              adoption and fostering innovations in real-time communication . It
              supports low-latency, secure communication for audio, video, and
              arbitrary data, enabling applications such as video conferencing,
              live streaming, and real-time collaboration tools.
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Analytical Component */}
          <Box>
            <Typography variant="h5" gutterBottom>
              Analytical Component: Utility of WebSockets and WebRTC
            </Typography>
            <Typography variant="body1" gutterBottom>
              While analyzing WebSockets, we observe a key paradox: while
              WebSockets are designed for bidirectional communication, a
              significant portion of their real-world applications—like live
              sports scores, stock price updates, and real-time
              dashboards—primarily leverage unidirectional flows . These
              implementations essentially replicate what could be achieved with
              simpler, less resource-intensive technologies like Server-Sent
              Events (SSE).
            </Typography>
            <Typography variant="body1" gutterBottom>
              This underutilization of WebSockets’ true potential raises a
              critical question: are developers defaulting to WebSockets without
              fully considering their architectural needs? Using WebSockets for
              unidirectional tasks can result in unnecessary complexity and
              inefficiency, overshadowing the protocol's strengths .
            </Typography>
            <Typography variant="body1" gutterBottom>
              We argue that this trend not only highlights a lack of awareness
              about alternative protocols but also reflects an over-reliance on
              “one-size-fits-all” solutions in real-time web development. For
              applications that genuinely require bidirectional flows—such as
              chat apps, collaborative editing tools, and online
              gaming—WebSockets shine as an indispensable solution . However,
              for simpler unidirectional use cases, their implementation can be
              seen as overengineering.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Moving forward, we believe there is a pressing need for developers
              to adopt a more nuanced, use-case-driven approach to protocol
              selection. Leveraging WebSockets only when their bidirectional
              capabilities are genuinely required can lead to more efficient,
              maintainable, and purpose-built systems. Otherwise, we risk
              reducing a powerful protocol to a buzzword used out of convenience
              rather than necessity.
            </Typography>
            <Typography variant="body1" gutterBottom>
              In short, while WebSockets remain a groundbreaking protocol, their
              misuse for unidirectional applications underscores the importance
              of thoughtful technology adoption over defaulting to trends.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom>
              References
            </Typography>
            <ol>
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
            </ol>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
