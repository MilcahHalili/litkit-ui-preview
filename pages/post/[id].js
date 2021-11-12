import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import parse from 'html-react-parser';

const Post = (props) => {
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
          setData(res)
          localStorage.setItem('id', `${id}`)
        })
        .catch(err => console.error(err))
    } else if (typeof window !== 'undefined') {
      fetch(`../../api/post/${localStorage.id}`)
        .then(res => res.json())
        .then(res => {
          setData(res)
        })
        .catch(err => console.error(err))
    }
  }

  useEffect(() => {
    getOnePost()
  }, [])

  const comments = data[1]?.map(comment => (
    <div key={comment.id}>
      <p>{comment.content}</p>
      <h4>{comment?.author?.name}</h4>
    </div>
  ))

  return data[0] ? (
    <Layout>
      <div>
        <h3>By {data[0].author.name}</h3>
        <p>{parse(data[0].content)}</p>
      </div>
      <div>
        { comments }
      </div>
    </Layout>
  ) : (
    <Loading />
  )
}

export default Post