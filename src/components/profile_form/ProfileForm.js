import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";

function ProfileForm() {
  const [languages, setLanguages] = React.useState({
    Java: false,
    CPP: false,
    CS: false,
    Go: false,
    JavaScript: false,
    Kotlin: false,
    Python: false,
    Swift: false,
    TypeScript: false,
  });

  const [difficulties, setDifficulties] = React.useState({ Easy: false, Medium: false, Hard: false, VeryHard: false });

  const handleChange = event => {
    setLanguages({
      ...languages,
      [event.target.name]: event.target.checked,
    });
  };

  const handleDifficultyChange = event => {
    setDifficulties({
      ...difficulties,
      [event.target.name]: event.target.checked,
    });
  };

  const { Java, CPP, CS, JavaScript, Kotlin, Python, Swift, TypeScript } = languages;
  const { Easy, Medium, Hard, VeryHard } = difficulties;
  return (
    <Box>
      <Typography variant="h4" component="h3">
        Mock Interview Profile
      </Typography>
      <Box sx={{ mt: "20px" }}>
        <Typography variant="h6">Your Nickname</Typography>
        <Typography variant="body2">Your nickname will be visible to your interview partners.</Typography>
      </Box>
      <Box component="form" sx={{ width: "100%", mt: "20px" }} noValidate autoComplete="off">
        <TextField id="outlined-basic" label="Nickname" variant="outlined" sx={{ width: "100%" }} />
      </Box>

      <Box sx={{ mt: "20px" }}>
        <Typography variant="h6">Your Email Address</Typography>
        <Typography variant="body2">We'll send interview status updates to this e-mail address.</Typography>
      </Box>
      <Box component="form" sx={{ width: "100%", mt: "20px" }} noValidate autoComplete="off">
        <TextField id="outlined-basic" label="Email Address" variant="outlined" sx={{ width: "100%" }} />
      </Box>

      <Box sx={{ mt: "20px" }}>
        <Typography variant="h6">Languages you want to interview in</Typography>
        <Typography variant="body2">You'll be paired with someone who can read one of these languages.</Typography>
      </Box>
      <Box component="form" sx={{ width: "100%", mt: "20px" }}>
        <Grid container spacing={3}>
          <Grid item>
            <FormControlLabel control={<Checkbox checked={Java} onChange={handleChange} name="Java" />} label="Java" />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Checkbox checked={JavaScript} onChange={handleChange} name="JavaScript" />}
              label="JavaScript"
            />
          </Grid>
          <Grid item>
            <FormControlLabel control={<Checkbox checked={CPP} onChange={handleChange} name="CPP" />} label="C++" />
          </Grid>
          <Grid item>
            <FormControlLabel control={<Checkbox checked={CS} onChange={handleChange} name="CS" />} label="C#" />
          </Grid>
          <Grid item>
            <FormControlLabel control={<Checkbox checked={Kotlin} onChange={handleChange} name="Kotlin" />} label="Kotlin" />
          </Grid>
          <Grid item>
            <FormControlLabel control={<Checkbox checked={Python} onChange={handleChange} name="Python" />} label="Python" />
          </Grid>
          <Grid item>
            <FormControlLabel control={<Checkbox checked={Swift} onChange={handleChange} name="Swift" />} label="Swift" />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Checkbox checked={TypeScript} onChange={handleChange} name="TypeScript" />}
              label="TypeScript"
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: "20px" }}>
        <Typography variant="h6">Question difficulties that you're willing to get</Typography>
      </Box>
      <Box component="form" sx={{ width: "100%", mt: "20px" }}>
        <Grid container spacing={3}>
          <Grid item>
            <FormControlLabel
              control={<Checkbox checked={Easy} onChange={handleDifficultyChange} name="Easy" />}
              label="Easy"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Checkbox checked={Medium} onChange={handleDifficultyChange} name="Medium" />}
              label="Medium"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Checkbox checked={Hard} onChange={handleDifficultyChange} name="Hard" />}
              label="Hard"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Checkbox checked={VeryHard} onChange={handleDifficultyChange} name="VeryHard" />}
              label="Very Hard"
            />
          </Grid>
        </Grid>
      </Box>
      <Button startIcon={<SaveIcon/>} sx={{ mt: "20px" }} variant="contained">
        Save Changes
      </Button>
    </Box>
  );
}

export default ProfileForm;
