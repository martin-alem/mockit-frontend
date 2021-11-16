import React from "react";
import { Button } from "@mui/material";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import "./TextEditor.css";

function TextEditor() {
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
    const editor = document.createElement("div");
    wrapper.appendChild(editor);
    new Quill("#container", { theme: "snow", modules: { toolbar: toolbarOptions } });
  }, []);
  return (
    <>
      <div id="container" ref={wrapperRef}></div>
      <Button
        sx={{ mt: "20px" }}
        disabled={false}
        variant="contained"
      >
        Save question
      </Button>
    </>
  );
}

export default TextEditor;
