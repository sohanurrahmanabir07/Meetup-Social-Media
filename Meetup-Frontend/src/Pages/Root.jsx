import React, { useEffect } from 'react'
import { Navbar } from '../Navbar-Footer/Navbar'
import { Outlet } from 'react-router'
import socket from '../Socket/SocketServer';

export const Root = () => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Socket connected with ID:", socket.id);
    });
  
    return () => {
      socket.off("connect");
    };
  }, []);
  return (
    <>
        <Navbar></Navbar>
        <Outlet></Outlet>
    </>

  )
}
