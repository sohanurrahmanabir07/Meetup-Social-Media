

import { useSelector } from 'react-redux'
import { NewPost } from './Components/NewPost'
import { Post } from './Components/Post'
import { useEffect, useState } from 'react'
import { useGetPosts } from '../../CustomHooks/useGetPosts'

export const NewsFeed = () => {
  const [page, setPage] = useState(1)
  const user = useSelector((state) => state.SocialMedia.users)

  const postData = useGetPosts(user,page)

  return (
    <div className='flex flex-col md:items-center py-5 space-y-5'>

      <NewPost></NewPost>

      {
        postData.map((item, index) => {
          return (
            <Post key={index} item={item} ></Post>
          )
        })
      }



    </div>
  )
}
