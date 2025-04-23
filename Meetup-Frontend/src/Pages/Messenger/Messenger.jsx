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

export const Messenger = () => {

    const user = useSelector((state) => state.SocialMedia.users)

    const [selected, setSelected] = useState(null)
    const [friendInfo, setFriendInfo] = useState(null)
    const [listChat, setListChat] = useState({})
    const [onlineUser, setOnlineUser] = useState(null)

    // const time=["2025-04-14T19:09:40.808Z","2025-04-12T19:36:23.163Z","2025-04-14T19:09:12.882Z","2025-04-12T19:34:07.217Z"]

    // for (let index = 0; index < time.length; index++) {
    //     time[index]=new Date(time[index])

    // }

    // console.log('newTIme',time.sort())

    // const sort=time.sort((a,b)=> new Date(a)-new Date(b))

    // console.log('sort',sort)

    // console.log('time',new Date("2025-10-14T19:09:12.882Z"))




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


        axios.get(`${import.meta.env.VITE_BACKEND_URL}/chatList?id=${user._id}`, {
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


    // const today=new Date()

    // const randDate="2025-04-15T17:42:48.440Z"

    // if (today.toLocaleDateString('en-gb') != randDate.){
    //     console.log('didnt match')
    //     console.log(today.getDate()+'/'+today.getMonth()+'/'+today.getFullYear(),'  ',today.toLocaleTimeString(),'date=',today.toLocaleDateString('en-gb'))
    // }else{
    //     console.log('Did match')
    // }
    const LightWhatsapp = "https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png";



    return (





        <div className='flex w-full md:max-w-[1500px] md:m-auto' >



            {friendInfo && <Chatlist listChat={listChat} selected={selected} friends={friendInfo} user={user} setSelected={setSelected} ></Chatlist>}


            {selected ?
                <Chat selected={selected} setSelected={setSelected} ></Chat>

                :

                <div className={`border-x-2 dark:bg-[url('assets/images/darkWhatsapp.png')]    bg-[url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)]    bg-no-repeat bg-cover bg-center border-slate-400   w-3/5 px-3  text-center`}>

                    <p className='md:font-bold md:text-3xl  md:dark:text-5xl mt-[200px]'>...No Chat Selected....</p>

                </div>

            }

            {onlineUser && friendInfo ? <Online onlineUser={onlineUser} friendInfo={friendInfo} selected={selected} setSelected={setSelected} ></Online> : <>

                <p>Loading ...</p>
            </>
            }

            {/* 
            <img src={DarkWhatsapp} alt="" /> */}





        </div>


    )
}


// dark:bg-[url(../../assets/darkWhatsapp.png)]

// bg-[url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)] 