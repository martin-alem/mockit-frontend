import React from "react";
import logo from "./../../images/logo.png";
import Box from "@mui/material/Box";

function Logo() {
  return (
    <Box
      component="img"
      sx={{
        height: 95,
        width: 100,
        maxHeight: { xs: 95, md: 95 },
        maxWidth: { xs: 100, md: 100 },
      }}
      alt="logo"
      src={logo}
    />
  );
}

export default Logo;
