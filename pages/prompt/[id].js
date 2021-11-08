import React, { useEffect, useState } from "react"
import Link from 'next/link'
import { useRouter } from "next/router"
import ReactMarkdown from "react-markdown"
import Layout from '../../components/Layout'

const Prompt = () => {
  const [ data, setData ] = useState([])
  const [ postContent, setPostContent] = useState([])
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

  const createPost = async (data) => {
    data = {
      content: postContent,
      promptId: id
    }
    console.log(data, 'data from create post')
    const res = await fetch('/api/post/create', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    const result = await res.json()
    console.log(result)
  }

  const handleChange = e => {
    setPostContent(e.target.value)
  }

  const handleSubmit = async e => {
    await e.preventDefault()
    await createPost()
    console.log('yes!')
    // rerender posts
    getOnePrompt()
  }

  useEffect(() => {
    getOnePrompt()
    console.log(data)
  }, [])

  const posts = data[1]?.reverse().map(post => (
    <Link
      key={post.id}
      href={`/post/${post.id}`}
    >
      <div>
        <h3>{post.title}</h3>
        <h4>{post.author.name}</h4>
        <p>{post.content}</p>
        <div>
          <div className="comment">
            <h5>{post.comments.length} comments</h5>
          </div>
        </div>
      </div>
    </Link>
  ))

  return (data[1]?.length > 0) ? (
    <Layout>
      <div className="prompt">
        <h2>{data[0]?.title || 'Loading'}</h2>
        <h3>By {data[0]?.instructor?.name || "Unknown instructor"}</h3>
        <ReactMarkdown source={data[0]?.content} />
        <form>
          <textarea
            className="textBox"
            name="content"
            id="content"
            onChange={handleChange}
          >
          </textarea>
          <input
            type="submit"
            value="Submit"
            id="submit"
            onClick={handleSubmit}
          />
        </form>
      </div>
      <div className="prompt post">
        { posts }
      </div>
      <style jsx>{`
        h2, h3, h4 {
          text-align: center;
        }
        form {
          text-align: center;
        }
        .textBox {
          height: 300px;
          width: 100%;
          resize: none;
          margin: 5% 0 5% 0;
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
  ) : (
    <Layout>
      <div className="prompt">
        <h2>{data[0]?.title || 'Loading'}</h2>
        <h3>By {data[0]?.instructor?.name || "Unknown instructor"}</h3>
        <ReactMarkdown source={data[0]?.content} />
        <form>
          <textarea
            className="textBox"
            name="content"
            id="content"
            onChange={handleChange}
          >
          </textarea>
          <input
            type="submit"
            value="Submit"
            id="submit"
            onClick={handleSubmit}
          />
        </form>
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