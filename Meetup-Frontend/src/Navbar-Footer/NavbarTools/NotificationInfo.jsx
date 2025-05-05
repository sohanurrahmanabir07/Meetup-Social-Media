import React, { useEffect, useState } from 'react'
import { Notification } from './Notification'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { markNotification } from '../../redux/SocialStore'
import Swal from 'sweetalert2'

export const NotificationInfo = ({unreadCount,setUnreadCount}) => {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    
    const user = useSelector((state) => state.SocialMedia.users)
    const notification=useSelector((state)=>state.SocialMedia.notification)

    const dispatch=useDispatch()


   const handleMarkRead=(index)=>{

        dispatch(markNotification(index))

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/markReadNotification`,{
            id:notification[index]._id
        },{withCredentials:true})
        .then((res)=>{

            if (res.status==401) {
                Swal.fire({
                    title:'Opps..',
                    text:'Notfication Not Found',
                    icon:'error'
                })
            }
        })
        .catch((error)=>{
            Swal.fire({
                title:'Opps..',
                text:error.message,
                icon:'error'
            })
            console.log(error)
        })
    }



    return (
        <div className='md:h-[500px] overflow-y-scroll'>
            <ul className="list bg-base-100 rounded-box shadow-md">

                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Recent Notification</li>

                {
                    notification && notification.length != 0 ?
                    notification.map((item, index) => {
                            return (

                                <Notification item={item} key={index} index={index}  unreadCount={unreadCount} setUnreadCount={setUnreadCount} handleMarkRead={handleMarkRead} ></Notification>
                            )
                        })
                        :
                        (
                            <div>
                                <p className='font-semibold'>..No Notfication..</p>
                            </div>
                        )
                }




            </ul>
        </div>
    )
}
