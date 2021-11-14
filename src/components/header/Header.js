import React from "react";
import "./Header.css";
import Logo from "./../logo/Logo";
import LoginButton from "./../login_button/LoginButton"
import Container from "@mui/material/Container";

function Header() {
  return (
    <div className="Header">
      <Container maxWidth="lg">
        <div className="Header-logo-login">
          <Logo />
          <LoginButton />
        </div>
      </Container>
    </div>
  );
}

export default Header;
