import React from "react";
import Router from "next/router";
import parse from 'html-react-parser';
import Styles from "../styles/Components/Prompt.module.scss"

const Post = ({ post }) => {

  const authorName = post.author ? post.author.name : "Unknown author";

  return (
    <div onClick={() => Router.push("/post/[id]", `/post/${post.id}`)} className={Styles.prompt}>
      <h2 className={Styles.prompth2}>{post.title}</h2>
      <p className={Styles.instructorName}>By {authorName}</p>
      <p>{parse(post.content)}</p>
    </div>
  );
};

export default Post;
