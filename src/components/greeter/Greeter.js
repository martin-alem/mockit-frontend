import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Greeter({firstName}) {
  return (
    <Box sx={{ mt: { xs: "10px", md: "50px" }, textAlign: {sx: "center", md: "right"} }}>
      <Typography variant="h4" component="h4" color="primary.main">
        Welcome, {firstName}
      </Typography>
    </Box>
  );
}

export default Greeter;
