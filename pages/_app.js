import React, { useState } from 'react'
import "../styles/globals.scss";

const App = ({ Component, pageProps }) => {
  const [username, setUsername] = useState()
  const [userEmail, setUserEmail] = useState()

  return (
    <Component
      {...pageProps}
      userEmail={userEmail}
      username={username}
      setUserEmail={setUserEmail}
      setUsername={setUsername}
    />
  );
};

export default App;
