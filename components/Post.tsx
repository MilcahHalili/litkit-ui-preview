import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import Styles from "../styles/Components/Post.module.scss"

export type PostProps = {
  id: number;
  title: string;
  date: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)} className={Styles.post}>
      <h2 className={Styles.posth2}>{post.title}</h2>
      <p className={Styles.authorName}>By {authorName}</p>
      <ReactMarkdown source={post.content} />
    </div>
  );
};

export default Post;
