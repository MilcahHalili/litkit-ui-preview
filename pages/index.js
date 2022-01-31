import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import { magic } from '../magic'
import Loading from '../components/Loading'
import Prompts from '../pages/prompt/index'
import Styles from '../styles/pages/Index.module.scss'
import Layout from '../components/Layout'

export default function Index(props) {
  const [userMetadata, setUserMetadata] = useState();
  const [pendingUsername, setPendingUsername] = useState();
  const [isVerified, setIsVerified] = useState(false);

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

  const checkVerification = async () => {
    const user = await fetch(`api/user/${localStorage.userId}`).then(res => res.json());
    console.log("userrrr??? ", user)
    if (user.isVerified === true) {
      setIsVerified(true);
    }
  };

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

    checkVerification();
  }, []);

  // return (userMetadata && (props.username || localStorage.name)) ? (
  //   <div className='container' className={Styles.index}>
  //     <Prompts
  //       props={props}
  //       userMetadata={userMetadata}
  //     />
  //   </div>
  // ) : (!props.username || !localStorage.name) ? (
  //   <div className={Styles.index}>
  //     <img src="https://i.imgur.com/NxwZ9x0.png" width="100px" height="100px" className={Styles.logo} />
  //     <div className={Styles.welcome}>
  //       <form className={Styles.welcomeForm}>
  //         <h2>What's your name?</h2>
  //         <input
  //           placeholder="My name is..."
  //           onChange={handleChange}
  //           className={Styles.input}
  //         />
  //         <input
  //           type="submit"
  //           value="Get started"
  //           onClick={handleSubmit}
  //           className={Styles.button}
  //         />
  //       </form>
  //     </div>
  //   </div>
  // ) : (
  //   <Loading />
  // )

  // Has user put in a name? if not, show form. if yes, next ternary
  // Is user approved? if yes, show prompts. If no, show pending instructions

  return ((!props.username || !localStorage.name)
    ? <div className={Styles.index}>
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
    : isVerified
      ? <Layout>
        <div className={Styles.index}>
          <Prompts
            props={props}
            userMetadata={userMetadata}
          />
        </div>
      </Layout>
      : <Layout>
        <div className={Styles.pending}>
          <h2>Pending Verification. . .</h2>
          <p>Welcome to LitKit! Please <a href="mailto:someone@yoursite.com?subject=LitKit User Verification" className={Styles.mailLink}>email us</a> to be added to a workshop. Once you are verified, return here to see your prompts. Happy writing!</p>
        </div>
      </Layout>
  );
}
