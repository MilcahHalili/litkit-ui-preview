import React, { useEffect, useState, useCallback } from 'react'
import Router from 'next/router'
import { magic } from '../magic'
import Loading from '../components/loading'
import Prompts from '../pages/prompts/index'

export default function Index() {
  const [userMetadata, setUserMetadata] = useState();
  const [userName, setUserName] = useState()

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
  
  return (userMetadata && userName) ? (
    <div className='container'>
      <h1>Welcome, {userMetadata.email}</h1>
      <button onClick={logout}>Logout</button>
      <Prompts />
    </div>
  ) : (userMetadata && !userName) ? (
    <>
      <h2>What's your name?</h2>
      <form>
        <input placeholder="name" />
        <input
          type="submit"
          value="submit"
          onClick={(e) => {
            e.preventDefault()
            console.log('click! ✨')
          }}
        />
      </form>
    </>
  ) : (
    <Loading />
  )
}
