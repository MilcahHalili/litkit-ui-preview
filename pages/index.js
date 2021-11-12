import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import { magic } from '../magic'
import Loading from '../components/Loading'
import Prompts from '../pages/prompts/index'

export default function Index(props) {
  const [userMetadata, setUserMetadata] = useState();
  const [pendingUsername, setPendingUsername] = useState()

  const updateUsername = async (data) => {
    data = {
      name: pendingUsername,
      email: userMetadata.email
    }
    const res = await fetch('/api/user/edit', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    const result = await res.json()
    localStorage.setItem('email', result.email)
    localStorage.setItem('name', result.name)
  }

  const handleChange = e => {
    setPendingUsername(e.target.value)
  }

  useEffect(() => {
    // On mount, we check if a user is logged in.
    // If so, we'll retrieve the authenticated user's profile.
    magic.user.isLoggedIn().then((magicIsLoggedIn) => {
      if (magicIsLoggedIn) {
        magic.user.getMetadata().then(setUserMetadata)
      } else {
        // If no user is logged in, redirect to `/login`
        Router.push('/login');
      }
    })
  }, []);
  
  return (userMetadata && (props.username || localStorage.name)) ? (
    <div className='container'>
      <Prompts />
    </div>
  ) : (userMetadata && (!props.username || !localStorage.name)) ? (
    <>
      <h2>What's your name?</h2>
      <form>
        <input
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="submit"
          value="submit"
          onClick={(e) => {
            e.preventDefault()
            props.setUsername(pendingUsername)
            updateUsername()
          }}
        />
      </form>
    </>
  ) : (
    <Loading />
  )
}
