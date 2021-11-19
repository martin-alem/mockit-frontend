import React from "react";
import Header from "./../../components/header/Header";
import Intro from "./../../components/intro/Intro";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { extractSearchParams, httpAgent } from "../../util/util";
import Features from "./../../components/features/Features";
import Footer from "./../../components/footer/Footer";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { UserContext } from "./../../context/userContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Home(props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const params = extractSearchParams(props.location.search);
  const userContext = React.useContext(UserContext);

  React.useEffect(() => {
    if (Object.keys(params).length > 0 && params["code"] && params["state"]) {
      const url = `${process.env.REACT_APP_DOMAIN_AUTH}/api/v1/linkedin/auth`;
      const method = "POST";
      const body = params;
      httpAgent(url, method, body)
        .then(response => {
          if (response.ok) {
            response
              .json()
              .then(data => {
                userContext.setLoggedInUser({ user: { ...data.user }, profile: { ...data.profile } });
                window.location.replace("/profile");
              })
              .catch(error => {
                console.error(error);
              });
          } else {
            console.log(response);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else if (Object.keys(params).length > 0 && params["error"]) {
      handleClick();
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          You denied mockit access to your linkedin account
        </Alert>
      </Snackbar>
    </>
  );
}

export default Home;
