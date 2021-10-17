import React from "react"
import handler from '../pages/api/prompt'
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"

export async function getServerSideProps(context) {
  const request = await fetch('http://localhost:3000/api/prompt')
  const json = await request.json()

  return {
    props: {
      data: json
    }
  }
}

const Blog = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Quick Writes</h1>
        <main>
          {props.data.map((post) => (
            <>
              <p>{post.id}</p>
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
