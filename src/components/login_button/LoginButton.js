import React from "react";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";

function LoginButton() {
  return (
    <Button
      sx={{
        color: "white",
        size: "medium",
      }}
      variant="text"
      startIcon={<LoginIcon/>}
    >
      Login
    </Button>
  );
}

export default LoginButton;
