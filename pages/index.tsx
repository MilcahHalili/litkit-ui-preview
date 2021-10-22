import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import Post, { PromptProps } from "../components/Post"
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
          {prompts.map(prompt => (
            <>
              <p className={Styles.createdAt}>{prompt.createdAt}</p>
              <div className={Styles.post}>
                <Post
                  key={prompt.id}
                  prompt={prompt}
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
