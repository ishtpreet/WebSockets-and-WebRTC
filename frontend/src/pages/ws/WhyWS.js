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
      <h3>Our Opinion</h3>
      <p>
        We believe that websockets and webrtc are a good solution to the
        problems arising from constant back and forth message requests.
        Websockets are heavily used in places where there is a need of real time
        data transfer, for example: in live chat application or a customer
        support application. In these scenarios the connection is made via a
        socket connection and in theory a socket connection can be kept open for
        as long as we want. Websocket can also be used in other places like, it
        is used in figma to show changes made my other users in real time. It
        enables the collaboration feature in figma. Websockets are also used in
        real time location sharing and are being implemented by compnies like
        uber to share ride and riders locations. Other common place where web
        sockets are being used is in score updates or live news feeds. It is
        even used in getting people votes for various tasks. Some of the famous
        companies that have implemented websockets are discord, slack, whatsapp
        web, Twitch and Youtube live chat.
      </p>
      <p>
        WebRTC is used in places where we need peer to peer connection. It is
        primarily used in places where we need to exchange audio and video.
        Companies that use webRTC are Skype, Google Meet, Microsoft Teams. Other
        domain where WebRTC is used in IOT devices such as CCTV cameras. This is
        also used in Google's Stadia to stream games.
      </p>
    </div>
  );
}
