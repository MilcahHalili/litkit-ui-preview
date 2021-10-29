import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import ReactMarkdown from "react-markdown"
import Layout from "../../components/Layout"

const Post = () => {
  const [ prompt, setPrompt ] = useState([])
  const router = useRouter()
  const {
    query: { id },
  } = router

  const getOnePrompt = async () => {
    if (id && typeof window !== 'undefined') {
      console.log('1')
      fetch(`../../api/prompt/${id}`)
        .then(res => res.json())
        .then(res => {
          console.log(res)
          setPrompt(res)
          localStorage.setItem('id', `${id}`)
          console.log(localStorage.id)
        })
        .catch(err => console.error(err))
    } else if (typeof window !== 'undefined') {
      console.log('2')
      fetch(`../../api/prompt/${localStorage.id}`)
        .then(res => res.json())
        .then(res => {
          console.log(res)
          setPrompt(res)
        })
        .catch(err => console.error(err))
    }
  }

  useEffect(() => {
    getOnePrompt()
    console.log(prompt)
  }, [])

  return (
    <Layout>
      <div className="post">
        <h2>{prompt?.title || 'Loading'}</h2>
        <p>By {prompt?.instructor?.name || "Unknown instructor"}</p>
        <ReactMarkdown source={prompt?.content} />
      </div>
      <style jsx>{`
        h2, p {
          text-align: center;
        }
        .page {
          background: white;
          padding: 2rem;
        }
        .post {
          margin: 2rem auto;
          padding: 2rem;
          background: white;
          transition: box-shadow 0.1s ease-in;
          width: 60%;
        }
        .actions {
          margin-top: 2rem;
        }
        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }
        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Post