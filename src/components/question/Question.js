import React from "react";
import "./Question.css"
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

function Question(props) {
  const { question } = props;
  const [editorContent] = React.useState(question);

  return (
    <>
      <ReactQuill
        // modules={}
        value={editorContent}
      />
    </>
  );
}

export default Question;
