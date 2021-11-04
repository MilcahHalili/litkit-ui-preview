import React, { useEffect, useState } from "react"
import Router from 'next/router'
import { magic } from '../../magic'
import Layout from "../../components/Layout"
import Loading from '../../components/loading'
import Post from "../../components/Post"
import Styles from "../../styles/Index.module.scss"

const Blog = () => {
  const [prompts, setPrompts] = useState([])
  const [userMetadata, setUserMetadata] = useState()
  
  const getPrompts = async () => {
    const res = await fetch('api/prompt/get-all')
    const result = await res.json()
    setPrompts(result)
  }

  useEffect(() => {
    magic.user.isLoggedIn()
    .then(magicIsLoggedIn => {
      if (magicIsLoggedIn) {
        magic.user.getMetadata()
          .then(setUserMetadata)
          getPrompts()
      } else {
        Router.push('/login')
      }
    })
  }, [])

  return userMetadata ? (
    <Layout>
      <div className={Styles.page}>
        <h1 className={Styles.pageh1}>Prompts</h1>
        <main>
          {prompts.reverse().map(prompt => (
            <>
              <p className={Styles.createdAt}>{prompt.createdAt.split('').slice(0, 10).join('')}</p>
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
  ) : (
    <Loading />
  )
}

export default Blog
