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
import { httpAgent } from "./../../util/util";
import { UserContext } from "./../../context/userContext";
import { v4 as randomId } from "uuid";

function Schedular() {
  const userContext = React.useContext(UserContext);
  const { _id: userId } = userContext.loggedInUser.user;
  const { nickName } = userContext.loggedInUser.profile;

  const [option, setOption] = React.useState("friend");
  const [role, setRole] = React.useState("interviewer");
  const [question, setQuestion] = React.useState(""); //state to keep track of any question selected
  const [questions, setQuestions] = React.useState([]); // state to keep track of all question pulled from database

  const handleOptionChange = event => {
    setOption(event.target.value);
  };

  const handleRoleChange = event => {
    setRole(event.target.value);
  };

  const handleQuestionChange = event => {
    setQuestion(event.target.value);
  };

  const handleCreateLink = () => {
    const interview = { userId, nickName, question, role, room: randomId() };
    const url = "http://localhost:5000/api/v1/interview";
    const method = "POST";
    httpAgent(url, method, interview)
      .then(response => {
        response
          .json()
          .then(data => {
            const { room: roomId } = data.interview;
            window.location.assign(`/wait_room/${roomId}`);
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    const url = "http://localhost:5000/api/v1/question";
    const method = "GET";
    const data = {};
    httpAgent(url, method, data)
      .then(response => {
        response
          .json()
          .then(data => {
            setQuestions(data.questions);
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
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
                {questions.map(question => {
                  return (
                    <MenuItem key={question._id} value={question._id}>
                      {question.title}
                    </MenuItem>
                  );
                })}
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
            onClick={handleCreateLink}
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
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Feature coming soon
          </Typography>
        </>
      )}
    </Box>
  );
}

export default Schedular;
