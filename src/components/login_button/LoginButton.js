import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import LoginIcon from "@mui/icons-material/Login";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 500,
  backgroundColor: "primary.contrastText",
  boxShadow: 24,
  p: 4,
};

function LoginButton() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button
        sx={{
          color: "white",
          size: "medium",
        }}
        variant="text"
        startIcon={<LoginIcon />}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h6" sx={{ textAlign: "center", color: "secondary.main" }}>
            Sign in to
          </Typography>
          <Typography id="modal-modal-title" variant="h4" component="h4" sx={{ textAlign: "center", color: "secondary.main" }}>
            Mockit.org
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default LoginButton;
