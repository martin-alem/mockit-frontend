import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import Logo from "./../logo/Logo";

function Footer() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          color: "primary.ContrastText",
          padding: "50px",
        }}
      >
        <Logo />
        <Box
          sx={{
            width: "100%",
            textAlign: "right",
          }}
        >
          <Grid container sx={{ justifyContent: "space-evenly", alignItems: "center" }}>
            <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
              <Link variant="caption" component="button" color="primary.contrastText">
                Contact Us
              </Link>
            </Grid>
            <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
              <Link variant="caption" component="button" color="primary.contrastText">
                FQA
              </Link>
            </Grid>
            <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
              <Link variant="caption" component="button" color="primary.contrastText">
                Reviews
              </Link>
            </Grid>
            <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
              <Link variant="caption" component="button" color="primary.contrastText">
                Blog
              </Link>
            </Grid>
            <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
              <Link variant="caption" component="button" color="primary.contrastText">
                Legal Staff
              </Link>
            </Grid>
            <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
              <Link variant="caption" component="button" color="primary.contrastText">
                Terms of use
              </Link>
            </Grid>
            <Grid item xs={12} sm={1} md={1} lg={1} xl={1}>
              <Link variant="caption" component="button" color="primary.contrastText">
                Privacy policy
              </Link>
            </Grid>
          </Grid>
          <Divider sx={{ backgroundColor: "primary.contrastText", mt: "10px" }} />
        </Box>
      </Box>
    </Container>
  );
}

export default Footer;
