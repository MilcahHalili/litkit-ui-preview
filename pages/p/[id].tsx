import React, { useEffect, useState } from "react"
import { GetServerSideProps } from "next"
import ReactMarkdown from "react-markdown"
import Layout from "../../components/Layout"
import { PostProps } from "../../components/Post"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = {
    id: 1,
    title: "This is a Quick Write",
    content: "I'm baby snackwave poke vegan, photo booth kogi squid tattooed microdosing DIY everyday carry. Stumptown kogi austin af bitters. Truffaut polaroid vape cornhole. Kickstarter art party everyday carry VHS. Air plant narwhal fam ramps, knausgaard deep v hashtag.",
    published: false,
    instructor: {
      name: "Ariel Gore",
      email: "burk@prisma.io",
    },
  }
  return {
    props: post,
  }
}

const Post: React.FC<PostProps> = (props) => {
  const [prompt, setPrompt] = useState([])

  const getOnePrompt = async (id) => {
    fetch('../../api/getOnePrompt')
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setPrompt(res)
      })
      .catch(err => console.error(err))
  }

  let title = prompt.title
  if (!prompt.published) {
    title = `${title} (Draft)`
  }

  useEffect(() => {
    getOnePrompt(props.key)
  }, [])

  return (
    <Layout>
      <div className="post">
        <h2>{title}</h2>
        <p>By {prompt?.instructor?.name || "Unknown instructor"}</p>
        <ReactMarkdown source={prompt.content} />
      </div>
      <style jsx>{`
        h2, p {
          text-align: center;
        }
        .page {
          background: white;
          padding: 2rem;
        }
        .post {
          margin: 2rem auto;
          padding: 2rem;
          background: white;
          transition: box-shadow 0.1s ease-in;
          width: 60%;
        }
        .actions {
          margin-top: 2rem;
        }
        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }
        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Post
