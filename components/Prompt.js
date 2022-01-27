import React, { useEffect } from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import Styles from "../styles/Components/Prompt.module.scss"

const Prompt = ({ prompt }) => {

  const instructorName = prompt.instructor ? prompt.instructor.name : "Unknown instructor";

  useEffect(() => {
  })

  return (
    <div onClick={() => Router.push("/prompt/[id]", `/prompt/${prompt.id}`)} className={Styles.prompt}>
      <h2 className={Styles.prompth2}>{prompt.title}</h2> 
      <p className={Styles.instructorName}>By {instructorName}</p>
      <ReactMarkdown source={prompt.content} />
    </div>
  );
};

export default Prompt;
