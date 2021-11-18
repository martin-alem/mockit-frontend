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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { httpAgent } from "./../../util/util";

function Lobby(props) {
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
          // request for video and audio feed
          playVideoFromCamera();
        }
      })
      .catch(error => console.log(error));
  }, []);

  async function playVideoFromCamera() {
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
              <Alert variant="filled" severity="info" sx={{mt: "20px" }}>
                Hey! If you granted us permission and you are not able to see your video feed, make sure another software is not
                currently using the camera or microphone
              </Alert>
            </>
          ) : (
            <video id="localVideo" autoPlay muted ref={localVideo} />
          )}
        </Box>
        <Stack sx={{ mt: "20px", width: "200px" }}>
          {permission ? (
            <>
              <Button
                variant="contained"
                color="secondary"
                sx={{ mb: "20px" }}
                href={`/room/${roomId}`}
                endIcon={<ArrowForwardIcon />}
              >
                Join Interview
              </Button>
            </>
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
