import React, { useEffect, useState } from "react";
import Router from "next/router";
import Styles from "../styles/Components/Prompt.module.scss"
import parse from 'html-react-parser';

const Prompt = ({ prompt }) => {
  const [authorName, setAuthorName] = useState('');

  const getAuthorName = async () => {
    const author = await fetch(`api/user/${prompt.authorId}`).then(res => res.json());
    const name = author.name;
    setAuthorName(name);
  }

  const handleClick = () => {
    localStorage.setItem('id', prompt.id);
    Router.push("/prompt/[id]", `/prompt/${prompt.id}`);
  }

  const promptContent = parse(prompt.content)

  useEffect(() => {
    getAuthorName();
  })

  return (
    <div onClick={() => handleClick()} className={Styles.prompt}>
      <h2 className={Styles.prompth2}>{prompt.title}</h2>
      <p className={Styles.instructorName}>By {authorName || 'Unknown Instructor'}</p>
      {promptContent}
    </div>
  );
};

export default Prompt;