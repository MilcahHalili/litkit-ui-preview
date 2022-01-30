import React, { useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Layout from '../../components/Layout'
import Styles from '../../styles/pages/prompt/Id.module.scss'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const NewPrompt = () => {
  const [promptTitle, setPromptTitle] = useState([])
  const [promptContent, setPromptContent] = useState([])
  const router = useRouter()

  const createPrompt = async () => {
    const data = {
      title: promptTitle,
      content: promptContent,
      email: localStorage.email
    }

    console.log(data, 'data from create prompt')
    const res = await fetch('/api/prompt/create', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    console.log('success post')
    const result = await res.json()
    console.log('ressssuullttt => ', result)
  }

  const handleChange = e => {
    if (e.target.id === 'title') {
      setPromptTitle(e.target.value)
    } else if (e.target.id === 'content') {
      setPromptContent(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    await e.preventDefault()
    await createPrompt()
    console.log('yay!')
    router.push('/#__next', '/')
  }

  return (
    <Layout>
      <div className={Styles.prompt}>
        <h2 className={Styles.h2}>Create New Prompt</h2>
        <form>
          <input
            type="text"
            placeholder="Title..."
            onChange={handleChange}
            className={Styles.titleInput}
            id="title"
          />

          <QuillNoSSRWrapper
            theme="snow"
            name="content"
            id="content"
            value={promptContent}
            className={Styles.quill}
            onChange={setPromptContent}
          />

          <input
            type="submit"
            value="Create"
            id={Styles.submit}
            onClick={handleSubmit}
          />
        </form>
      </div>
    </Layout>
  )
}

export default NewPrompt