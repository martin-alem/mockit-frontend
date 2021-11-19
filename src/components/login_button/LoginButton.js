import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import LoginIcon from "@mui/icons-material/Login";
import GoogleLogin from "react-google-login";
import { Stack } from "@mui/material";
import Icon from "@mui/material/Icon";
import { httpAgent } from "./../../util/util";
import { UserContext } from "./../../context/userContext";

const responseType = process.env.REACT_APP_RESPONSE_TYPE;
const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectURI = process.env.REACT_APP_REDIRECT_URI;
const state = process.env.REACT_APP_STATE;
const scope = process.env.REACT_APP_SCOPE;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 400,
  backgroundColor: "primary.contrastText",
  boxShadow: 24,
  p: 4,
};

function LoginButton() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userContext = React.useContext(UserContext);
  const handleCredentialResponse = response => {
    if (response.profileObj) {
      const { familyName, givenName, imageUrl, email } = response.profileObj;
      const data = { firstName: familyName, lastName: givenName, imageUrl, emailAddress: email };
      const url = `${process.env.REACT_APP_DOMAIN_AUTH}/api/v1/google/auth`;
      const method = "POST";

      httpAgent(url, method, data)
        .then(response => {
          response
            .json()
            .then(data => {
              userContext.setLoggedInUser({ user: { ...data.user }, profile: { ...data.profile } });
              window.location.replace("/profile");
            })
            .catch(error => {
              console.error(error);
            });
        })
        .catch(error => {
          console.error(error);
        });
    }
  };
  const handleLinkedLogin = () => {
    const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectURI}&state=${state}&scope=${scope}`;
    window.location.assign(url);
  };

  return (
    <>
      <Button
        sx={{
          color: "primary.contrastText",
          size: "medium",
        }}
        variant="text"
        startIcon={<LoginIcon />}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h6" sx={{ textAlign: "center", color: "secondary.main" }}>
            Sign in to
          </Typography>
          <Typography id="modal-modal-title" variant="h4" component="h4" sx={{ textAlign: "center", color: "secondary.main" }}>
            Mockit.org
          </Typography>
          <Box sx={{ width: "100%", mt: "50px" }}>
            <Stack spacing={3}>
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Login With Google"
                onSuccess={handleCredentialResponse}
                onFailure={handleCredentialResponse}
                theme="dark"
                responseType="token"
              />
              <Button
                onClick={handleLinkedLogin}
                variant="contained"
                sx={{
                  padding: "10px",
                  textTransform: "capitalize",
                }}
                startIcon={<Icon baseClassName="fab" className="fa-linkedin-in" />}
              >
                Login with LinkedIn
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default LoginButton;
