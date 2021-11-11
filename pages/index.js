import React, { useEffect, useState, useCallback } from 'react'
import Router from 'next/router'
import { magic } from '../magic'
import Loading from '../components/loading'
import Prompts from '../pages/prompts/index'

export default function Index(props) {
  const [userMetadata, setUserMetadata] = useState();
  const [pendingUsername, setPendingUsername] = useState()

  const handleChange = e => {
    setPendingUsername(e.target.value)
    console.log(pendingUsername)
  }

  useEffect(() => {
    // On mount, we check if a user is logged in.
    // If so, we'll retrieve the authenticated user's profile.
    magic.user.isLoggedIn().then((magicIsLoggedIn) => {
      if (magicIsLoggedIn) {
        magic.user.getMetadata().then(setUserMetadata);
      } else {
        // If no user is logged in, redirect to `/login`
        Router.push('/login');
      }
    });
  }, []);

  /**
   * Perform logout action via Magic.
   */
  const logout = useCallback(() => {
    magic.user.logout().then(() => {
      Router.push('/login');
    });
  }, [Router]);
  
  return (userMetadata && props.username) ? (
    <div className='container'>
      <h1>Welcome, {props.username}</h1>
      <button onClick={logout}>Logout</button>
      <Prompts />
    </div>
  ) : (userMetadata && !props.username) ? (
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
          }}
        />
      </form>
    </>
  ) : (
    <Loading />
  )
}
