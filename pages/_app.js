import React, { useState } from 'react'
import "../styles/globals.scss";

const App = ({ Component, pageProps }) => {
  const [username, setUsername] = useState()

  return (
    <Component
      {...pageProps}
      username={username}
      setUsername={setUsername}
    />
  );
};

export default App;
