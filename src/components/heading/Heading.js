import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Heading() {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "50%" },
      }}
    >
      <Typography variant="h1" component="div" gutterBottom>
        Mockit
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div">
        The ultimate platform to practice mock coding interviews. Everything you need to get comfortable tackling any software technical and behavioral interview.
      </Typography>
    </Box>
  );
}

export default Heading;
