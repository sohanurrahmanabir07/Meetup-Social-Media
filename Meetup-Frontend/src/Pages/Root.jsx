import React, { useEffect } from 'react'
import { Navbar } from '../Navbar-Footer/Navbar'
import { Outlet } from 'react-router'
import socket from '../Socket/SocketServer';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, getOnlineUsers } from '../redux/SocialStore';

export const Root = () => {
  const dispatch=useDispatch()

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Socket connected with ID:", socket.id);

    });


    socket.on('updateMyProfile',(data)=>{
      console.log('freind list update',data)
      dispatch(addUser(data))
    })

    socket.on('getOnlineUsers',(data)=>{

      dispatch(getOnlineUsers(data))
    })
  
  
    return () => {
      socket.off('updateMyProfile')
    };
  }, []);

  
  return (
    <div className='dark:bg-slate-900'>
        <Navbar></Navbar>
        <Outlet></Outlet>
    </div>

  )
}
