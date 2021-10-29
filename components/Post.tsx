import React, { useEffect } from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import Styles from "../styles/Components/Post.module.scss"

const Post = ({ prompt }) => {

  const instructorName = prompt.instructor ? prompt.instructor.name : "Unknown instructor";

  useEffect(() => {
  })

  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${prompt.id}`)} className={Styles.post}>
      <h2 className={Styles.posth2}>{prompt.title}</h2>
      <p className={Styles.instructorName}>By {instructorName}</p>
      <ReactMarkdown source={prompt.content} />
    </div>
  );
};

export default Post;
