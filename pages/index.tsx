import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import Styles from "../styles/Index.module.scss"

const Blog = () => {
  const [ prompts, setPrompts ] = useState([])
  
  const getPrompts = async () => {
    const res = await fetch('api/prompt')
    const result = await res.json()
    setPrompts(result)
  }

  useEffect(() => {
    getPrompts()
  }, [])

  return (
    <Layout>
      <div className={Styles.page}>
        <h1 className={Styles.pageh1}>Quick Writes</h1>
        <main>
          {prompts.map((post) => (
            <>
              <p className={Styles.createdAt}>{post.createdAt}</p>
              <div className={Styles.post}>
                <Post
                  key={post.id}
                  post={post}
                />
              </div>
            </>
          ))}
        </main>
      </div>
    </Layout>
  )
}

export default Blog
