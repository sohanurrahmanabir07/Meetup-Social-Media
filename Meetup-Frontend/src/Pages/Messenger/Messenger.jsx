import React, { useEffect, useState } from 'react'
import { Chatlist } from './Components/Chatlist'
import { SendingBar } from './Components/SendingBar'
import { MessagesHistory } from './Components/MessagesHistory'
import { Online } from './Components/Online'
import { Chat } from './Components/Chat'
import { useSelector } from 'react-redux'
import socket from '../../Socket/SocketServer'
import axios from 'axios'
import Swal from 'sweetalert2'
import DarkWhatsapp from './darkWhatsapp.png'
import { useLocation, useNavigate } from 'react-router'
import { SideBar } from '../../Components/Homer-Component/Components/SideBar'
import { RightSideBar } from '../../Components/Homer-Component/Components/RightSideBar'
import { useIsMobile } from '../../CustomHooks/useIsMobile'

export const Messenger = () => {

    const user = useSelector((state) => state.SocialMedia.users)
    const location = useLocation()
    const [selected, setSelected] = useState(location.state?.selected || null)
    const [friendInfo, setFriendInfo] = useState(null)
    const [listChat, setListChat] = useState({})
    const [onlineUser, setOnlineUser] = useState(null)


    useEffect(() => {
        if (user) {
            socket.connect()
            socket.emit('join-user', { userID: user._id })

            socket.on('ChatList', (data) => {
                console.log('New List', data)

                setListChat((prev) => {
                    return {
                        ...prev,
                        [data._id]: data
                    }
                })


            })

            socket.on('getOnlineUsers', (data) => {


                setOnlineUser(data)
            })

            socket.on('friendsInfo', (data) => {


                setFriendInfo(data)
            })

        }

        return () => {
            socket.off('ChatList');
            socket.off('getOnlineUsers')
            socket.off('friendsInfo')

        };

    }, [])


    useEffect(() => {


        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/chatList?id=${user._id}`, {
            withCredentials: true,
        })
            .then((res) => {
                setListChat(res.data);
                console.log('List', res.data)

            })
            .catch((error) => Swal.fire({
                title: "Server Error!",
                text: err.response.data.message,
                icon: "error"
            }))



    }, [])

    useEffect(() => {

        if (listChat != null) {
            // console.log(' Chat List', listChat)
            Object.keys(listChat).map((id) => {


                if (listChat[id].groupName) {

                    // console.log('Group ID', id)
                    socket.emit('join-group', {
                        groupID: id,
                        userInfo: user
                    },


                        // (res)=>{

                        //     if(res.status==201){
                        //         Swal.fire({
                        //             title: "Joined The Group!",
                        //             text: res.message,
                        //             icon: "success"
                        //         })
                        //     }

                        //     if(res.error){
                        //         Swal.fire({
                        //             title: "There is Error Joining this Group!",
                        //             text: err.response.data.message,
                        //             icon: "error"
                        //         })
                        //     }



                        // }
                    )
                } else {
                    // console.log('Users ID', id)
                }
            })
        }

    }, [listChat])


    useEffect(() => {
        if (listChat) {
            // console.log('before sorting',listChat)
            const sorted = Object.fromEntries(
                Object.entries(listChat).sort(([b], [a]) => new Date(b.lastTime) - new Date(a.lastTime))
            )

            console.log('after sorting', sorted)

            const s = JSON.stringify(sorted)
            const l = JSON.stringify(listChat)
            if (JSON.stringify(sorted) != JSON.stringify(listChat)) {


                setListChat(sorted)
                console.log('updating the listChat', sorted)


            }
            else {
                // console.log('sorted list',listChat)

                for (let key in sorted) {
                    console.log(listChat[key].name || listChat[key].groupName, 'Message Time', new Date(listChat[key].lastTime))
                }
            }

        }
    }, [listChat])

    const isMobile = useIsMobile()
    const navigate = useNavigate()
    useEffect(() => {
        if (isMobile) {
            navigate("/msg/chatList");
        }
    }, [isMobile]);


    const LightWhatsapp = "https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png";



    return (


        <section>

            {
                friendInfo && onlineUser ?
                    (<div className='md:hidden my-5 flex justify-between'>
                        <SideBar
                            Component={ <Chatlist listChat={listChat} selected={selected} friends={friendInfo} user={user} setSelected={setSelected} ></Chatlist>}
                        />
                        <RightSideBar Component={<Online onlineUser={onlineUser} friendInfo={friendInfo} selected={selected} setSelected={setSelected}></Online>} onlineUser={onlineUser} ></RightSideBar>
                    </div>)
                    :
                    ''
            }

            <div className='flex w-full md:max-w-[1500px] md:m-auto' >




                {friendInfo ?
                    <div className='max-sm:hidden'>
                        <Chatlist listChat={listChat} selected={selected} friends={friendInfo} user={user} setSelected={setSelected} ></Chatlist>
                    </div>


                    :

                    (
                        <div className=' dark:bg-slate-950 h-[calc(100vh-60px)] overflow-y-scroll max-sm:w-full text-center w-1/5 p-3 '>

                            <p className='text-3xl pt-1/2 font-semibold'>Loading ...</p>
                        </div>
                    )
                }


                {selected ?
                    <Chat selected={selected} setSelected={setSelected} ></Chat>

                    :

                    <div className={`border-x-2 dark:bg-[url('assets/images/darkWhatsapp.png')]  max-sm:h-screen max-sm:w-full  bg-[url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)]    bg-no-repeat bg-cover bg-center border-slate-400  w-3/5 px-3  text-center`}>

                        <p className='font-bold md:text-3xl md:dark:text-5xl mt-[200px]'>...No Chat Selected....</p>

                    </div>

                }

                {onlineUser && friendInfo ?
                    <div className=' h-[calc(100vh-60px)] max-sm:hidden dark:bg-slate-950 dark:text-gray-300 w-1/5 p-2'>
                        <Online onlineUser={onlineUser} friendInfo={friendInfo} selected={selected} setSelected={setSelected} ></Online>
                    </div>
                    :
                    <div className='max-sm:hidden'>

                        <p className='text-3xl py-10 font-semibold'>Loading ...</p>
                    </div>
                }

                {/* 
            <img src={DarkWhatsapp} alt="" /> */}





            </div>

        </section>





    )
}


// dark:bg-[url(../../assets/darkWhatsapp.png)]

// bg-[url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)] 