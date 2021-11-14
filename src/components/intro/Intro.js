import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Intro() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          color: "primary.main",
          textAlign: "center",
        }}
      >
        <Typography variant="h2" data-testid="h1" component="h2" gutterBottom>
          What is Mockit
        </Typography>
        <Typography variant="subtitle1" data-testid="h4" gutterBottom component="h4">
          Mockit is a web-based platform designed to enable developers on the journey of trying to get a software development role practice their interviewing skills, both technical and behavioral to an extend that they are comfortable tackling any interview opportunity. Mockit makes this possible by providing live 1 - on - 1 video sessions were two candidates can interview each other. It also provides an option for recording each session so you can improve on your skills.
        </Typography>
      </Box>
    </>
  );
}

export default Intro;
