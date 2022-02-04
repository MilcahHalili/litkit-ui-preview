import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Layout from '../../../../components/Layout'
import Styles from '../../../../styles/pages/prompt/Id.module.scss'
import Router from "next/router";

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const NewPrompt = () => {
  const [categories, setCategories] = useState([])
  const [promptTitle, setPromptTitle] = useState('')
  const [promptCategoryId, setPromptCategoryId] = useState('')
  const [promptContent, setPromptContent] = useState([])
  const router = useRouter()

  const createPrompt = async () => {
    const data = {
      title: promptTitle,
      content: promptContent,
      email: localStorage.email,
      categoryId: (promptCategoryId == '') ? categories[0].id : promptCategoryId,
      workshopId: localStorage.workshopId
    }

    const res = await fetch(`/api/workshop/${localStorage.workshopId}/prompt/create`, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    const result = await res.json()
  }

  const getCategories = async () => {
    const res = await fetch(`/api/workshop/${localStorage.workshopId}/category`)
    const result = await res.json()
    setCategories(result)
  }

  const handleChange = e => {
    if (e.target.id === 'title') {
      setPromptTitle(e.target.value)
    } else if (e.target.id === 'content') {
      setPromptContent(e.target.value)
    } else if (e.target.id === 'category') {
      setPromptCategoryId(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    await e.preventDefault();
    await createPrompt();
    router.push(`/workshop/${localStorage.workshopId}/prompt`);
  }

  useEffect(() => {
    getCategories()
  }, [])

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
          <select
            className={Styles.titleInput}
            id="category"
            onChange={handleChange}
            defaultValue={promptCategoryId}
          >
            <option onClick={() => Router.push(`/workshop/${localStorage.workshopId}/category/new`)}>Create new category</option>
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>{category.name}</option>
                )
            })}
          </select>

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