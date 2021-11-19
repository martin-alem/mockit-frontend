import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import { UserContext } from "./../../context/userContext";
import { httpAgent } from "./../../util/util";

function ProfileForm() {
  const userContext = React.useContext(UserContext);
  const { _id } = userContext.loggedInUser.user;
  const {
    nickName: _nickname,
    emailAddress: _emailAddress,
    languages: _languages,
    difficulty: _difficulty,
  } = userContext.loggedInUser.profile;
  const [languages, setLanguages] = React.useState(() => {
    const languages = {
      Java: false,
      CPP: false,
      CS: false,
      Go: false,
      JavaScript: false,
      Kotlin: false,
      Python: false,
      Swift: false,
      TypeScript: false,
    };

    _languages.forEach(language => {
      if (language in languages) {
        languages[language] = true;
      }
    });

    return languages;
  });

  const [nickname, setNickname] = React.useState(_nickname);
  const [email, setEmail] = React.useState(_emailAddress);

  const [difficulties, setDifficulties] = React.useState(() => {
    const difficulty = { Easy: false, Medium: false, Hard: false, VeryHard: false };
    _difficulty.forEach(difficult => {
      if (difficult in difficulty) {
        difficulty[difficult] = true;
      }
    });
    return difficulty;
  });

  const handleNicknameChange = event => {
    setNickname(event.target.value);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };
  const handleLanguageChange = event => {
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

  const { Java, CPP, CS, JavaScript, Kotlin, Python, Swift, TypeScript, Go } = languages;
  const { Easy, Medium, Hard, VeryHard } = difficulties;

  const getOption = options => {
    const selectedOption = {};

    for (const key in options) {
      if (options[key]) {
        selectedOption[key] = options[key];
      }
    }

    return selectedOption;
  };

  const submitProfile = event => {
    event.preventDefault();
    /**
     * In the future implement a local version of the data
     * so it will be compared against the new data before making
     * an actual update in database
     */
    const selectedLanguages = Object.keys(getOption(languages));
    const selectedDifficulties = Object.keys(getOption(difficulties));
    const profile = {
      nickName: nickname,
      emailAddress: email,
      languages: selectedLanguages,
      difficulty: selectedDifficulties,
      userId: _id,
    };

    const url = `${process.env.REACT_APP_DOMAIN_MAIN}/api/v1/profile/${_id}`;
    const method = "PUT";

    httpAgent(url, method, profile)
      .then(response => {
        response
          .json()
          .then(data => {
            userContext.setLoggedInUser(prevState => {
              return { ...prevState, profile: data.profile };
            });
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  };
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
        <TextField
          name="nickname"
          value={nickname}
          onChange={handleNicknameChange}
          id="outlined-basic"
          label="Nickname"
          variant="outlined"
          sx={{ width: "100%" }}
        />
      </Box>

      <Box sx={{ mt: "20px" }}>
        <Typography variant="h6">Your Email Address</Typography>
        <Typography variant="body2">We'll send interview status updates to this e-mail address.</Typography>
      </Box>
      <Box component="form" sx={{ width: "100%", mt: "20px" }} noValidate autoComplete="off">
        <TextField
          name="email"
          value={email}
          onChange={handleEmailChange}
          id="outlined-basic"
          label="Email Address"
          variant="outlined"
          sx={{ width: "100%" }}
        />
      </Box>

      <Box sx={{ mt: "20px" }}>
        <Typography variant="h6">Languages you want to interview in</Typography>
        <Typography variant="body2">You'll be paired with someone who can read one of these languages.</Typography>
      </Box>
      <Box component="form" sx={{ width: "100%", mt: "20px" }}>
        <Grid container spacing={3}>
          <Grid item>
            <FormControlLabel control={<Checkbox checked={Java} onChange={handleLanguageChange} name="Java" />} label="Java" />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Checkbox checked={JavaScript} onChange={handleLanguageChange} name="JavaScript" />}
              label="JavaScript"
            />
          </Grid>
          <Grid item>
            <FormControlLabel control={<Checkbox checked={CPP} onChange={handleLanguageChange} name="CPP" />} label="C++" />
          </Grid>
          <Grid item>
            <FormControlLabel control={<Checkbox checked={CS} onChange={handleLanguageChange} name="CS" />} label="C#" />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Checkbox checked={Kotlin} onChange={handleLanguageChange} name="Kotlin" />}
              label="Kotlin"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Checkbox checked={Python} onChange={handleLanguageChange} name="Python" />}
              label="Python"
            />
          </Grid>
          <Grid item>
            <FormControlLabel control={<Checkbox checked={Go} onChange={handleLanguageChange} name="Go" />} label="Go" />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Checkbox checked={Swift} onChange={handleLanguageChange} name="Swift" />}
              label="Swift"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Checkbox checked={TypeScript} onChange={handleLanguageChange} name="TypeScript" />}
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
      <Button
        onClick={submitProfile}
        startIcon={<SaveIcon />}
        sx={{ mt: "20px", backgroundColor: "secondary.main" }}
        disabled={false}
        variant="contained"
      >
        Save Changes
      </Button>
    </Box>
  );
}

export default ProfileForm;
