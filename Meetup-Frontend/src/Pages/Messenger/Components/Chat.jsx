import React, { useEffect, useState } from 'react'
import { MessagesHistory } from './MessagesHistory'
import { SendingBar } from './SendingBar'
import socket from '../../../Socket/SocketServer'
import axios from 'axios'
import { useSelector } from 'react-redux'

export const Chat = ({ selected, setSelected }) => {

    const [messages, setMessages] = useState([])


    const user = useSelector((state) => state.SocialMedia.users)

    let type = 'OneToOne'

    if (selected?.groupName) {
        type = 'groupChat'
    }
    useEffect(() => {

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/load_message?type=${type}`, {
            userID: user._id,
            id: selected._id
        }, {
            withCredentials: true
        })
            .then((res) => {
                setMessages(res.data.data)
            })
            .catch((error) => {
                Swal.fire({
                    title: "Server Failed Load!",
                    text: "Sorry for Inconvenient!",
                    icon: "error"
                })
            })




    }, [selected])

    useEffect(() => {

        socket.connect()

        socket.on('sendmessage', (MsgData) => {

            setMessages((prev) => [...prev, MsgData])

        })

        return () => {

            socket.off('sendmessage')
        }
    }, [])
    return (
        <div className={`border-x-2 dark:bg-[url('assets/images/darkWhatsapp.png')] max-sm:w-full  dark:  bg-[url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)]    bg-no-repeat bg-cover border-slate-400   w-3/5 px-3  text-center relative`}
        
        
        >

            {selected != null ?
                (<>
                    <div>
                        <MessagesHistory selected={selected} setSelected={setSelected} messages={messages} setMessages={setMessages} ></MessagesHistory>
                    </div>
                    <div >
                        <SendingBar selected={selected} setSelected={setSelected} messages={messages} setMessages={setMessages} ></SendingBar>
                    </div>


                </>)

                : (


                    <div className=' text-center mt-[200px] '>

                        <p className='md:font-bold md:text-3xl'>...No Chat Selected....</p>

                    </div>
                )}




        </div>
    )
}
