import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import Styles from "../styles/Index.module.scss"

const Blog = () => {
  const [ prompts, setPrompts ] = useState([])

  const fetchData = async () => {
    const response = await fetch('api/prompt');

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const prompts = await response.json();
    return setPrompts(prompts);
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Layout>
      <div className="page">
        <h1>Quick Writes</h1>
        <main>
          {prompts.map((post) => (
            <>
              <p key={post.id}>{post.id}</p>
              <div key={post.id} className="post">
                <Post post={post} />
              </div>
            </>
          ))}
        </main>
      </div>
      <style jsx>{`
        h1 {
          text-align: center;
          color: #f3aa51;
        }
        .page {
          margin: 0 auto;
          padding: 2rem;
          background-color: rgb(255, 255, 255);
          width: 60%;
          border: 4px solid #f3aa51;
        }
        p {
          margin-left: 20%;
        }
        .post {
          margin: 0 auto;
          background: white;
          transition: box-shadow 0.1s ease-in;
          width: 60%;
          border: 1px solid lightgrey;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
