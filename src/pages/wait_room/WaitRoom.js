import React from "react";
import Box from "@mui/material/Box";
import Logo from "./../../components/logo/Logo";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import HourGlass from "./../../components/icons/HourGlass";
import { InterviewContext } from "./../../context/interviewContext";
import { io } from "socket.io-client";
import { httpAgent } from "./../../util/util";

function WaitRoom(props) {
  const interviewContext = React.useContext(InterviewContext);
  const { roomId } = props.match.params;

  React.useEffect(() => {
    const handleAsync = async () => {
      const identifier = document.cookie.split(";")[1]?.split("=");
      const url = `${process.env.REACT_APP_DOMAIN_MAIN}/api/v1/interview/${roomId}`;
      const method = "GET";

      try {
        const response = await httpAgent(url, method, {});
        if (!response.ok) {
          window.location.assign("/404");
        } else {
          const socket = io(`${process.env.REACT_APP_DOMAIN_MAIN}`);
          interviewContext.setRoom(roomId);
          if (identifier !== undefined) {
            socket.emit("create-room", { roomId });
            socket.on("friend-in-lobby", () => {
              // await updateParticipants(identifier);
              window.location.replace(`/mock-interview/lobby/${roomId}`);
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    handleAsync();
  });

  // const updateParticipants = async identifier => {
  //   const url = `${process.env.REACT_APP_DOMAIN_MAIN}/api/v1/interview/${identifier}`;
  //   const method = "PUT";
  //   const body = { participants: 2 };
  //   const response = await httpAgent(url, method, body);
  //   if (response.ok) {
  //     const data = await response.json();
  //     console.log(data);
  //   } else {
  //     console.error(response);
  //   }
  // };
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
              <HourGlass sx={{ fontSize: 80 }} />
            </Box>
          </CardContent>
          <CardActions>
            <Container maxWidth="xs">
              <Typography variant="h6" sx={{ textAlign: "center", mb: "20px" }}>
                Send this link to a friend
              </Typography>
              <Link
                href={`${process.env.REACT_APP_DOMAIN}/mock-interview/lobby/${roomId}`}
                sx={{ textAlign: "center", color: "secondary.main", fontSize: "25px" }}
              >
                {process.env.REACT_APP_DOMAIN}/mock-interview/lobby/{roomId}
              </Link>
            </Container>
          </CardActions>
        </Card>
      </Container>
    </Box>
  );
}

export default WaitRoom;
