import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { Modal } from "../../../Components/Modal"


export const Chatlist = ({ listChat, selected, setSelected, friends }) => {
  const navigate = useNavigate()

  const [search, setSearch] = useState('')

  const box = useRef(null)

  const handleModal = () => {

    box.current.showModal()

  }
  // console.log('chatList',listChat)

  const filtered = Object.keys(friends).filter((key) => (friends[key].name.toLowerCase().includes(search.toLowerCase())))


  return (
    <div className=' dark:bg-slate-950 h-[calc(100vh-60px)] overflow-y-scroll max-sm:w-full p-3 '>
      {/* 
------------------------Searching---------------------- */}
      <section>

        <div className="flex items-center space-x-2 justify-center border-slate-500 border-2 rounded-md p-1 my-2 cursor-pointer hover:bg-purple-600  hover:text-white " onClick={handleModal} >
          <p>Create a Group</p> <span> <FontAwesomeIcon icon={faPlus} size="5px" ></FontAwesomeIcon></span>
        </div>


        <Modal box={box} friends={friends} ></Modal>

        <div className="flex items-center space-x-1 border-slate-500 border-2 rounded-md p-1">
          <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
          <input className="focus:outline-none focus:border-none" type="text" name="" id="" onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Search" />
        </div>

        <div className=" bg-white rounded-md">
          {
            search.length > 3 && filtered.map((item, index) => {

              return (
                <li key={index} className="p-2 list-none hover:bg-purple-600 hover:text-white  border-2 border-slate-400 z-2 cursor-pointer font-semibold capitalize" onClick={() => { setSelected(friends[item]); setSearch('') }} >{friends[item].name}</li>
              )
            }

            )
          }
        </div>
      </section>






      {Object.keys(listChat).map((item) => {

        return (

          <section key={listChat[item]._id} onClick={() => setSelected(listChat[item])} className="flex my-2  items-center p-2 hover:bg-purple-600 hover:text-white cursor-pointer space-x-2  border-slate-500 border-2 rounded-lg">

            <div >
              <img className="w-10  rounded-full" src="https://t4.ftcdn.net/jpg/06/08/55/73/360_F_608557356_ELcD2pwQO9pduTRL30umabzgJoQn5fnd.jpg" alt="" />
            </div>
            <div className="text-sm">
              <p className="font-bold">{listChat[item].name || listChat[item].groupName}</p>

                {listChat[item].lastMessage.length > 30 ?

                  (<p>{listChat[item].lastMessage.slice(0, 29)} <b className="font-extrabold">.............</b> </p>)
                  :

                  (<p>{listChat[item].lastMessage}</p>)
                }
            </div>


          </section>
        )
      })}





    </div>
  )
}
