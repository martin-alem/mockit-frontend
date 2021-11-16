import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import TimeIcon from "@mui/icons-material/Share";

function Schedular() {
  const [option, setOption] = React.useState("friend");
  const [role, setRole] = React.useState("interviewer");

  const handleOptionChange = event => {
    setOption(event.target.value);
  };

  const handleRoleChange = event => {
    setRole(event.target.value);
  };

  const [question, setQuestion] = React.useState("");

  const handleQuestionChange = event => {
    setQuestion(event.target.value);
  };
  return (
    <Box>
      <Typography variant="h4" component="h3">
        Mock Interview Schedular
      </Typography>
      <FormLabel component="legend">Interview with a</FormLabel>
      <RadioGroup row aria-label="gender" name="controlled-radio-buttons-group" value={option} onChange={handleOptionChange}>
        <FormControlLabel value="friend" control={<Radio />} label="Friend" />
        <FormControlLabel value="user" control={<Radio />} label="Random User" />
      </RadioGroup>
      <Divider />

      {option === "friend" ? (
        <>
          <Typography variant="caption" component="h3">
            Select the question that you want to tackle with your friend and the role that you want to have in the Mock
            Interview, and we'll generate a shareable link that your friend can use to join you for an interview.
          </Typography>
          <Box sx={{ mt: "20px" }}>
            <Typography variant="h6">Select a question</Typography>
          </Box>
          <Box component="form" sx={{ width: "100%", mt: "10px" }} noValidate autoComplete="off">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select a question</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={question}
                label="Question"
                onChange={handleQuestionChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: "20px" }}>
            <Typography variant="h6">Pick a role</Typography>
          </Box>
          <RadioGroup row aria-label="gender" name="controlled-radio-buttons-group" value={role} onChange={handleRoleChange}>
            <FormControlLabel value="interviewer" control={<Radio />} label="Interviewer" />
            <FormControlLabel value="interviewee" control={<Radio />} label="Interviewee" />
          </RadioGroup>

          <Button
            startIcon={<TimeIcon />}
            sx={{ mt: "20px", backgroundColor: "secondary.main" }}
            disabled={false}
            variant="contained"
          >
            Create Shareable Link
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h5" sx={{textAlign: "center"}}>Feature coming soon</Typography>
        </>
      )}
    </Box>
  );
}

export default Schedular;
