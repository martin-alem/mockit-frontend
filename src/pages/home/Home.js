import React from "react";
import Header from "./../../components/header/Header";
import Intro from "./../../components/intro/Intro";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Features from "./../../components/features/Features";
import Footer from "./../../components/footer/Footer";

function Home() {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: "50px" }}>
        <Intro />
        <Features />
      </Container>
      <Box sx={{ width: "100%", backgroundColor: "primary.main", mt: "100px" }}>
        <Footer />
      </Box>
    </>
  );
}

export default Home;
