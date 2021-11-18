import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function NotFound() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "primary.main",
      }}
    >
      <Container maxWidth="sm"
        sx={{ padding: "30px 0px", border: "2px solid #021E39", borderRadius: "5px", boxShadow: "5px", textAlign: "center", backgroundColor: "primary.contrastText"}}
      >
        <Typography variant="h1">404</Typography>
        <Typography variant="h2" component="h1">
          Page not found
        </Typography>
        <Typography variant="body2">The page you are looking for was not found. Please try again</Typography>
      </Container>
    </Box>
  );
}

export default NotFound;
