import React from "react";
import "./Lobby.css";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { io } from "socket.io-client";

function Lobby(props) {
  React.useEffect(() => {
    // we have to make sure the link is valid and has not expired
    // if everything goes well we connect to socket and create a room with the provided room id
    const socket = io("http://localhost:5000");
    const { roomId } = props.match.params;
    socket.emit("join-room", JSON.stringify({ room: roomId }));

    // request for video and audio feed
    playVideoFromCamera();
  }, []);

  async function playVideoFromCamera() {
    try {
      const constraints = { video: true, audio: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const videoElement = document.querySelector("video#localVideo");
      videoElement.srcObject = stream;
      videoElement.play();
    } catch (error) {
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
          <video id="localVideo" autoplay />
        </Box>
        <Stack sx={{ mt: "20px", width: "200px" }}>
          <Button variant="contained" color="secondary" sx={{ mb: "20px" }}>
            Join Interview
          </Button>
          <Button variant="contained" color="error">
            Cancel Interview
          </Button>
        </Stack>
      </Container>
    </Container>
  );
}

export default Lobby;
