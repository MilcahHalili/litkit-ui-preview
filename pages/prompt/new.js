import React, { useState } from 'react'
import { useRouter } from 'next/router'

const NewPrompt = () => {
  const [ promptTitle, setPromptTitle ] = useState([])
  const [ promptContent, setPromptContent ] = useState([])
  const router = useRouter()

  const createPrompt = async (data) => {
    data = {
      title: promptTitle,
      content: promptContent
    }
    const res = await fetch('/api/prompt/create', {
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
    if (e.target.id === 'title') {
      setPromptTitle(e.target.value)
    } else if (e.target.id === 'content') {
      setPromptContent(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    await e.preventDefault()
    createPrompt()
    console.log('yay!')
    router.push('/#__next', '/')
  }

  return (
    <>
      <h1>Create new prompt</h1>
      <main>
        <form onSubmit={handleSubmit}>
          <input
            id="title"
            placeholder="title"
            onChange={handleChange}
          />
          <input
            id="content"
            placeholder="content"
            onChange={handleChange}
          />
          <input
            type="submit" value="Create"
          />
        </form>
      </main>
    </>
  )
}

export default NewPrompt