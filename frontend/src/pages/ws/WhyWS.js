import React from "react";

export default function WhyWS() {
  return (
    <div>
      <h1>History of Web-Socket and Web-RTC</h1>
      <p>
        WebSockets and WebRTC were introduced to address the growing need for
        real-time communication on the web, overcoming limitations of
        traditional HTTP and earlier technologies. WebSockets emerged as a
        solution for enabling full-duplex, persistent communication between a
        client and server, addressing inefficiencies like the high latency and
        resource consumption of techniques such as polling and long polling.
        Standardized in RFC 6455 in 2011, WebSockets opened the door for
        applications like real-time chat, gaming, and stock updates. On the
        other hand, WebRTC, introduced by Google in 2011, was designed to
        facilitate peer-to-peer communication directly between browsers,
        eliminating the need for plugins or intermediary servers. Leveraging
        protocols like ICE, STUN, and TURN, WebRTC supports secure, low-latency
        audio, video, and data sharing, ideal for applications such as video
        conferencing and file sharing. Together, these technologies
        revolutionized real-time interaction on the web, making it more
        seamless, efficient, and scalable.
      </p>
      <h2>Why Do we Need WebSockets</h2>
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
      <h3>Browser Support</h3>
      <p>
        <li>
          WebSockets are supported by most modern browsers including Chrome,
          Firefox, Safari, and Edge.
        </li>
        <li>
          This makes it easy to implement real time communication in web
          applications without worrying about browser compatibility issues.
        </li>
      </p>
    </div>
  );
}
