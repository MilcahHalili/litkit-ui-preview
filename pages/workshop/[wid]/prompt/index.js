import React, { useEffect, useState } from "react"
import Layout from "../../../../components/Layout"
import Loading from "../../../../components/Loading"
import Prompt from "../../../../components/Prompt"
import Styles from "../../../../styles/pages/prompt/Prompt.module.scss"

const Prompts = (props) => {
  const [prompts, setPrompts] = useState([])

  const getPrompts = async () => {
    const res = await fetch('api/workshop/1/prompt')
    const result = await res.json()
    result.reverse()
    setPrompts(result)
  }

  useEffect(() => {
    getPrompts()
  }, [])

  return props.userMetadata ? (
    <Layout
      props={props}
    >
      <div className={Styles.promptIndexContainer}>
        <h1 className={Styles.pageh1}>Prompts</h1>
        <main>
          {prompts.map((prompt, idx) => (
            <>
              <p className={Styles.createdAt}>{prompt.createdAt.split('').slice(0, 10).join('')}</p>
              <div className={Styles.prompt}>
                <Prompt
                  key={idx}
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