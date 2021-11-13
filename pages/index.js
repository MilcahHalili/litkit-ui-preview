import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import { magic } from '../magic'
import Loading from '../components/Loading'
import Prompts from '../pages/prompt/index'
import Styles from '../styles/pages/Index.module.scss'

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

  const handleSubmit = e => {
    e.preventDefault()
    props.setUsername(pendingUsername)
    updateUsername()
  }

  useEffect(() => {
    // On mount, we check if a user is logged in.
    // If so, we'll retrieve the authenticated user's profile.
    magic.user.isLoggedIn().then((magicIsLoggedIn) => {
      if (magicIsLoggedIn) {
        magic.user.getMetadata()
          .then(setUserMetadata)
      } else {
        // If no user is logged in, redirect to `/login`
        Router.push('/login');
      }
    })
    props.setUserEmail(userMetadata?.email || localStorage?.email)
    props.setUsername(localStorage?.name)
  }, []);

  return (userMetadata && (props.username || localStorage.name)) ? (
    <div className='container' className={Styles.index}>
      <Prompts
        props={props}
        userMetadata={userMetadata}
      />
    </div>
  ) : (!props.username || !localStorage.name) ? (
    <div className={Styles.index}>
      <img src="https://i.imgur.com/NxwZ9x0.png" width="100px" height="100px" className={Styles.logo} />
      <div className={Styles.welcome}>
        <form className={Styles.welcomeForm}>
          <h2>What's your name?</h2>
          <input
            placeholder="My name is..."
            onChange={handleChange}
            className={Styles.input}
          />
          <input
            type="submit"
            value="Get started"
            onClick={handleSubmit}
            className={Styles.button}
          />
        </form>
      </div>
    </div>
  ) : (
    <Loading />
  )
}
