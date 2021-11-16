import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CustomAlert(props) {
  const { vertical, horizontal, duration, severity, message, showAlert, setShowAlert } = props.options;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert({
      vertical: "top",
      horizontal: "center",
      duration: 6000,
      severity: "info",
      message: "Custom message",
      showAlert: false,
      setShowAlert: null,
    });
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
      open={showAlert}
      autoHideDuration={duration}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default CustomAlert;
