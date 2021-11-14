import React from "react";
import Feature1Image from "./../../images/feature1.svg";
import Feature2Image from "./../../images/feature2.svg";
import Feature3Image from "./../../images/feature3.svg";
import Feature4Image from "./../../images/feature4.svg";
import Feature5Image from "./../../images/feature5.svg";
import Feature6Image from "./../../images/feature6.svg";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function Features() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          marginTop: "100px",
          textAlign: "center",
        }}
      >
        <Grid container spacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <Box>
              <Box sx={{ width: 166, height: 122 }} alt="Feature 1" src={Feature1Image} component="img"></Box>
              <Typography variant="h6" component="h6">
                Live coding mock interview
              </Typography>
              <Typography variant="body2" component="p">
                Set up you schedule and get mock interview suggestions with other peers based on your schedule
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <Box>
              <Box sx={{ width: 166, height: 122 }} alt="Feature 2" src={Feature2Image} component="img"></Box>
              <Typography variant="h6" component="h6">
                Live behavioral interviews
              </Typography>
              <Typography variant="body2" component="p">
                Set up you schedule and get mock behavioral interview suggestions with other peers based on your schedule
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <Box>
              <Box sx={{ width: 166, height: 122 }} alt="Feature 3" src={Feature3Image} component="img"></Box>
              <Typography variant="h6" component="h6">
                Rich coding environment
              </Typography>
              <Typography variant="body2" component="body2">
                Mockit mimics what you may encounter in a real coding interview, such as whiteboard and syntax highlighting mode
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <Box>
              <Box sx={{ width: 166, height: 122 }} alt="Feature 4" src={Feature4Image} component="img"></Box>
              <Typography variant="h6" component="h6">
                Record interview sessions
              </Typography>
              <Typography variant="body2" component="p">
                Mockit gives you the ability to record your mock interview sessions so you re-watch and improve on your skills.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <Box>
              <Box sx={{ width: 166, height: 122 }} alt="Feature 5" src={Feature5Image} component="img"></Box>
              <Typography variant="h6" component="h6">
                Backup records to cloud
              </Typography>
              <Typography variant="body2" component="p">
                Mockit gains access to your google’s drive with your permission and stores all recorded sessions there.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <Box>
              <Box sx={{ width: 166, height: 122 }} alt="Feature 6" src={Feature6Image} component="img"></Box>
              <Typography variant="h6" component="h6">
                A pool of coding questions
              </Typography>
              <Typography variant="body2" component="p">
                Mockit provides you with access to tons of different coding questions to improve on your skills.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Features;
