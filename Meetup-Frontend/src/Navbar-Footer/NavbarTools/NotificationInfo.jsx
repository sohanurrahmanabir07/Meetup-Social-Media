import React, { useEffect, useState } from 'react'
import { Notification } from './Notification'
import { useNotifactions } from '../../CustomHooks/useNotifactions'
import { useSelector } from 'react-redux'
import socket from '../../Socket/SocketServer'
import axios from 'axios'

export const NotificationInfo = () => {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)

    const user = useSelector((state) => state.SocialMedia.users)
    const notification=useSelector((state)=>state.SocialMedia.notification)

    return (
        <div>

            <ul className="list bg-base-100 rounded-box shadow-md">

                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Recent Notification</li>

                {
                    notification && notification.length != 0 ?
                    notification.map((item, index) => {
                            return (

                                <Notification item={item} key={index}></Notification>
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
