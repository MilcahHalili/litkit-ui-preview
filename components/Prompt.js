import React, { useEffect, useState } from "react";
import Router from "next/router";
import Styles from "../styles/Components/Prompt.module.scss";
import parse from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const Prompt = ({ prompt, user }) => {
  const [authorName, setAuthorName] = useState('');
  const [complete, setComplete] = useState(false);
  const [responseCount, setResponseCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const responses = prompt.posts;
  
  const getAuthorName = async () => {
    const author = await fetch(`/api/user/${prompt.authorId}`).then(res => res.json());
    const name = author.name;
    setAuthorName(name);
  };

  const getCommentCount = async responseId => {
    const responseDetails = await fetch(`/api/post/${responseId}`);
    const res = await responseDetails.json();
    setCommentCount(res[1].length);
  };

  const checkComplete = async () => {
    responses.map(response => {
      if (response.authorId == localStorage.userId) {
        setComplete(true);
        getCommentCount(response.id);
      }
    });
  };

  const handleClick = () => {
    localStorage.setItem('promptId', prompt.id);
    localStorage.setItem('workshopId', prompt.workshopId);
    Router.push(`/workshop/${prompt.workshopId}/prompt/[id]`, `/workshop/${prompt.workshopId}/prompt/${prompt.id}`);
  };

  useEffect(() => {
    getAuthorName();
    setResponseCount(responses.length);
    checkComplete();
  }, []);

  const promptContent = parse(prompt.content);

  return (
    <div onClick={() => handleClick()} className={Styles.prompt}>
      <h2 className={Styles.prompth2}>{prompt.category?.name}{prompt.category ? ': ' : ''}{prompt.title}</h2>
      <p className={Styles.instructorName}>By {authorName || 'Unknown Instructor'}</p>
      {promptContent}

      <div className={Styles.statusContainer}>
        <p className={Styles.statusText}>
          {responseCount > 0 ? responseCount : 'No'} Response{responseCount === 1 ? '' : 's'}
        </p>
        {!user.isInstructor
          ? <p>
            {complete
              ? <span>
                <FontAwesomeIcon icon={faCheckCircle} className={Styles.checkMark} /> Completed  (<span className={commentCount > 0 ? Styles.commentText : ''}>{commentCount}/3 comments</span>)
              </span>
              : <span>
                <FontAwesomeIcon icon={faMinusCircle} className={Styles.minus} /> Incomplete
              </span>
            }
          </p>
          : ''
        }
      </div>
    </div>
  );
};

export default Prompt;