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
  const [data, setData] = useState([])
  const [commentContent, setCommentContent] = useState([])
  const router = useRouter()
  const {
    query: { id }
  } = router

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
    if (id && typeof window !== 'undefined') {
      fetch(`../../api/post/${id}`)
        .then(res => res.json())
        .then(res => {
          setData(res)
          localStorage.setItem('id', `${id}`)
        })
        .catch(err => console.error(err))
    } else if (typeof window !== 'undefined') {
      fetch(`../../api/post/${localStorage.id}`)
        .then(res => res.json())
        .then(res => {
          setData(res)
        })
        .catch(err => console.error(err))
    }
  }

  const handleSubmit = async e => {
    await e.preventDefault()
    await createComment(data)
    getOnePost()
  }

  useEffect(() => {
    getOnePost()
  }, [])

  const comments = data[1]?.map(comment => (
    <div className={Styles.comment} key={comment.id}>
      <p>{parse(comment.content)}</p>
      <h4>{comment?.author?.name}</h4>
    </div>
  ))

  return data[0] ? (
    <Layout>
      <main className={Styles.main}>
        <div className={Styles.post}>
          <h3>By {data[0].author.name}</h3>
          <p>{parse(data[0].content)}</p>
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
              onClick={handleSubmit}
            />
          </form>
        </div>
        <div>
          { comments }
        </div>
      </main>
    </Layout>
  ) : (
    <Loading />
  )
}

export default Post