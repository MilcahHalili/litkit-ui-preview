import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import ReactMarkdown from "react-markdown"
import Layout from "../../components/Layout"

const Prompt = () => {
  const [ data, setData ] = useState([])
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
          setData(res)
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
          setData(res)
        })
        .catch(err => console.error(err))
    }
  }

  useEffect(() => {
    getOnePrompt()
    console.log(data)
  }, [])

  const prompts = data[1]?.map(prompt => (
    <>
      <h3>{prompt.title}</h3>
      <h4>{prompt.author.name}</h4>
      <p>{prompt.content}</p>
      <div>
        <div className="comment">
          <h5>{prompt.comments.length} comments</h5>
          {prompt.comments.map(comment => (
            <>
              <p>{comment.content} —<span>{comment.author?.name || comment.instructor?.name}</span></p>
            </>
          ))}
        </div>
      </div>
    </>
  ))

  return (
    <Layout>
      <div className="prompt">
        <h2>{data[0]?.title || 'Loading'}</h2>
        <h3>By {data[0]?.instructor?.name || "Unknown instructor"}</h3>
        <ReactMarkdown source={data[0]?.content} />
      </div>
      <div className="prompt">
        { prompts }
      </div>
      <style jsx>{`
        h2, h3, h4 {
          text-align: center;
        }
        .page {
          background: white;
          padding: 2rem;
        }
        .prompt {
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

export default Prompt