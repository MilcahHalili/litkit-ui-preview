import React, { useEffect, useState } from "react"
import Layout from "../../../../components/Layout"
import Loading from "../../../../components/Loading"
import Prompt from "../../../../components/Prompt"
import Styles from "../../../../styles/pages/prompt/Prompt.module.scss"

const Prompts = (props) => {
  const [prompts, setPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPrompts = async () => {
    const res = await fetch(`/api/workshop/${localStorage.workshopId}/prompt`);
    const result = await res.json();
    result.reverse();
    setPrompts(result);
    setIsLoading(false);
  };

  useEffect(() => {
    getPrompts();
  }, []);

  return !isLoading ? (
    <Layout props={props}>
      <div className={Styles.promptIndexContainer}>
        <h1 className={Styles.pageh1}>Prompts</h1>
        {prompts.length > 0
          ? <main>
            {prompts.map((prompt, idx) => (
              <div key={idx}>
                <p className={Styles.createdAt}>{prompt.createdAt.split('').slice(0, 10).join('')}</p>
                <div className={Styles.prompt}>
                  <Prompt prompt={prompt} />
                </div>
              </div>
            ))}
          </main>
          // ? <main>wtf</main>
          : <p>No prompts yet. . .</p>
        }
      </div>
    </Layout>
  ) : (
    <Loading />
  );
};

export default Prompts;
