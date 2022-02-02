import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Styles from '../../styles/pages/workshop/Id.module.scss'
import Layout from '../../components/Layout'

const NewWorkshop = () => {
  const [workshopName, setWorkshopName] = useState([])
  const router = useRouter()

  const createWorkshop = async (data) => {
    data = {
      name: workshopName,
    }
    const res = await fetch('/api/workshop/create', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    console.log(res)
    const result = await res.json()
  }

  const handleChange = e => {
    setWorkshopName(e.target.value)
  }

  const handleSubmit = async (e) => {
    await e.preventDefault()
    createWorkshop()
    router.push('/#__next', '/')
  }

  return (
    <Layout>
      <div className={Styles.workshopsIndexContainer}>
        <h1>Create New Workshop</h1>
        <main>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Workshop Name. . ."
              onChange={handleChange}
              className={Styles.nameInput}
            />
            <input
              type="submit" 
              value="Submit" 
              className={Styles.submit}
            />
          </form>
        </main>
      </div>
    </Layout>
  )
}

export default NewWorkshop