import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import Styles from "../styles/Index.module.scss"

export const getStaticProps: GetStaticProps = async () => {
  const feed = [
    {
      id: 1,
      title: "This is a Quick Write Title",
      date: "October 13, 2021",
      content: "This is an excerpt. Click on me to read more.",
      published: false,
      author: {
        name: "Ariel Gore",
        email: "arielfiona@gmail.com",
      },
    },
  ]
  return { props: { feed } }
}

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Quick Writes</h1>
        <main>
          {props.feed.map((post) => (
            <>
              <p key={post.date}>{post.date}</p>
              <div key={post.id} className="post">
                <Post post={post} />
              </div>
            </>
          ))}
        </main>
      </div>
      <style jsx>{`
        h1 {
          text-align: center;
          color: #f3aa51;
        }
        .page {
          margin: 0 auto;
          padding: 2rem;
          background-color: rgb(255, 255, 255);
          width: 60%;
          border: 4px solid #f3aa51;
        }
        p {
          margin-left: 20%;
        }
        .post {
          margin: 0 auto;
          background: white;
          transition: box-shadow 0.1s ease-in;
          width: 60%;
          border: 1px solid lightgrey;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
