import React from "react";
import { Box, Paper, Typography, Divider, List, ListItem, ListItemText, Link } from "@mui/material";

export default function Resources() {
  return (
    <Box sx={{ padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 4, maxWidth: '1200px', margin: 'auto' }}>
        {/* Header */}
        <Typography variant="h4" gutterBottom>
          Resources
        </Typography>
        <Typography variant="body1" gutterBottom>
          Explore a curated list of resources to deepen your understanding of WebSockets and WebRTC. These resources include articles, official documentation, tutorials, and videos to guide you through concepts, implementation, and advanced use cases.
        </Typography>
        <Divider sx={{ my: 3 }} />

        {/* Articles and Tutorials */}
        <Box>
          <Typography variant="h5" gutterBottom>
            Articles and Tutorials
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Introduction to WebSockets"
                secondary={
                  <Link href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" target="_blank" rel="noopener">
                    Mozilla Developer Network (MDN) - WebSocket API
                  </Link>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Understanding WebRTC"
                secondary={
                  <Link href="https://webrtc.org/getting-started/" target="_blank" rel="noopener">
                    WebRTC Official - Getting Started Guide
                  </Link>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Build a WebSocket Chat Application"
                secondary={
                  <Link href="https://www.tutorialspoint.com/websockets/index.htm" target="_blank" rel="noopener">
                    TutorialsPoint - WebSocket Basics and Application
                  </Link>
                }
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Videos */}
        <Box>
          <Typography variant="h5" gutterBottom>
            Videos
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="What is WebSocket?"
                secondary={
                  <Link href="https://www.youtube.com/watch?v=8XId-9oFdzc" target="_blank" rel="noopener">
                    YouTube - WebSocket Basics Explained
                  </Link>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="WebRTC Simplified"
                secondary={
                  <Link href="https://www.youtube.com/watch?v=DvlyzDZDEq4" target="_blank" rel="noopener">
                    YouTube - WebRTC Introduction and Use Cases
                  </Link>
                }
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Documentation */}
        <Box>
          <Typography variant="h5" gutterBottom>
            Official Documentation
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="WebSocket API Documentation"
                secondary={
                  <Link href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" target="_blank" rel="noopener">
                    MDN WebSocket Documentation
                  </Link>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="WebRTC Standard"
                secondary={
                  <Link href="https://www.w3.org/TR/webrtc/" target="_blank" rel="noopener">
                    W3C WebRTC Specification
                  </Link>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="WebRTC Samples"
                secondary={
                  <Link href="https://webrtc.github.io/samples/" target="_blank" rel="noopener">
                    WebRTC Sample Applications
                  </Link>
                }
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Additional Tools */}
        <Box>
          <Typography variant="h5" gutterBottom>
            Tools and Utilities
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="WebSocket Testing Tools"
                secondary={
                  <Link href="https://www.websocket.org/echo.html" target="_blank" rel="noopener">
                    WebSocket Echo Test
                  </Link>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="WebRTC Debugging Tools"
                secondary={
                  <Link href="https://test.webrtc.org/" target="_blank" rel="noopener">
                    WebRTC Troubleshooting and Test Page
                  </Link>
                }
              />
            </ListItem>
          </List>
        </Box>
      </Paper>
    </Box>
  );
}
