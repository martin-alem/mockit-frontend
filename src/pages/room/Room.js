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
import Code from "./../../components/icons/Code";
import CustomAlert from "./../../components/alert/Alert";
import Alert from "@mui/material/Alert";
import Question from "./../../components/question/Question";

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
  const [editorOpened, setEditorOpened] = React.useState(false);
  const [editorContent, setEditorContent] = React.useState("");
  const [connectionState, setConnectionState] = React.useState("");

  const [showAlert, setShowAlert] = React.useState({
    vertical: "top",
    horizontal: "center",
    duration: 6000,
    severity: "info",
    message: "Custom message",
    showAlert: false,
    setShowAlert: null,
  });

  React.useEffect(() => {
    const handleAsync = async () => {
      try {
        const url = `${process.env.REACT_APP_DOMAIN_MAIN}/api/v1/interview/${roomId}`;
        const method = "GET";
        const response = await httpAgent(url, method, {});
        if (!response.ok) {
          /**
           * If the url is not valid redirect to 404
           */
          props.history.push("/404");
        } else {
          const data = await response.json();
          const { question } = data.interview;
          await getCodingQuestion(question);

          await openAndUseMediaDevices();

          socket.current = io(`${process.env.REACT_APP_DOMAIN_MAIN}`);
          socket.current.emit("in-room", { roomId });
          socket.current.on("in-room", () => {
            initializeCall();
          });

          //listen for offers
          socket.current.on("sdp-offer", handleOffer);

          //listen for answers
          socket.current.on("sdp-answer", handleAnswer);

          //listen for ice-candidates
          socket.current.on("ice-candidate", handleIceCandidate);

          //listen for when other peer leaves
          socket.current.on("leave", leaveInterviewEvent);

          //listen for when other peer shares their screen
          socket.current.on("screen-shared", handleScreenSharedEvent);

          //listen for when other peer stops screen sharing
          socket.current.on("stop-screen-share", handleStopScreenShared);
        }
      } catch (error) {
        console.error(error);
      }
    };
    handleAsync();
    // eslint-disable-next-line
  }, []);

  /**
   * Gets the question that was selected for the interview
   * @param {String} questionID question id
   */
  const getCodingQuestion = async questionID => {
    try {
      const url = `${process.env.REACT_APP_DOMAIN_MAIN}/api/v1/question/${questionID}`;
      const method = "GET";

      const response = await httpAgent(url, method, {});
      if (response.ok) {
        const data = await response.json();
        const { content } = data.question;
        setEditorContent(content);
      } else {
        /**
         * You may want to show them an error of stop the interview
         */
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * This function will asynchronously request for the user's media devices and render them to the local video element
   * @returns {Promise<void>} Returns a promise with the value of the void if everything goes well. Otherwise the user is redirect back to lobby
   */
  const openAndUseMediaDevices = async () => {
    try {
      const constraints = {
        video: true,
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      localVideo.current.srcObject = stream;
      localStream.current = stream;
    } catch (error) {
      console.error(error);
      props.history.replace(`/mock-interview/lobby/${roomId}`);
    }
  };

  /**
   * Returns the configurations needed for the alert component
   * @param {string} message Display message
   * @param {string} severity error, info, warning or success
   * @returns {Object} Object with with alert configurations
   */
  const showAlertOptions = (message, severity) => {
    return {
      vertical: "top",
      horizontal: "center",
      duration: 6000,
      severity,
      message,
      showAlert: true,
      setShowAlert: setShowAlert,
    };
  };

  /**
   * This function is called when media streams are added to the RTCPeerConnection.
   * @returns {Promise<void>} Returns a promise with the value of the void if everything goes well.
   */
  const handleNegotiationNeededEvent = async () => {
    try {
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      const payload = {
        roomId: roomId,
        sdp: peerConnection.current.localDescription,
      };
      socket.current.emit("sdp-offer", payload);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * This function is called when the remote side sends an offer
   * @param {Object} offer SDP offer sent from the remote peer connection
   * @returns {Promise<void>} Returns a promise with the value of the void if everything goes well.
   */
  const handleOffer = async offer => {
    try {
      peerConnection.current = createPeerConnection();
      const desc = new RTCSessionDescription(offer.sdp);
      await peerConnection.current.setRemoteDescription(desc);
      senders.current = [];
      localStream.current.getTracks().forEach(track => {
        senders.current.push(peerConnection.current.addTrack(track, localStream.current));
      });
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      const payload = {
        roomId: roomId,
        sdp: peerConnection.current.localDescription,
      };
      socket.current.emit("sdp-answer", payload);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * This function is called when the sdp-answer event is emitted and handles the answer received
   * @param {Object} answer SDP answer sent from the remote peer after they have received the offer.
   * @returns {Promise<void>} Returns a promise with the value of the void if everything goes well.
   */
  const handleAnswer = async answer => {
    try {
      const desc = new RTCSessionDescription(answer.sdp);
      await peerConnection.current.setRemoteDescription(desc);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * This function is called when the ice-candidate event is emitted and adds the ice candidate info to peerConnection
   * @param {Object} candidate Ice candidate sent by the remote peer.
   */
  const handleIceCandidate = async candidate => {
    try {
      const iceCandidate = new RTCIceCandidate(candidate.candidate);
      peerConnection.current.addIceCandidate(iceCandidate);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * This function is called when we receive an ICE candidate and sends it to the other peer.
   * @param {Event} event
   */
  const handleIceCandidateEvent = event => {
    if (event.candidate) {
      const payload = {
        roomId: roomId,
        candidate: event.candidate,
      };
      socket.current.emit("ice-candidate", payload);
    }
  };

  /**
   * handling when we are receiving the remote streams
   * @param {Event} event
   */
  const handleTrackEvent = event => {
    try {
      remoteVideo.current.srcObject = event.streams[0];
    } catch (error) {
      console.error(error);
    }
  };

  const handleConnectionStateChangeEvent = () => {
    switch (peerConnection.current.connectionState) {
      case "new":
        setConnectionState("Connection state is new");
        break;
      case "connecting":
        setConnectionState("Establishing connection to remote peer");
        break;
      case "connected":
        setConnectionState("Connection established to remote peer");
        break;
      case "disconnected":
        setConnectionState("RTC PeerConnection disconnected");
        break;
      case "fail":
        setConnectionState("Connection to remote peer failed");
        break;
      case "close":
        setConnectionState("Connection closed");
        break;

      default:
        setConnectionState("Waiting for peer to establish initial connection");
    }
  };

  /**
   * Creates and returns a new RTCPeerConnection
   * @returns {RTCPeerConnection} returns a new RTCPeerConnection
   */
  const createPeerConnection = () => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
        {
          urls: "turn:numb.viagenie.ca",
          credential: "muazkh",
          username: "webrtc@live.com",
        },
      ],
    });

    peerConnection.onicecandidate = handleIceCandidateEvent;
    peerConnection.ontrack = handleTrackEvent;
    peerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
    peerConnection.onconnectionstatechange = handleConnectionStateChangeEvent;

    return peerConnection;
  };

  /**
   * Initializes the webRTC call when a peer emits the custom in-room event.
   */
  const initializeCall = () => {
    try {
      senders.current = [];
      peerConnection.current = createPeerConnection();
      localStream.current.getTracks().forEach(track => {
        senders.current.push(peerConnection.current.addTrack(track, localStream.current));
      });
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * This functions gracefully ends an RTCPeerConnection
   */
  const endRTCPeerConnection = () => {
    localVideo.current = null;
    remoteVideo.current = null;
    localStream.current = null;
    senders.current = null;
    mediaRecorder.current = null;
    recordStream.current = null;
    setVideoMuted(false);
    setAudioMuted(false);
    setScreenShared(false);
    setRecording(false);
    setShowAlert({
      vertical: "top",
      horizontal: "center",
      duration: 6000,
      severity: "info",
      message: "Custom message",
      showAlert: false,
      setShowAlert: null,
    });
    socket.current.close();
    peerConnection.current.close();
  };

  /**
   * This function is called when the custom leave event is fired.
   */
  const leaveInterviewEvent = () => {
    remoteVideo.current.srcObject = null;
    setShowAlert(showAlertOptions("Your peer was disconnected", "info"));
  };

  /**
   * This function is called when the user leaves the interview.
   * This function tries to clean up all resources as possible.
   */
  const handleLeaveInterview = () => {
    socket.current.emit("leave");
    endRTCPeerConnection();
    props.history.replace(`/mock-interview/lobby/${roomId}`);
  };

  /**
   * This function is called when the custom screen-shared event is emitted
   */
  const handleScreenSharedEvent = () => {
    setScreenShared(true);
    setShowAlert(showAlertOptions("Your peer is sharing their screen", "info"));
    localVideo.current.style.display = "none";
  };

  /**
   * This function is called when the custom stop-screen-share event is emitted
   */
  const handleStopScreenShared = () => {
    setScreenShared(false);
    setShowAlert(showAlertOptions("Your peer stop sharing their screen", "info"));
    localVideo.current.style.display = "block";
  };

  /**
   * Toggles the visibility of the video camera
   */
  const toggleVideo = () => {
    localStream.current.getTracks().forEach(track => {
      if (track.kind === "video") {
        const trackState = !track.enabled;
        track.enabled = trackState;
        setVideoMuted(!trackState);
      }
    });
  };

  /**
   * Toggles the audibility of the microphone
   */
  const toggleAudio = () => {
    localStream.current.getTracks().forEach(track => {
      if (track.kind === "audio") {
        const trackState = !track.enabled;
        track.enabled = trackState;
        setAudioMuted(!trackState);
      }
    });
  };

  /**
   * Gets the stream needed for screen sharing
   * @param {Objects} constraints used by getDisplayMedia
   * @returns {Promise<MediaStream>} returns a promise the resolves to a media stream
   */
  const getDisplayMediaDevice = async constraints => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      return stream;
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * function that handles the screen share functionality.
   */
  const shareScreen = async () => {
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

    try {
      if (peerConnection.current.connectionState === "connected") {
        const stream = await getDisplayMediaDevice(constraints);
        const shareStream = stream.getTracks()[0];
        recordStream.current = stream;
        const sender = senders.current.find(s => s.track.kind === "video");
        await sender.replaceTrack(shareStream);
        setScreenShared(true);
        socket.current.emit("screen-shared");
        shareStream.onended = () => {
          setScreenShared(false);
          socket.current.emit("stop-screen-share");
          senders.current.find(sender => sender.track.kind === "video").replaceTrack(localStream.current.getTracks()[1]);
        };
      } else {
        setShowAlert(showAlertOptions("Your are not connected to any peer currently", "info"));
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * This function will prepare the recorded stream and upload it to google drive.
   * @param {Array} recordedChunks an Array of binary chucks recorded
   */
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

  /**
   * This function is called when there is data is the sharedStream
   * @param {Event} event
   */
  const handleDataAvailable = event => {
    const recordedChunks = [];
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
      download(recordedChunks);
    }
  };

  /**
   * This function handles the Screen record functionality
   */
  const startScreenRecord = () => {
    try {
      if (recordStream.current) {
        const stream = recordStream.current;
        const options = { mimeType: "video/webm; codecs=vp9" };
        mediaRecorder.current = new MediaRecorder(stream, options);

        mediaRecorder.current.ondataavailable = handleDataAvailable;
        mediaRecorder.current.start();
        setRecording(true);
      } else {
        setShowAlert(showAlertOptions("Your can't record unless your a actively sharing your screen", "warning"));
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * function stop the screen recording
   */
  const stopScreenRecord = () => {
    mediaRecorder.current.stop();
    setRecording(false);
  };

  /**
   * This functions is called when the editor button is clicked
   */
  const openEditor = () => {
    localVideo.current.style.display = "none";
    remoteVideo.current.style.display = "none";
    setEditorOpened(true);
  };

  /**
   * This function is called when the close editor button is clicked
   */
  const closeEditor = () => {
    localVideo.current.style.display = "block";
    remoteVideo.current.style.display = "block";
    setEditorOpened(false);
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "black" }}>
      <Container maxWidth="xl" sx={{ width: "100%", height: "100vh", position: "relative" }}>
        <video id="clocalVideo" autoPlay ref={localVideo}></video>
        <video id="cremoteVideo" autoPlay ref={remoteVideo}></video>
        {editorOpened ? <Question question={editorContent} /> : null}
        <Box
          sx={{
            "& > :not(style)": {
              m: 2,
              cursor: "pointer",
            },
            textAlign: "center",
          }}
        >
          {!screenShared ? <MonitorShare onClick={shareScreen} sx={{ fontSize: 50 }} color="secondary" /> : null}

          {audioMuted ? (
            <MicOff onClick={toggleAudio} sx={{ fontSize: 50 }} color="secondary" />
          ) : (
            <Mic onClick={toggleAudio} sx={{ fontSize: 50 }} color="secondary" />
          )}

          <PhoneHangup onClick={handleLeaveInterview} color="error" sx={{ fontSize: 90 }} />
          {videoMuted ? (
            <VideoCamOff onClick={toggleVideo} sx={{ fontSize: 50 }} color="secondary" />
          ) : (
            <VideoCam onClick={toggleVideo} sx={{ fontSize: 50 }} color="secondary" />
          )}

          {!recording ? (
            <Record onClick={startScreenRecord} sx={{ fontSize: 50 }} color="secondary" />
          ) : (
            <Record onClick={stopScreenRecord} sx={{ fontSize: 50 }} color="error" />
          )}

          {!editorOpened ? (
            <Code onClick={openEditor} sx={{ fontSize: 50 }} color="secondary" />
          ) : (
            <Code onClick={closeEditor} sx={{ fontSize: 50 }} color="error" />
          )}
        </Box>
        <Alert variant="filled" severity="info">
          {connectionState === "" ? "Waiting for a peer to initialize connection" : connectionState}
        </Alert>
      </Container>
      <CustomAlert options={showAlert} />
    </Box>
  );
}

export default Room;
