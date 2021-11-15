import React from "react";
import Header from "./../../components/header/Header";
import Intro from "./../../components/intro/Intro";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { extractSearchParams, httpAgent } from "../../util/util";
import Features from "./../../components/features/Features";
import Footer from "./../../components/footer/Footer";
import { UserContext } from "./../../context/userContext";

function Home(props) {
  const params = extractSearchParams(props.location.search);
  const userContext = React.useContext(UserContext);

  React.useEffect(() => {
    if (Object.keys(params).length > 0 && params["code"] && params["state"]) {
      const url = "http://localhost:4000/api/v1/linkedin/auth";
      const method = "POST";
      const body = params;
      httpAgent(url, method, body)
        .then(response => {
          if (response.ok) {
            response
              .json()
              .then(data => {
                userContext.setLoggedInUser(data.user);
                window.location.replace("/profile");
              })
              .catch(error => {
                console.log(error);
              });
          } else {
            console.log(response);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else if (Object.keys(params).length > 0 && params["error"]) {
      console.log("You denied mockit access to your linkedin account profile");
    }
  }, []);
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
