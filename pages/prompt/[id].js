import React, { useEffect, useState } from "react"
import Link from 'next/link'
import { useRouter } from "next/router"
import ReactMarkdown from "react-markdown"
import Layout from '../../components/Layout'
import dynamic from 'next/dynamic'
import parse from 'html-react-parser';
import Styles from "../../styles/pages/prompts/Index.module.scss"

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

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
          setData(res)
          localStorage.setItem('id', `${id}`)
        })
        .catch(err => console.error(err))
    } else if (typeof window !== 'undefined') {
      console.log('2')
      fetch(`../../api/prompt/${localStorage.id}`)
        .then(res => res.json())
        .then(res => {
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

  const handleSubmit = async e => {
    await e.preventDefault()
    await createPost()
    console.log('yes!')
    // rerender posts
    getOnePrompt()
  }

  useEffect(() => {
    getOnePrompt()
  }, [])

  const posts = data[1]?.map(post => (
    <Link
      key={post.id}
      href={`/post/${post.id}`}
    >
      <div className={Styles.prompt}>
        <h4>{post.author.name}</h4>
        <p>{parse(post.content)}</p>
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
          <QuillNoSSRWrapper
            theme="snow"
            name="content"
            id="content"
            value={postContent}
            onChange={setPostContent}
          />
          <input
            type="submit"
            value="Submit"
            id="submit"
            onClick={handleSubmit}
          />
        </form>
        { posts.reverse() }
      </div>
      <style jsx>{`
        h2, h3, h4 {
          text-align: center;
        }
        .container {
          margin: 2rem auto;
          padding: 2rem;
          width: 60%;
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
        #submit {
          margin-top: 3.5rem;
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
          <QuillNoSSRWrapper
            theme="snow"
            name="content"
            id="content"
            value={postContent}
            onChange={setPostContent}
          />
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