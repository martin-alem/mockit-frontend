import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import LoginIcon from "@mui/icons-material/Login";
import GoogleLogin from "react-google-login";
import { Stack } from "@mui/material";
import Icon from "@mui/material/Icon";

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
  const handleCredentialResponse = response => {
    console.log(response);
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
