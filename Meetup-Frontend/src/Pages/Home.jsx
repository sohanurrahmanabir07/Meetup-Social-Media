import React, { useEffect } from 'react'
import { HomeProfile } from '../Components/Homer-Component/HomeProfile'
import { NewsFeed } from '../Components/Homer-Component/NewsFeed'
import { RightPortion } from '../Components/Homer-Component/RightPortion'
import { SideBar } from '../Components/Homer-Component/Components/SideBar'
import { RightSideBar } from '../Components/Homer-Component/Components/RightSideBar'
import socket from '../Socket/SocketServer'
import { useDispatch, useSelector } from 'react-redux'
import { useNotifactions } from '../CustomHooks/useNotifactions'
import { addNotification, getPendingList, getRequestList, loadNotification } from '../redux/SocialStore'
import axios from 'axios'
import Swal from 'sweetalert2'

export const Home = () => {
  const user = useSelector((state) => state.SocialMedia.users)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!socket.connected && user?._id) {
      // socket.connect();
      // socket.emit('join-user', { userID: user._id });

      socket.on('getNotification', (data) => {
        // console.log('got the notification',data)
        dispatch(addNotification(data))
      })
    }
  }, [user])

  const notification = user && useNotifactions(user._id)

  useEffect(() => {
    if (user) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getRequestPendingList?id=${user._id}`)
        .then((res) => {
          // console.log(res.data)
          // console.log(res.data.pendingList)
          dispatch(getRequestList(res.data.requestList))
          dispatch(getPendingList(res.data.pendingList))
        })
        .catch((err) => Swal.fire({
          title: 'error',
          text: `${err.message}`,
          icon: 'error'

        }))
    }

  

  }, [])

  useEffect(() => {
    dispatch(loadNotification(notification))
  }, [notification])
  return (
    <div className='text-3xl lg:max-w-[1340px] lg:m-auto'>

      <div className='md:hidden my-5 flex justify-between'>
        <SideBar Component={<HomeProfile></HomeProfile>}buttonName={'Profile'} ></SideBar>
        <RightSideBar Component={<RightPortion></RightPortion>} buttonName={'People'} ></RightSideBar>
      </div>

      <div className='flex lg:space-5 max-sm:flex-col mt-5'>

        <section className='w-20/100 lg:h-[500px] max-sm:hidden'>
          <HomeProfile></HomeProfile>
        </section>

        <section className='w-60/100 md:border-l-2 border-gray-300 max-sm:w-full'>
          <NewsFeed></NewsFeed>
        </section>

        <section className='w-20/100 max-sm:hidden'>

          <RightPortion></RightPortion>
        </section>







      </div>


    </div>
  )
}
