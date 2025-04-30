import { faKeyboard, faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import socket from "../../../Socket/SocketServer"
import { SendingBox } from "./SendingBox"


export const SendingBar = ({ selected, setSelected,messages,setMessages }) => {
  const user=useSelector((state)=>state.SocialMedia.users)
  const [messagField, setMessageField] = useState('')






  const handleSend = (e) => {
    e.preventDefault()


    const message={
      users: `${selected._id}-${user._id}`,
      message:messagField,
      time:new Date(),
      senderID:user._id,
      receiverID:selected.name? selected._id:null,
      groupID:selected.name? null: selected._id,
      read:false,
      delivered:false

    }

    socket.emit('OneToOne',{
      msg:message,
      receiver:selected
    })

    setMessageField('')




  }


  return (
    <div className=' bg-purple-950 absolute bottom-2 right-0 w-full text-white  p-2 rounded-lg'>

      {/* <form action="" onSubmit={messagField!=''? handleSend:null}>

        <section className="flex items-center w-full px-2">
          <FontAwesomeIcon icon={faKeyboard} className="mr-4" ></FontAwesomeIcon>
         
          <textarea
            className="w-full resize-none overflow-hidden text-sm focus:outline-none focus:ring-0 border-none bg-transparent placeholder-gray-400"
            placeholder="Type a message..."
            rows="1"
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}

            value={messagField}

            onChange={(e) => setMessageField(e.target.value)}
          ></textarea>


          <button>

            <FontAwesomeIcon className={`cursor-pointer ml-4 ${!messagField ? 'text-gray-400  cursor-not-allowed' : ''} `} icon={faPaperPlane} ></FontAwesomeIcon>
          </button>


        </section>


      </form> */}

      <SendingBox messagField={messagField} setMessageField={setMessageField} handleSend={handleSend} ></SendingBox>





    </div>
  )
}
