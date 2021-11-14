import React from "react";
import Header from "./../../components/header/Header";
import Intro from "./../../components/intro/Intro";
import Container from "@mui/material/Container";
import Features from "./../../components/features/Features";

function Home() {
  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: "50px" }}>
        <Intro />
        <Features />
      </Container>
    </>
  );
}

export default Home;
