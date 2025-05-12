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
import { useOutletContext } from 'react-router'
import { useFunctions } from '../CustomHooks/useFunctions'


export const Home = () => {
  const user = useSelector((state) => state.SocialMedia.users)

  const { postData,setPostData,HandleLike,handleDeletePost} = useOutletContext()
  const dispatch = useDispatch()


  // useEffect(() => {
  //   if (!socket.connected && user?._id) {
  //     // socket.connect();
  //     // socket.emit('join-user', { userID: user._id });

     
  // }, [user])

  const notification = user && useNotifactions(user._id)

  useEffect(() => {
    console.log('refresh')
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


  const {AllShow,Like}=useFunctions()

  return (
    <div className='text-3xl lg:max-w-[1340px] lg:m-auto'>

      {/* <button onClick={()=>Like('Leku')}>Click here</button> */}

      <div className='md:hidden my-5 flex justify-between'>
        <SideBar Component={<HomeProfile></HomeProfile>} buttonName={'Profile'} ></SideBar>
        <RightSideBar Component={<RightPortion></RightPortion>} buttonName={'People'} ></RightSideBar>
      </div>

      <div className='flex lg:space-5 max-sm:flex-col mt-5'>

        <section className='w-20/100 lg:h-[500px] max-sm:hidden'>
          <HomeProfile></HomeProfile>
        </section>

        <section className='w-60/100 md:border-l-2 border-gray-300 max-sm:w-full'>
          <NewsFeed postData={postData} setPostData={setPostData} HandleLike={HandleLike} handleDeletePost={handleDeletePost} ></NewsFeed>
        </section>

        <section className='w-20/100 max-sm:hidden'>

          <RightPortion></RightPortion>
        </section>







      </div>


    </div>
  )
}
