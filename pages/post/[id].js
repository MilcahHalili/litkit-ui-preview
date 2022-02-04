import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import parse from 'html-react-parser';
import Styles from '../../styles/pages/post/Id.module.scss'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const Post = () => {
  const [data, setData] = useState([]);
  const [commentContent, setCommentContent] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const router = useRouter()
  const {
    query: { id }
  } = router;

  const createComment = async () => {
    const data = {
      content: commentContent,
      postId: id,
      email: localStorage.email
    }
    const res = await fetch('/api/comment/create', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    const result = await res.json()
    return result
  }

  const getOnePost = async () => {
    const postRes = await fetch(`/api/post/${localStorage.postId}`);
    const postData = await postRes.json();
    setData(postData);

    for (let i = 0; i < postData[1].length; i++) {
      if (postData[1][i].authorId !== postData[0].authorId) {
        setCommentCount(commentCount + 1);
      }
    }
  };

  const handleSubmit = async e => {
    await e.preventDefault()
    await createComment(data)
    getOnePost()
  }

  useEffect(() => {
    getOnePost();
  }, []);

  const comments = data[1]?.map((comment, idx) => (
    <div className={Styles.comment} key={idx}>
      <p>{parse(comment.content)}</p>
      <h4>— {comment?.author?.name}</h4>
    </div>
  ))

  return data[0] ? (
    <Layout>
      <main className={Styles.main}>
        <div className={Styles.post}>
          <section className={Styles.content}>
            <h3>By {data[0].author.name}</h3>
            <p>{parse(data[0].content)}</p>
          </section>
          <form>
            <QuillNoSSRWrapper
              theme="snow"
              name="content"
              id="content"
              value={commentContent}
              className={Styles.quill}
              onChange={setCommentContent}
            />
            <input
              type="submit"
              value="Submit"
              id="submit"
              className={Styles.submit}
              onClick={handleSubmit}
            />
          </form>
        </div>
        <div className={Styles.post}>
          <h4>Comments ({commentCount || 0}/3)</h4>
          {comments}
        </div>
      </main>
    </Layout>
  ) : (
    <Loading />
  )
}

export default Post