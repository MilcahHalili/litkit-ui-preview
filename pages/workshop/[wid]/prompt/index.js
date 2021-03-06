import React, { useEffect, useState } from "react"
import Layout from "../../../../components/Layout"
import Loading from "../../../../components/Loading"
import Prompt from "../../../../components/Prompt"
import Router from "next/router";
import Styles from "../../../../styles/pages/prompt/Prompt.module.scss"

const Prompts = (props) => {
  const [user, setUser] = useState();
  const [prompts, setPrompts] = useState([]);
  const [promptsLoading, setPromptsLoading] = useState(true);

  const getUserPrompts = async () => {
    const userRes = await fetch(`/api/user/${localStorage.userId}`);
    const userData = await userRes.json();
    setUser(userData);

    const res = await fetch(`/api/workshop/${localStorage.workshopId}/prompt`);
    const result = await res.json();
    result.reverse();
    setPrompts(result);
    setPromptsLoading(false);
  };

  const addNew = () => {
    Router.push('/workshop/[wid]/prompt/new', `/workshop/${localStorage.workshopId}/prompt/new`);
  };

  useEffect(() => {
    getUserPrompts();
  }, []);

  return (
    user
      ? <Layout props={props}>
        <div className={Styles.promptIndexContainer}>
          <header>
            <h1 className={Styles.pageh1}>Prompts</h1>
            {user.isInstructor ? <button onClick={() => addNew()} className={Styles.addButton}>+</button> : ''}
          </header>

          {promptsLoading
            ? <p>Loading . . .</p>
            : prompts.length > 0
              ? <main>
                {prompts.map((prompt, idx) => (
                  <div key={idx}>
                    <p className={Styles.createdAt}>{prompt.createdAt.split('').slice(0, 10).join('')}</p>
                    <div className={Styles.prompt}>
                      <Prompt prompt={prompt} user={user} />
                    </div>
                  </div>
                ))}
              </main>
              : <p>No prompts yet. . .</p>
          }
        </div>
      </Layout>
      : <Loading />
  );
};

export default Prompts;
