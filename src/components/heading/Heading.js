import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Heading() {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "50%" },
        color: "primary.contrastText",
      }}
    >
      <Typography variant="h1" data-testid="h1" component="h1" gutterBottom>
        Mockit
      </Typography>
      <Typography variant="subtitle1" data-testid="h4" gutterBottom component="h4">
        The ultimate platform to practice mock coding interviews. Everything you need to get comfortable tackling any software technical and behavioral interview.
      </Typography>
    </Box>
  );
}

export default Heading;
