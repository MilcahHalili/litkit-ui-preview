import React from "react"
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
    author: {
      name: "Ariel Gore",
      email: "burk@prisma.io",
    },
  }
  return {
    props: post,
  }
}

const Post: React.FC<PostProps> = (props) => {
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  return (
    <Layout>
      <div className="post">
        <h2>{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown source={props.content} />
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
