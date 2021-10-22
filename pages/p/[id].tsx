import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import ReactMarkdown from "react-markdown"
import Layout from "../../components/Layout"
import { PromptProps } from "../../components/Post"

const Post: React.FC<PromptProps> = () => {
  const [ prompt, setPrompt ] = useState([])
  const router = useRouter()
  const {
    query: { id },
  } = router
  let title = prompt.title
  if (!prompt.published) {
    title = `${title} (Draft)`
  }

  const getOnePrompt = async () => {
    fetch(`../../api/prompt/${id}`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setPrompt(res)
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    getOnePrompt()
    console.log(prompt)
  }, [])

  return (
    <Layout>
      <div className="post">
        <h2>{title}</h2>
        <p>By {prompt?.instructor?.name || "Unknown instructor"}</p>
        <ReactMarkdown source={prompt.content} />
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