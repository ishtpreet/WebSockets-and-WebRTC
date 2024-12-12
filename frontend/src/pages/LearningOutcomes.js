import React from "react";
import { Box, Paper, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

export default function LearningOutcomes() {
  return (
    <Box sx={{ padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 4, maxWidth: '1200px', margin: 'auto' }}>
        {/* Header */}
        <Typography variant="h4" gutterBottom>
          Learning Outcomes
        </Typography>
        <Typography variant="body1" gutterBottom>
          By the end of this tutorial, learners will have acquired comprehensive knowledge and practical skills to understand, analyze, and implement real-time communication technologies effectively.
        </Typography>
        <Divider sx={{ my: 3 }} />

        {/* Outcomes List */}
        <List>
          <ListItem>
            <ListItemText
              primary="LO1: Understand and Explain"
              secondary="Students will gain the ability to clearly explain the fundamental differences between WebSockets and WebRTC. This includes their specific use cases, the underlying protocols like TCP and ICE/STUN/TURN, and their capabilities for enabling real-time communication. Learners will also be equipped to discuss the benefits and challenges of these technologies. "
            />
          </ListItem>
          <p style={{marginLeft:"12px", fontSize:"15px", marginTop:"0px"}}>
            This LO aligns with Module 2 (How a Web Browser Works): Covers the execution of JavaScript in browsers, essential 
            for understanding WebSocket and WebRTC implementation.
          </p>
          <ListItem>
            <ListItemText
              primary="LO2: Analyze and Compare"
              secondary="Through practical examples, students will develop the skill to analyze and compare the advantages and limitations of WebSockets and WebRTC. They will learn how to evaluate these technologies in application scenarios such as live chat, collaborative tools, real-time dashboards, and media streaming, understanding where each technology excels."
            />
          </ListItem>
          
          <ListItem>
            <ListItemText
              primary="LO3: Apply Knowledge"
              secondary="Students will gain hands-on experience in setting up and implementing a basic WebSocket server and client. By building a practical application, such as a Chuck Norris joke app, they will understand the workflow of real-time communication and how to manage WebSocket events effectively."
            />
          </ListItem>
          <p style={{marginLeft:"12px", fontSize:"15px", marginTop:"0px"}}>
          This LO aligns with Module 5 (Server-side App Development): Focuses on developing server-side applications, relevant for the WebSocket server implementation.
          </p>
          <ListItem>
            <ListItemText
              primary="LO4: Design and Build"
              secondary="Learners will design and build a peer-to-peer video communication system using WebRTC. This project will cover the integration of essential components such as media streams, signaling servers for session negotiation, and NAT traversal protocols like STUN/TURN, showcasing how to handle real-time media transmission."
            />
          </ListItem>
          <p style={{marginLeft:"12px", fontSize:"15px", marginTop:"0px"}}>
          This LO aligns with Module 7 (Security and the Web): Addresses secure communication protocols like HTTPS/TLS, critical for WebRTC signaling and media transmission.
            </p>
          <ListItem>
            <ListItemText
              primary="LO5: Evaluate Solutions"
              secondary="By the end of the course, students will have the expertise to evaluate and select the most appropriate real-time communication technology for specific application needs. They will consider factors such as latency, scalability, ease of implementation, and support for media transmission to make informed decisions."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="LO6: Collaborative Problem-Solving"
              secondary="Students will gain insights into collaborative problem-solving by applying WebSockets and WebRTC to enable real-time features in team-based tools, enhancing their ability to design user-centric solutions for modern applications."
            />
          </ListItem>
          <p style={{marginLeft:"12px", fontSize:"15px", marginTop:"0px"}}>
          This LO aligns with Module 3 (Client-side Frameworks): Teaches component-based design in Vue, foundational for building real-time collaborative user interfaces.
            </p>
        </List>
      </Paper>
    </Box>
  );
}
