import React from "react";
import { useState } from "react";
import { Box, Typography, Paper, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const HowWS = () => {

    const cloneRepoCode = `
    git clone https://github.com/ishtpreet/websocket-starter
    `
  const cloneRepoCodeTwo = `
import React from 'react';

function HelloWorld() {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
}

export default HelloWorld;
`;


const [snackbarOpen, setSnackbarOpen] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cloneRepoCode).then(
      () => {
        setSnackbarOpen(true);
      },
      (err) => {
        alert("Failed to copy: ", err);
      }
    );
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return; 
    }
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Code Snippet Example
      </Typography>
      <Typography variant="body1" paragraph>
        Below is an example of a simple React component that displays "Hello,
        World!". Feel free to copy, edit, and use it in your projects.
      </Typography>
      <Paper
        elevation={3}
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "800px",
          p: 2,
          mb: 2,
          bgcolor: "background.paper",
        }}
      >
        <Tooltip title="Copy to Clipboard" arrow>
          <IconButton
            onClick={copyToClipboard}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 2,
            }}
          >
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
        <SyntaxHighlighter language="bash" style={vscDarkPlus}>
          {cloneRepoCode}
        </SyntaxHighlighter>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "800px",
          p: 2,
          bgcolor: "background.paper",
        }}
      >
        <Tooltip title="Copy to Clipboard" arrow>
          <IconButton
            onClick={copyToClipboard}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 2,
            }}
          >
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
        <SyntaxHighlighter language="javascript" style={github}>
          {cloneRepoCodeTwo}
        </SyntaxHighlighter>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          Code copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HowWS;
