import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import socket from '../Socket/SocketServer'

export const MultiSelect = ({ friends }) => {

    const user = useSelector((state) => state.SocialMedia.users)
    const [search, setSearch] = useState('')

    const [groupName, setGroupName] = useState('')

    const [groupMessage, setGroupMessage] = useState('')

    const [selected, setSelected] = useState([user])

    const filtered = Object.keys(friends).filter((item) => friends[item].name.toLowerCase().includes(search.toLowerCase()))


    const handleRemove = (item) => {
        const filterOut = selected.filter((ele) => ele._id != item._id)

        setSelected(filterOut)
    }
    const handleSelect = (item) => {
        const find = selected.find((ele) => {
            if (ele._id == item) {
                return ele
            }
        })

        if (!find) {
            setSelected((prev) => [...prev, friends[item]])
        }


    }

    const handleSubmit = (e) => {

        e.preventDefault()
        if (selected.length > 1 && groupName && groupMessage) {

            const MembersID = {

            }

            selected.map((item) => {
                console.log('item', item._id)
                if (!MembersID[item._id]) {
                    MembersID[item._id] = item
                }

            })

            const CombinedData = [
                {
                    adminID: user._id,
                    groupName: groupName,
                    members: MembersID,
                },
                {
                    users: `${groupName}`,
                    message: groupMessage,
                    time: new Date(),
                    senderID: user._id,
                    receiverID: null,
                    groupID: null,
                    read: false,
                    delivered: false
                }
            ]

            socket.emit('CreateGroup', CombinedData)
            setGroupName('')
            setGroupMessage('')
            setSelected([user])
        }
    }
    return (


        <div>
            <form action="" onSubmit={handleSubmit} className='space-y-3' >

                <section className='space-x-4 flex items-center'>

                    <input type="text" name="" placeholder='Enter Group Name' className='outline-2 outline-slate-400 rounded-sm p-1' id="" required onChange={(e) => setGroupName(e.target.value)} value={groupName} />
                    <button className='btn btn-accent'>Create Group</button>

                </section>


                <section>

                    <input type="text" placeholder='Please Type The First Message' className='outline-slate-400 outline-2 rounded-sm p-4 w-full' required name="groupMessage" onChange={(e) => setGroupMessage(e.target.value)} value={groupMessage} />

                </section>

            </form>



            <section className='flex flex-wrap space-x-2 space-y-2 m-2'>

                {
                    selected.map((item, index) => (

                        <div key={index} className='rounded-lg border-2 border-slate-200 relative p-2'>
                            <p >{item.name}</p>

                            {item._id != user._id ? <FontAwesomeIcon icon={faXmark} className='absolute -top-2 cursor-pointer right-0 bg-white rounded-full ' onClick={() => handleRemove(item)} ></FontAwesomeIcon> : ''}

                        </div>
                    ))
                }



            </section>

            <section className='bg-yellow-300 flex items-center p-2 rounded-md'>
                <input type="text" name="" id="" className='focus:outline-none w-full' onChange={(e) => setSearch(e.target.value)} value={search} placeholder='Search Friends' />
                <FontAwesomeIcon icon={faSearch} ></FontAwesomeIcon>
            </section>

            <section className='border-2 rounded-md border-slate-400 py-2'>

                {filtered.slice(0, 4).map((item, index) => (
                    <div className='px-2' key={index}>

                        <li className='list-none p-2 hover:bg-slate-200 cursor-pointer' onClick={() => handleSelect(item)}  >{friends[item].name}</li>
                        <hr className='bg-slate-200' />
                    </div>

                ))}



            </section>
            <p className='text-center'>Search For More User</p>






        </div>
    )
}
