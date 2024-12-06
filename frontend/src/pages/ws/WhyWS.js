import React from "react";

export default function WhyWS() {
  return (
    <div>
      <h1>Why Do we Need WebSockets</h1>
      <h3>Efficient Real Time Communication</h3>
      <p>
        <li>
          Web Sockets provide a real time communication with <b>low latency</b>
          by maintaining a persistent connection between the client and the
          server.
        </li>
        <li>
          Unlike our traditional HTTP requests, WebSockets do not require the
          need to multiple hanshakes to establish a connection. This
          significantly reduces the badwidth usage and its load on server.
        </li>
      </p>
      <h3>Bi-Directional Communication</h3>
      <p>
        <li>
          WebSockets allow the server to send messages to the client without the
          client requesting it. This is known as <b>server push</b>.
        </li>
        <li>
          This is useful in scenarios where the server needs to send real time
          updates to the client without the client requesting it.
        </li>
      </p>
      <h3>Scalability</h3>
      <p>
        <li>
          WebSockets are designed to be <b>scalable</b> and can handle a large
          number of connections simultaneously.
        </li>
        <li>
          This makes it ideal for applications that require real time
          communication with a large number of clients.
        </li>
      </p>
      <h3>Support for Multiple Protocols</h3>
      <p>
        <li>
          WebSockets can be used with different protocols such as HTTP, HTTPS,
          and WSS.
        </li>
        <li>
          This makes it flexible and allows developers to choose the protocol
          that best suits their application requirements.
        </li>
      </p>
    </div>
  );
}
