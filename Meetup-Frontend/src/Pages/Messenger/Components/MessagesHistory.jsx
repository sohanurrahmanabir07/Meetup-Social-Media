import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ProfileChat } from "./ProfileChat"
import { Receiver } from "./Sending_Receiving/Receiver"
import { Sender } from "./Sending_Receiving/Sender"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { useSelector } from "react-redux"

export const MessagesHistory = ({ selected, setSelected, messages, setMessages }) => {

  const user = useSelector((state) => state.SocialMedia.users)
  const size = screen.width

  const bottom=useRef(null)



  if(messages){

    useEffect(()=>{
      bottom.current.scrollTop = bottom.current.scrollHeight;
    },[messages])
  }


  return (
    <div className='h-[calc(100vh-20vh)] sm:w-full'>
      <section className="py-3 h-1/10 z-10 ">
        <ProfileChat selected={selected} setSelected={setSelected} ></ProfileChat>
      </section>

      <section className="h-[calc(100vh-30vh)] overflow-y-scroll mt-5 " ref={bottom} >

        {
          messages.map((item, index) => item.senderID == user._id ? <Sender item={item} user={user} key={index} ></Sender> : <Receiver item={item} user={selected} key={index} ></Receiver>)

        }

      </section>












    </div>
  )
}
