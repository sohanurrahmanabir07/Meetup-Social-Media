import React, { useEffect } from 'react'
import { Navbar } from '../Navbar-Footer/Navbar'
import { Outlet } from 'react-router'
import socket from '../Socket/SocketServer';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, getOnlineUsers } from '../redux/SocialStore';
import axios from 'axios';
import Swal from 'sweetalert2';

export const Root = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.SocialMedia.users)

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
      console.log('calling user')
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getMyprofile?id=${user._id}`, {
        withCredentials: true
      })
        .then((res) => {
          console.log('Now ',res.data)
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


  useEffect(() => {
    if (user) {
      socket.emit('join-user', { userID: user._id })
      console.log('Run')
    }

  }, [user])





  return (
    <div className='dark:bg-slate-900'>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>

  )
}
