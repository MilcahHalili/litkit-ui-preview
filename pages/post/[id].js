import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'

const Post = () => {
  const [data, setData] = useState([])
  const router = useRouter()
  const {
    query: { id }
  } = router

  const getOnePost = async () => {
    if (id && typeof window !== 'undefined') {
      fetch(`../../api/post/${id}`)
        .then(res => res.json())
        .then(res => {
          console.log(res)
          setData(res)
          localStorage.setItem('id', `${id}`)
          console.log('localStorage.id', localStorage.id)
        })
        .catch(err => console.error(err))
    } else if (typeof window !== 'undefined') {
      fetch(`../../api/post/${localStorage.id}`)
        .then(res => res.json())
        .then(res => {
          console.log(res)
          setData(res)
        })
        .catch(err => console.error(err))
    }
  }

  useEffect(() => {
    getOnePost()
    console.log(data)
  }, [])

  const comments = data[1]?.map(comment => (
    <div>
      <p>{comment.content}</p>
      <h4>{comment?.author?.name}</h4>
    </div>
  ))

  return (
    <Layout>
      <div>
        <h2>{data[0]?.title || 'Loading'}</h2>
        <h3>By {data[0]?.author?.name  || 'Loading'}</h3>
        <ReactMarkdown source={data[0]?.content} />
      </div>
      <div>
        { comments }
      </div>
    </Layout>
  )
}

export default Post