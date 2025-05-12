import React, { useEffect, useRef, useState } from 'react'
import { Navbar } from '../Navbar-Footer/Navbar'
import { Outlet } from 'react-router'
import socket from '../Socket/SocketServer';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification, addUser, getOnlineUsers } from '../redux/SocialStore';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal } from '../Components/Modal'
import { Post } from '../Components/Homer-Component/Components/Post';

export const Root = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.SocialMedia.users)
  const [page, setPage] = useState(1)
  const [postData, setPostData] = useState([])
  const [postItem, setPostItem] = useState(null)
  const box = useRef(null)


  useEffect(() => {
    socket.connect()
    socket.on("connect", () => {
      console.log("✅ Socket connected with ID:", socket.id);

    });



    socket.on('updateMyProfile', (data) => {
      console.log('freind list update', data)
      dispatch(addUser(data))
    })

    socket.on('getOnlineUsers', (data) => {

      dispatch(getOnlineUsers(data))
    })

    if (user) {

      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getMyprofile?id=${user._id}`, {
        withCredentials: true
      })
        .then((res) => {

          dispatch(addUser(res.data))
        })
        .catch((error) => {

          Swal.fire({
            icon: "error",
            title: error.message,
            text: "Something went wrong!",

          });

        })

    }



    return () => {
      socket.off('updateMyProfile')
      socket.disconnect()
    };
  }, []);

  // ________________For the NewsFeed ______________________________

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

    socket.on('deleteApost', (data) => {
      const id = data.id

      setPostData((prevData) => prevData.filter((item) => item._id !== id));
    })

    return () => {
      socket.off('deleteApost')
      socket.off('updateFeed')
    }


  }, [user, page])

  useEffect(() => {
    socket.on('InsertNewPost', (post) => {
      setPostData((prev) => [post, ...prev])
    })
    return () => {
      socket.off('InsertNewPost')
    }
  }, [])


  const handleDeletePost = (item) => {
    socket.emit('deletePost', { post: item })
  }
  useEffect(() => {
    socket.on('getNotification', (data) => {
      console.log('got the notification', data)
      dispatch(addNotification(data))
    })

  return () => {
    socket.off('getNotification')
  }
}, [])


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



// ________________End the NewsFeed ______________________________

useEffect(() => {
  if (user) {
    socket.emit('join-user', { userID: user._id })

  }

}, [user])

// useEffect(() => {
//   console.log('post Item',postItem)

//   if (postItem!=null) {
//     box.current.showModal() 
//   }
// }, [postItem])





return (
  <div className='dark:bg-slate-900'>
    <Navbar  ></Navbar>
    <div className='max-sm:px-3'>
      <Outlet context={{ postData, setPostData, HandleLike, handleDeletePost }} > </Outlet>
    </div>



  </div>

)
}
