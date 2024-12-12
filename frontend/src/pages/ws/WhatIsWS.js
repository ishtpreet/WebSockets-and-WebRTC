import React from "react";

export default function WhatIsWS() {
  return (
    <div>
      <h1>How does this technology work?</h1>
      <p>Websocket establish a socket connection by following steps</p>
      <li>
        Handshake: Client makes a HTTP request to the server to upgrade the
        connection to websocket
      </li>
      <li>
        Upgrade Response: If the server supports websocket then it will respond
        with "101" code indicating a switch to websocket protocol.
      </li>
      <li>
        Connection Establishment: After the successful handshake, the conenction
        is upgraded to websocket, which operates over the same TCP/IP
        connection.
      </li>
      <p>How does Data Transmission occur?</p>
      <li>
        Bidirectional Communication: Over an open and persistent connection both
        server and client can freely communicate with each other without any
        further requests or polling.
      </li>
      <li>
        Message Framing: Here Data is transmitted as websocket messages. These
        messages are made up of one or more frame. Each frame will have
        <ol>
          <li>
            FIN bit: This will tell if the frame is the final bit in the
            fragment
          </li>
          <li>Op code: Tells how to interpret the payload data</li>
          <li>Payload Lenght: The lenght of the payload</li>
          <li>Payload data: The acutal content being transfered</li>
        </ol>
      </li>
      <li>Websockets support both text and binary data formats</li>
      <p>Closing the Connection</p>
      <li>
        Closure Initiation: Client or Server, either one of them can initate the
        closure of connection
      </li>
      <li>
        Connection Termination: Once closed the server and client engagement
        ends, and to communicate once again a new socket connection is needed.
      </li>
      <img
        style={{ width: "50%" }}
        src="https://assets.gcore.pro/blog_containerizing_prod/uploads/2023/10/what-is-websocket-1.png"
        alt="websocket"
      />
      <p>
        Working WebRTC: WebRTC is a connection type which enables direct data
        transfer between web browsers or clients. Components in WebRTC are
      </p>
      <li>
        MediaStream (getUserMedia): This gets access to users Audio and Video
      </li>
      <li>RTCPeerConnection: Handles Audio and Video Communication</li>
      <li>RTCDataChannel: Enables Peer to Peer exchange of arbitrary data</li>
      <p>Connection Establish in WebRTC includes the following steps:</p>
      <li>
        Signaling
        <ol>
          <li>
            Session Creation: One of the peer offers to initiate the connection
          </li>
          <li>
            Offer Exchange: The offer is sent to the other peer through a
            signaling server
          </li>
          <li>
            Answer Creation: The other peer accepts the offer and sends back an
            answer
          </li>
          <li>
            Signaling Server: Acts as an intermediary to exchange session
            descriptions and network information.
          </li>
        </ol>
      </li>
      <li>
        ICE (Interactive Connectivity Establishment)
        <ol>
          <li>
            Candidate Gathering: Each Peer collects ICE candidates (available
            connection methods)
          </li>
          <li>
            Candidate Exchange: Peers exchange their ICE candidates via the
            signaling server.
          </li>
        </ol>
      </li>
    </div>
  );
}
