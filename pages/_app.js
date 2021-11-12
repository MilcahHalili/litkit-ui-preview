import React, { useEffect, useState } from 'react'

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
