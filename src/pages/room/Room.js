import React from "react";
import "./Room.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { io } from "socket.io-client";
import { httpAgent } from "./../../util/util";
import Mic from "./../../components/icons/Mic";
import MicOff from "./../../components/icons/MicOff";
import MonitorShare from "./../../components/icons/MonitorShare";
import PhoneHangup from "./../../components/icons/PhoneHangup";
import Record from "./../../components/icons/Record";
import VideoCam from "./../../components/icons/VideoCam";
import VideoCamOff from "./../../components/icons/VideoCamOff";

function Room(props) {
  const { roomId } = props.match.params;
  const localVideo = React.useRef();
  const remoteVideo = React.useRef();
  const peerConnection = React.useRef();
  const socket = React.useRef();
  const localStream = React.useRef();
  const senders = React.useRef([]);
  const mediaRecorder = React.useRef(null);
  const recordStream = React.useRef(null);
  const [videoMuted, setVideoMuted] = React.useState(false);
  const [audioMuted, setAudioMuted] = React.useState(false);
  const [screenShared, setScreenShared] = React.useState(false);
  const [recording, setRecording] = React.useState(false);

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

            //listen for when other peer leaves
            socket.current.on("leave", handleLeave);

            //listen for when other peer shares their screen
            socket.current.on( "screen-shared", handleScreenShared );
            
            //listen for when other peer stops screen shared
            socket.current.on( "stop-screen-share", handleStopScreenShared)
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
        senders.current.push(peerConnection.current.addTrack(track, localStream.current));
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
      senders.current.push(peerConnection.current.addTrack(track, localStream.current));
    });
  };

  const handleLeave = () => {
    remoteVideo.current.srcObject = null;
  };

  const leaveInterview = () => {
    socket.current.emit("leave");
    window.location.assign(`/mock-interview/lobby/${roomId}`);
  };

  const handleScreenShared = () => {
    setScreenShared(true);
  };

  const handleStopScreenShared = () =>
  {
    setScreenShared(false);
  }

  const muteVideo = () => {
    localStream.current.getTracks().forEach(track => {
      if (track.kind === "video") {
        const trackState = !track.enabled;
        track.enabled = trackState;
        setVideoMuted(!trackState);
      }
    });
  };

  const muteAudio = () => {
    localStream.current.getTracks().forEach(track => {
      if (track.kind === "audio") {
        const trackState = !track.enabled;
        track.enabled = trackState;
        setAudioMuted(!trackState);
      }
    });
  };

  const shareScreen = () => {
    const constraints = {
      video: {
        cursor: "always",
      },
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100,
      },
    };

    navigator.mediaDevices
      .getDisplayMedia(constraints)
      .then(stream => {
        const shareStream = stream.getTracks()[0];
        recordStream.current = stream;
        senders.current.find(sender => sender.track.kind === "video").replaceTrack(shareStream);
        setScreenShared(true);
        socket.current.emit("screen-shared");
        shareStream.onended = () => {
          setScreenShared(false);
          socket.current.emit("stop-screen-share");
          senders.current.find(sender => sender.track.kind === "video").replaceTrack(localStream.current.getTracks()[1]);
        };
      })
      .catch(error => console.log(error));
  };

  const download = recordedChunks => {
    const blob = new Blob(recordedChunks, {
      type: "video/webm",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "test.mp4";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDataAvailable = event => {
    const recordedChunks = [];
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
      download(recordedChunks);
    }
  };

  const startScreenRecord = () => {
    if (recordStream.current) {
      const stream = recordStream.current;
      const options = { mimeType: "video/webm; codecs=vp9" };
      mediaRecorder.current = new MediaRecorder(stream, options);

      mediaRecorder.current.ondataavailable = handleDataAvailable;
      mediaRecorder.current.start();
      setRecording(true);
    } else {
      console.log("You can only record streams that you sharing");
    }
  };

  const stopScreenRecord = () => {
    mediaRecorder.current.stop();
    setRecording(false);
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "black" }}>
      <Container maxWidth="xl" sx={{ width: "100%", height: "100vh", position: "relative" }}>
        <video id="clocalVideo" autoPlay ref={localVideo}></video>
        <video id="cremoteVideo" autoPlay ref={remoteVideo}></video>

        {/* <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: "40px" }}>
          <Button
            disabled={screenShared}
            onClick={shareScreen}
            variant="contained"
            color="secondary"
            startIcon={<ScreenShareIcon />}
          >
            share screen
          </Button>
          <Button
            onClick={muteAudio}
            variant="contained"
            startIcon={audioMuted ? <MicIcon /> : <MicOffIcon />}
            sx={{ marginLeft: "20px" }}
          >
            {audioMuted ? "unmute audio" : "mute audio"}
          </Button>
          <Button
            onClick={muteVideo}
            variant="contained"
            startIcon={videoMuted ? <VideocamIcon /> : <VideocamOffIcon />}
            sx={{ marginRight: "20px" }}
          >
            {videoMuted ? "unmute video" : "mute video"}
          </Button>
          {!recording ? (
            <Button onClick={startScreenRecord} variant="contained" color="secondary" startIcon={<FiberDvrIcon />}>
              Record screen
            </Button>
          ) : (
            <Button onClick={stopScreenRecord} variant="contained" color="error" startIcon={<FiberDvrIcon />}>
              End record
            </Button>
          )}
        </Box> */}
        <Box
          sx={{
            "& > :not(style)": {
              m: 2,
              cursor: "pointer",
            },
            textAlign: "center",
          }}
        >
          {!screenShared ? <MonitorShare onClick={shareScreen} sx={{ fontSize: 60 }} color="secondary" /> : null}

          {audioMuted ? (
            <MicOff onClick={muteAudio} sx={{ fontSize: 60 }} color="secondary" />
          ) : (
            <Mic onClick={muteAudio} sx={{ fontSize: 60 }} color="secondary" />
          )}

          <PhoneHangup onClick={leaveInterview} color="error" sx={{ fontSize: 90 }} />
          {videoMuted ? (
            <VideoCamOff onClick={muteVideo} sx={{ fontSize: 60 }} color="secondary" />
          ) : (
            <VideoCam onClick={muteVideo} sx={{ fontSize: 60 }} color="secondary" />
          )}

          {!recording ? <Record onClick={startScreenRecord} sx={{ fontSize: 60 }} color="secondary" /> : <Record onClick={stopScreenRecord} sx={{ fontSize: 60 }} color="error" />}
        </Box>
      </Container>
    </Box>
  );
}

export default Room;
