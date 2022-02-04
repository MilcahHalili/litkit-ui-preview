import React, { useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Layout from '../../../../components/Layout'
import Styles from '../../../../styles/pages/prompt/Id.module.scss'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const NewCategory = () => {
  const [categoryName, setCategoryName] = useState([])
  const router = useRouter()

  const createCategory = async () => {
    const data = {
      name: categoryName,
      workshopId: localStorage.workshopId
    }
    const res = await fetch(`/api/workshop/${localStorage.workshopId}/category/create`, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    const result = await res.json()
  }

  const handleChange = e => {
    setCategoryName(e.target.value)
  }

  const handleSubmit = async (e) => {
    await e.preventDefault();
    await createCategory();
    router.push(`/workshop/${localStorage.workshopId}/prompt`);
  }

  return (
    <Layout>
      <div className={Styles.prompt}>
        <h2 className={Styles.h2}>Create New Category</h2>
        <form>
          <input
            type="text"
            placeholder="Name..."
            onChange={handleChange}
            className={Styles.titleInput}
            id="name"
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

export default NewCategory