import React from "react";
import { Button, Typography, Box, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import "./TextEditor.css";

function TextEditor() {
  const [difficulty, setDifficulty] = React.useState("");

  const handleDifficultyChange = event => {
    setDifficulty(event.target.value);
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
  const wrapperRef = React.useCallback(wrapper => {
    if (wrapper === null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.appendChild(editor);
    new Quill(editor, { theme: "snow", modules: { toolbar: toolbarOptions } });
  });
  return (
    <>
      <Box sx={{ mt: "20px" }}>
        <Typography variant="h6">Question title</Typography>
      </Box>
      <Box component="form" sx={{ width: "100%", mt: "10px", mb: "20px" }} noValidate autoComplete="off">
        <TextField id="outlined-basic" label="Title" variant="outlined" sx={{ width: "100%" }} />
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
      <div id="container" ref={wrapperRef}></div>
      <Button sx={{ mt: "20px" }} disabled={false} variant="contained" startIcon={<SaveIcon />}>
        Save question
      </Button>
    </>
  );
}

export default TextEditor;
