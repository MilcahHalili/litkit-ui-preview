import React, { useEffect, useState } from "react"
import Link from 'next/link'
import dynamic from 'next/dynamic'
import parse from 'html-react-parser';
import Layout from '../../../../components/Layout'
import Styles from "../../../../styles/pages/prompt/Id.module.scss"
import Loading from '../../../../components/Loading'
import Router from "next/router";

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const Prompt = () => {
  const [data, setData] = useState([]);
  const [postContent, setPostContent] = useState('');

  const getOnePrompt = async () => {
    const promptData = await fetch(`/api/workshop/${localStorage.workshopId}/prompt/${localStorage.promptId}`);
    const res = await promptData.json();
    setData(res);
  };

  const createPost = async () => {
    const data = {
      content: postContent,
      promptId: localStorage.promptId,
      email: localStorage.email
    }
    const res = await fetch('/api/post/create', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    const result = await res.json()
    return result
  }

  const handleSubmit = async e => {
    await e.preventDefault();
    await createPost();
    setPostContent('');
    getOnePrompt();
  }

  const clickPost = postId => {
    console.log('post clicked')
    localStorage.setItem('postId', postId);
    Router.push('/post/[id]', `/post/${postId}`);
  };

  useEffect(() => {
    getOnePrompt();
  }, []);

  const posts = data[1]?.map((post, idx) => (
    <div key={idx} onClick={() => clickPost(post.id)} className={Styles.post} >
      <h4>{post.author.name}</h4>
      {parse(post.content)}
      <div>
        <h5>{post.comments.length} comments</h5>
      </div>
    </div>
  ));

  return data[0] ? (
    <Layout>
      <div className={Styles.prompt}>
        <h2 className={Styles.h2}>{data[0]?.title || 'Loading'}</h2>
        <h3 className={Styles.h3}>By {data[0]?.author?.name || "Unknown instructor"}</h3>
        {parse(data[0].content)}
        <form>
          <QuillNoSSRWrapper
            theme="snow"
            name="content"
            id="content"
            value={postContent}
            className={Styles.quill}
            onChange={setPostContent}
          />
          <input
            type="submit"
            value="Submit"
            id={Styles.submit}
            onClick={handleSubmit}
          />
        </form>

        <hr className={Styles.divider} />

        {data[1]?.length > 0
          ? <>
            <h2 className={Styles.h2}>Responses</h2>
            {posts.reverse()}
          </>
          : <>
            <h2 className={Styles.h2}>No responses yet...</h2>
          </>
        }
      </div>
    </Layout>
  ) : (
    <Loading />
  )
};

export default Prompt;
