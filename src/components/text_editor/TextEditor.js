import React from "react";
import { Button, Typography, Box, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import CustomAlert from "./../../components/alert/Alert";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "./TextEditor.css";
import { httpAgent } from "./../../util/util";

function TextEditor() {
  const [difficulty, setDifficulty] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [editorContent, setEditorContent] = React.useState("");
  const [showAlert, setShowAlert] = React.useState({
    vertical: "top",
    horizontal: "center",
    duration: 6000,
    severity: "info",
    message: "Custom message",
    showAlert: false,
    setShowAlert: null,
  });

  const handleDifficultyChange = event => {
    setDifficulty(event.target.value);
  };

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleEditorChange = value => {
    setEditorContent(value);
  };
  const submitQuestion = () => {
    if (editorContent === "") {
      setShowAlert(showAlertOptions("Please enter your question", "error"));
    } else if (title === "") {
      setShowAlert(showAlertOptions("Please provide a title to question", "error"));
    } else if (difficulty === "") {
      setShowAlert(showAlertOptions("Please select a difficulty", "error"));
    } else {
      const question = { title, difficulty, editorContent };
      const url = "http://localhost:5000/api/v1/question";
      const method = "POST";
      handleSubmission(url, method, question)
    }
  };

  const showAlertOptions = (message, severity) => {
    return {
      vertical: "top",
      horizontal: "center",
      duration: 6000,
      severity,
      message,
      showAlert: true,
      setShowAlert: setShowAlert,
    };
  };

  const handleSubmission = (url, method, data) => {
    httpAgent(url, method, data)
      .then(response => {
        response
          .json()
          .then(data => {
            console.log(data);
            setShowAlert(showAlertOptions("Question save successfully", "success"));
            setTitle("");
            setDifficulty("");
            setEditorContent("");
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  return (
    <>
      <Box sx={{ mt: "20px" }}>
        <Typography variant="h6">Question title</Typography>
      </Box>
      <Box component="form" sx={{ width: "100%", mt: "10px", mb: "20px" }} noValidate autoComplete="off">
        <TextField
          name="title"
          value={title}
          onChange={handleTitleChange}
          id="outlined-basic"
          label="Title"
          variant="outlined"
          sx={{ width: "100%" }}
        />
      </Box>
      <Box sx={{ mt: "20px" }}>
        <Typography variant="h6">Choose difficulty</Typography>
      </Box>
      <RadioGroup
        row
        aria-label="difficulty"
        name="controlled-radio-buttons-group"
        value={difficulty}
        onChange={handleDifficultyChange}
      >
        <FormControlLabel value="easy" control={<Radio />} label="Easy" />
        <FormControlLabel value="medium" control={<Radio />} label="Medium" />
        <FormControlLabel value="hard" control={<Radio />} label="Hard" />
        <FormControlLabel value="very_hard" control={<Radio />} label="Very Hard" />
      </RadioGroup>
      <ReactQuill
        placeholder="Start typing your question"
        modules={{ toolbar: toolbarOptions }}
        value={editorContent}
        onChange={handleEditorChange}
      />
      <Button sx={{ mt: "20px" }} disabled={false} variant="contained" startIcon={<SaveIcon />} onClick={submitQuestion}>
        Save question
      </Button>
      <CustomAlert options={showAlert} />
    </>
  );
}

export default TextEditor;
