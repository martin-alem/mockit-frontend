import React from "react";
import Box from "@mui/material/Box";
import Logo from "./../../components/logo/Logo";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { InterviewContext } from "./../../context/interviewContext";
import { io } from "socket.io-client";

function WaitRoom(props) {
  const interviewContext = React.useContext(InterviewContext);
  const { roomId } = props.match.params;

  React.useEffect(() => {
    // we have to make sure the link is valid and has not expired
    // if everything goes well we connect to socket and create a room with the provided room id
    const socket = io("http://localhost:5000");
    interviewContext.setRoom(roomId);
    socket.emit("join-room", JSON.stringify({ room: roomId }));
    socket.on("friend-join", () => {
      window.location.replace(`/mock-interview/lobby/${roomId}`)
    });
  }, []);
  return (
    <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "primary.main" }}>
      <Box>
        <Logo />
      </Box>
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275, padding: "3px" }}>
          <CardContent>
            <Typography variant="h3" sx={{ textAlign: "center" }} gutterBottom>
              Mock Interview
            </Typography>
            <Typography variant="subtitle1" component="div" sx={{ textAlign: "center", color: "text.secondary" }}>
              waiting for a friend to join...
            </Typography>
            <Box sx={{ color: "secondary.main", textAlign: "center" }}>
              <HourglassEmptyIcon />
            </Box>
          </CardContent>
          <CardActions>
            <Container maxWidth="xs">
              <Typography variant="h6" sx={{ textAlign: "center", mb: "20px" }}>
                Send this link to a friend
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "center", color: "secondary.main" }}>
                http://localhost:3000/mock-interview/lobby/{roomId}
              </Typography>
            </Container>
          </CardActions>
        </Card>
      </Container>
    </Box>
  );
}

export default WaitRoom;
