import { faKeyboard, faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import socket from "../../../Socket/SocketServer"


export const SendingBox = ({ selected, setSelected,messages,setMessages ,user,messagField,setMessageField,handleSend}) => {
    return (
        <form action="" onSubmit={messagField != '' ? handleSend : null}>

            <section className="flex items-center w-full px-2">
                <FontAwesomeIcon icon={faKeyboard} className="mr-4 w-4" ></FontAwesomeIcon>
                {/* <input type="text" className="focus:outline-none focus:border-none w-full break-words whitespace-pre-wrap" name="" id="" /> */}
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

                    <FontAwesomeIcon className={`cursor-pointer ml-4 w-4 ${!messagField ? 'text-gray-400  cursor-not-allowed' : ''} `} icon={faPaperPlane} ></FontAwesomeIcon>
                </button>


            </section>


        </form>

    )
}
