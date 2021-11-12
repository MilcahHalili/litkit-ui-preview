import React, { useEffect, useState, useCallback } from 'react'
import Router from 'next/router'
import { magic } from '../magic'
import Loading from '../components/Loading'
import Prompts from '../pages/prompts/index'
import Styles from '../styles/pages/Index.module.scss'

export default function Index(props) {
  const [userMetadata, setUserMetadata] = useState();
  const [pendingUsername, setPendingUsername] = useState()

  const getUserData = async () => {
    if (typeof window !== 'undefined' && localStorage) {
      await console.log(localStorage.email)
      await fetch(`/api/user/${localStorage.email}`)
        .then(res => res.json())
          .then(res => {
            console.log(res)
          })
        .catch(err => console.error(err))
    }
  }

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
        getUserData()
      } else {
        // If no user is logged in, redirect to `/login`
        Router.push('/login');
      }
    })
  }, []);

  /**
   * Perform logout action via Magic.
   */
  const logout = useCallback(() => {
    magic.user.logout().then(() => {
      Router.push('/login');
    });
  }, [Router]);
  return (userMetadata && (props.username || localStorage.name)) ? (
    <div className='container'>
      <h1>Welcome, {props.username || localStorage.name}</h1>
      <button onClick={logout}>Logout</button>
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
