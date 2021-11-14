import React from "react";
import Logo from "./../logo/Logo";
import Illustration from "./../illustration/Illustration";
import LoginButton from "./../login_button/LoginButton";
import Heading from "./../heading/Heading";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

function Header() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "primary.main",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Logo />
          <LoginButton />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "space-around" },
            alignItems: { xs: "center", md: "center" },
          }}
        >
          <Heading />
          <Illustration />
        </Box>
      </Container>
    </Box>
  );
}

export default Header;
