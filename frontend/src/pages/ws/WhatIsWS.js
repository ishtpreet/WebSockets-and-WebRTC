import React from "react";

export default function WhatIsWS() {
  return (
    <div>
      <h1>What is a Web Socket</h1>
      <h3>Definition</h3>
      <p>
        Websocket is a communication protocol that provides a full duplex,
        bidirectional communication protocol between a client and a server. A
        client (as in a a browser) and a server can communicate over a single
        long lived TCP connection. This method allows for real-time data
        transfer with low latency.
      </p>
      <h3>How does it work??</h3>
      <p>
        The bidirectional communicaiton in web sockets consists of two parts:
        The HTTP handshake and the web socket protocol. The HTTP handshake is a
        request-response protocol that allows for the client and server to
        establish a connection. The web socket protocol is a full duplex
        communication protocol that allows for the client and server to
        communicate over a single connection. The messages are sent in frames.
        The frames
      </p>
    </div>
  );
}
