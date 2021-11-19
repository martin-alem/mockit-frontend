import React from "react";
import "./Room.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { io } from "socket.io-client";
import { httpAgent } from "./../../util/util";

function Room(props) {
  const { roomId } = props.match.params;
  const localVideo = React.useRef();
  const remoteVideo = React.useRef();
  const peerConnection = React.useRef();
  const socket = React.useRef();
  const localStream = React.useRef();

  React.useEffect(() => {
    // we have to make sure the link is valid and has not expired
    // if everything goes well we connect to socket and create a room with the provided room id
    const url = `http://localhost:5000/api/v1/interview/${roomId}`;
    const method = "GET";
    httpAgent(url, method, {})
      .then(response => {
        if (!response.ok) {
          window.location.assign("/404");
        } else {
          navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
            localVideo.current.srcObject = stream;
            localStream.current = stream;

            socket.current = io("http://localhost:5000");
            socket.current.emit("create-room", { roomId });

            socket.current.on("friend-join", room => {
              initializeCall();
            });

            //listen for offers
            socket.current.on("sdp-offer", handleOffer);

            //listen for answers
            socket.current.on("sdp-answer", handleAnswer);

            //listen for ice-candidates
            socket.current.on("ice-candidate", handleIceCandidate);
          });
        }
      })
      .catch(error => console.log(error));
  }, []);

  const handleNegotiationNeededEvent = () => {
    peerConnection.current
      .createOffer()
      .then(offer => {
        return peerConnection.current.setLocalDescription(offer);
      })
      .then(() => {
        const payload = {
          roomId: roomId,
          sdp: peerConnection.current.localDescription,
        };
        socket.current.emit("sdp-offer", payload);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // handling when the other peer receives an offer
  const handleOffer = offer => {
    peerConnection.current = createPeerConnection();
    const desc = new RTCSessionDescription(offer.sdp);
    peerConnection.current.setRemoteDescription(desc).then(() => {
      localStream.current.getTracks().forEach(track => {
        peerConnection.current.addTrack(track, localStream.current);
      });
      return peerConnection.current
        .createAnswer()
        .then(answer => {
          return peerConnection.current.setLocalDescription(answer);
        })
        .then(() => {
          const payload = {
            roomId: roomId,
            sdp: peerConnection.current.localDescription,
          };

          socket.current.emit("sdp-answer", payload);
        });
    });
  };

  //handling when the initial peer receives an answer

  const handleAnswer = answer => {
    const desc = new RTCSessionDescription(answer.sdp);
    peerConnection.current.setRemoteDescription(desc).catch(error => console.log(error));
  };

  //handling when an ice candidate is received
  const handleIceCandidate = candidate => {
    const iceCandidate = new RTCIceCandidate(candidate.candidate);
    peerConnection.current.addIceCandidate(iceCandidate).catch(error => console.log(error));
  };

  //handling the ice candidate event
  const handleIceCandidateEvent = event => {
    if (event.candidate) {
      const payload = {
        roomId: roomId,
        candidate: event.candidate,
      };
      socket.current.emit("ice-candidate", payload);
    }
  };

  //handling when we are receiving the remote streams
  const handleTrackEvent = event => {
    remoteVideo.current.srcObject = event.streams[0];
  };

  const createPeerConnection = () => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
      ],
    });

    peerConnection.onicecandidate = handleIceCandidateEvent;
    peerConnection.ontrack = handleTrackEvent;
    peerConnection.onnegotiationneeded = handleNegotiationNeededEvent;

    return peerConnection;
  };

  const initializeCall = () => {
    peerConnection.current = createPeerConnection();
    localStream.current.getTracks().forEach(track => {
      peerConnection.current.addTrack(track, localStream.current);
    });
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "black" }}>
      <Container maxWidth="xl" sx={{ width: "100%", height: "100vh", position: "relative" }}>
        <video id="clocalVideo" autoPlay ref={localVideo} muted></video>
        <video id="cremoteVideo" autoPlay ref={remoteVideo} muted></video>
      </Container>
    </Box>
  );
}

export default Room;
