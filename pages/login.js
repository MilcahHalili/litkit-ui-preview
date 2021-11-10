import { useCallback, useState } from 'react';
import Router from 'next/router';
import { magic } from '../magic';

import Styles from '../styles/pages/Login.module.scss';

export default function Login() {
  const [email, setEmail] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  /**
   * Perform login action via Magic's passwordless flow. Upon successuful
   * completion of the login flow, a user is redirected to the homepage.
   */
  const login = useCallback(async () => {
    setIsLoggingIn(true);

    try {
      // Grab auth token from loginWithMagicLink
      const didToken = await magic.auth.loginWithMagicLink({
        email,
        redirectURI: new URL('/callback', window.location.origin).href,
      });

      // Validate auth token with server
      const res = await fetch('/api/login', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
      });
      res.status === 200 && Router.push('/');
    } catch {
      setIsLoggingIn(false);
    }
  }, [email]);

  /**
   * Saves the value of our email input into component state.
   */
  const handleInputOnChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  return (
    <div className={Styles.login}>
      <h1>Welcome Header</h1>
      <p>I'm baby roof party whatever actually swag literally trust fund lomo pickled yr raclette four loko iPhone distillery. Meh chartreuse tumeric umami, disrupt pok pok wolf listicle trust fund mixtape. Next level cold-pressed church-key unicorn banjo photo booth 90's vexillologist poke pickled mixtape cronut. Messenger bag scenester wolf, food truck listicle iPhone pop-up air plant blue bottle try-hard celiac tousled retro marfa yr.</p>
      <input
        type='email'
        name='email'
        required='required'
        placeholder='your@email.com'
        onChange={handleInputOnChange}
        disabled={isLoggingIn}
      />
      <button onClick={login} disabled={isLoggingIn}>
        Send
      </button>
    </div>
  );
}
