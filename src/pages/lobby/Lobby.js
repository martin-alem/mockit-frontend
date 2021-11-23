import React from "react";
import "./Lobby.css";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { io } from "socket.io-client";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
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
  const [interviewDetails, setInterviewDetails] = React.useState({});

  const { roomId } = props.match.params;
  const localVideo = React.useRef();

  React.useEffect(() => {
    const handleAsync = async () => {
      const url = `${process.env.REACT_APP_DOMAIN_MAIN}/api/v1/interview/${roomId}`;
      const method = "GET";
      const response = await httpAgent(url, method, {});
      if (!response.ok) {
        props.history.push("/404");
      } else {
        const data = await response.json();
        const interviewDetails = data.interview;
        setInterviewDetails(interviewDetails);
        const socket = io(`${process.env.REACT_APP_DOMAIN_MAIN}`);
        socket.emit("join-room", { roomId });
        playLocalVideo();
        getConnectedDevices("videoinput", setVideoCameras);
        getConnectedDevices("audioinput", setMicrophones);
      }
    };

    handleAsync();
    // eslint-disable-next-line
  }, []);

  const getConnectedDevices = (type, callback) => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const filtered = devices.filter(device => device.kind === type);
      callback(filtered);
    });
  };

  async function playLocalVideo() {
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
      localVideo.current.play();
    } catch (error) {
      setPermission(false);
      console.error("Error opening video camera.", error);
    }
  }
  return (
    <Container
      maxWidth="xl"
      sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "100vh" }}
    >
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: "primary.main",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={3}>
          <Grid item>
            <Box sx={{ mb: "20px", width: "500px", height: "300px" }}>
              {!permission ? (
                <>
                  <Alert variant="filled" severity="warning">
                    Hello! Please you must grant us access to your camera and microphone. You always have the option of muting
                    the video and audio once you in the interview at anytime.
                  </Alert>
                  <Alert variant="filled" severity="info" sx={{ mt: "20px" }}>
                    Hey! If you granted us permission and you are not able to see your video feed, make sure another software is
                    not currently using the camera or microphone
                  </Alert>
                </>
              ) : (
                <video id="localVideo" autoPlay muted ref={localVideo} />
              )}
            </Box>
            {permission ? (
              <Container
                maxWidth="xs"
                sx={{ padding: "30px", backgroundColor: "primary.contrastText", width: "100%", mb: "20px" }}
              >
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
          </Grid>
          <Grid item>
            <Box sx={{ mb: "40px", color: "primary.contrastText" }}>
              <Typography sx={{ color: "secondary.main" }} variant="h4">
                Mock Interview Lobby
              </Typography>
              <Typography variant="h6">Host: Mockit.org</Typography>
              <Typography variant="h6">Room: {interviewDetails["room"]}</Typography>
              <Typography variant="h6">Nickname: {interviewDetails["nickName"]}</Typography>
              <Typography variant="h6">Role: {interviewDetails["role"]}</Typography>
            </Box>
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
            <Box sx={{ mt: "40px" }}>
              <Alert severity="info">
                <AlertTitle>Info</AlertTitle>
                This is an info alert — <strong>check it out!</strong>
              </Alert>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

export default Lobby;
