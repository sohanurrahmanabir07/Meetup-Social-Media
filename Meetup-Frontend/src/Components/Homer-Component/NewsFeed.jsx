

import { useSelector } from 'react-redux'
import { NewPost } from './Components/NewPost'
import { Post } from './Components/Post'
import { useEffect, useState } from 'react'
import axios from 'axios'
import socket from '../../Socket/SocketServer'

export const NewsFeed = () => {
  const [page, setPage] = useState(1)
  const user = useSelector((state) => state.SocialMedia.users)
  const [postData, setPostData] = useState([])

  useEffect(() => {

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/newsFeed?page=${page}`, user, {
      withCredentials: true
    })
      .then((res) => {

        if (res.status == 201) {

          setPostData(res.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })



    socket.on('updateFeed', (post) => {

      setPostData((prevData) => {
        const index = prevData.findIndex((item) => item._id === post._id);
        if (index !== -1) {
          const newData = [...prevData];
          newData[index] = post;
          return newData;
        }
        return prevData; // no match found, return unchanged
      });
    })

    socket.on('deleteApost',(data)=>{
      const id=data.id

      setPostData((prevData) => prevData.filter((item) => item._id !== id));
    })

    return()=>{
      socket.off('deleteApost')
      socket.off('updateFeed')
    }


  }, [user, page])

  useEffect(() => {
    socket.on('InsertNewPost', (post) => {
      setPostData((prev) => [post, ...prev])
    })
    return ()=>{
      socket.off('InsertNewPost')
    }
  }, [])


  const handleDeletePost=()=>{
    socket.emit('deletePost',{post:item})
}


  const HandleLike = (item) => {


    const data = {
      senderID: user._id,
      receiverID: item.userID._id,
      info: item,
      type: 'like',
      TimeStamp: new Date()

    }

    const updatedPosts = postData.map(post => {
      if (post._id === item._id) {
        const arrSet = new Set(post.likes)
        if (arrSet.has(user._id)) {
          arrSet.delete(user._id)
          // data.type='dislike'
        } else {
          arrSet.add(user._id)
        }
        return { ...post, likes: Array.from(arrSet) }
      }
      return post
    })

    setPostData(updatedPosts)


    socket.emit('incoming_notification', data)





  }


  return (
    <div className='flex flex-col md:items-center space-y-5'>

      <NewPost></NewPost>


      {
        postData.map((item, index) => {
          return (
            <Post key={item._id} handleDeletePost={handleDeletePost}  item={item} HandleLike={HandleLike} />
          )
        })
      }



    </div>
  )
}
