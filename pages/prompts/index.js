import React, { useEffect, useState } from "react"
import Router from 'next/router'
import { magic } from '../../magic'
import Layout from "../../components/Layout"
import Loading from '../../components/Loading'
import Prompt from "../../components/Prompt"
import Styles from "../../styles/pages/prompts/Index.module.scss"

const Prompts = (props) => {
  const [prompts, setPrompts] = useState([])
  const [userMetadata, setUserMetadata] = useState()

  const getPrompts = async () => {
    const res = await fetch('api/prompt/get-all')
    const result = await res.json()
    result.reverse()
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
    <Layout
      props={props}
    >
      <div className={Styles.page}>
        <h1 className={Styles.pageh1}>Quick Writes</h1>
        <main>
          {prompts.map(prompt => (
            <>
              <p className={Styles.createdAt}>{prompt.createdAt.split('').slice(0, 10).join('')}</p>
              <div className={Styles.prompt}>
                <Prompt
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

export default Prompts
