import React, { useState } from 'react'
import { useRouter } from 'next/router'

const NewWorkshop = () => {
  const [ workshopName, setWorkshopName ] = useState([])
  const router = useRouter()

  const createWorkshop = async (data) => {
    data = {
      name: workshopName
    }
    const res = await fetch('/api/workshop/create', {
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
    setWorkshopName(e.target.value)
  }

  const handleSubmit = async (e) => {
    await e.preventDefault()
    createWorkshop()
    router.push('/#__next', '/')
  }

  return (
    <>
      <h1>Create new workshop</h1>
      <main>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="name"
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

export default NewWorkshop