import React from "react";
import "./Lobby.css";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { io } from "socket.io-client";
import Alert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { httpAgent } from "./../../util/util";

function Lobby(props) {
  const [videoSource, setVideoSource] = React.useState("");
  const [audioSource, setAudioSource] = React.useState("");

  const handleVideoSourceChange = event => {
    setVideoSource(event.target.value);
  };
  const handleAudioSourceChange = event => {
    setAudioSource(event.target.value);
  };

  const [videoCameras, setVideoCameras] = React.useState([]);
  const [microphones, setMicrophones] = React.useState([]);
  const [permission, setPermission] = React.useState(true);

  const { roomId } = props.match.params;
  const localVideo = React.useRef();

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
          const socket = io("http://localhost:5000");
          socket.emit("create-room", { roomId });
          playLocalVideo();
          getConnectedDevices("videoinput", setVideoCameras);
          getConnectedDevices("audioinput", setMicrophones);
        }
      })
      .catch(error => console.log(error));
  }, []);

  const getConnectedDevices = (type, callback) => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const filtered = devices.filter(device => device.kind === type);
      callback(filtered);
    });
  };

  async function playLocalVideo() {
    try {
      const constraints = { video: true, audio: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      localVideo.current.srcObject = stream;
      localVideo.current.play();
    } catch (error) {
      setPermission(false);
      console.error("Error opening video camera.", error);
    }
  }
  return (
    <Container
      maxWidth="md"
      sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "100vh" }}
    >
      <Typography variant="h4">Mock Interview Lobby</Typography>
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: "primary.main",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ mb: "20px", width: "500px", height: "300px" }}>
          {!permission ? (
            <>
              <Alert variant="filled" severity="warning">
                Hello! Please you must grant us access to your camera and microphone. You always have the option of muting the
                video and audio once you in the interview at anytime.
              </Alert>
              <Alert variant="filled" severity="info" sx={{ mt: "20px" }}>
                Hey! If you granted us permission and you are not able to see your video feed, make sure another software is not
                currently using the camera or microphone
              </Alert>
            </>
          ) : (
            <video id="localVideo" autoPlay muted ref={localVideo} />
          )}
        </Box>
        {permission ? (
          <Container maxWidth="xs" sx={{ padding: "30px", backgroundColor: "primary.contrastText", width: "100%", mb: "20px" }}>
            <Typography variant="h5">Video and Audio Source</Typography>
            <Box sx={{ width: "100%", mb: "20px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Video Source</InputLabel>
                <Select
                  color="secondary"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={videoSource}
                  label="Video Source"
                  onChange={handleVideoSourceChange}
                >
                  {videoCameras.map((video, index) => (
                    <MenuItem key={index} value={10}>
                      {video.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ width: "100%", mb: "20px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Audio Source</InputLabel>
                <Select
                  color="secondary"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={audioSource}
                  label="Audio Source"
                  onChange={handleAudioSourceChange}
                >
                  {microphones.map((audio, index) => (
                    <MenuItem key={index} value={10}>
                      {audio.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Container>
        ) : null}

        <Stack sx={{ mt: "20px", width: "200px" }}>
          {permission ? (
            <Button
              variant="contained"
              color="secondary"
              sx={{ mb: "20px" }}
              href={`/room/${roomId}`}
              endIcon={<ArrowForwardIcon />}
            >
              Join Interview
            </Button>
          ) : null}

          <Button variant="contained" color="error" href="/profile" startIcon={<CancelIcon />}>
            Cancel Interview
          </Button>
        </Stack>
      </Container>
    </Container>
  );
}

export default Lobby;
