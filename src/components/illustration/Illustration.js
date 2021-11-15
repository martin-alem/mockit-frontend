import React from "react";
import illustration from "./../../images/illustration.svg";
import Box from "@mui/material/Box";

function Illustration() {
  return (
    <Box
      component="img"
      sx={{
        height: 450,
        width: 668,
        display: { xs: "none", md: "block" },
      }}
      alt="illustration"
      src={illustration}
    />
  );
}

export default Illustration;
