import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useSelector } from 'react-redux'
import { ProfileIcon } from '../../../Components/Homer-Component/Components/ProfileIcon'
import { useNavigate } from 'react-router'

export const Online = ({ setSelected }) => {

    const user = useSelector((state) => state.SocialMedia.users)
    const friendInfo=user.friendList

    const onlineUser=useSelector((state)=>state.SocialMedia.onlineUsers)
    const navigate=useNavigate()



    if (!friendInfo || !onlineUser) return null;

    return (



        <>
            <div >
                <p className='font-bold text-center border-b-2 border-slate-400 pb-2'>Online</p>

                {
                    friendInfo &&  onlineUser && friendInfo.map((item, index) => {

                        

                        if (onlineUser[item._id]) {
   
                            return (

                                <section className="flex space-x-2 items-center  rounded-md cursor-pointer border-2 border-slate-500 my-2  hover:bg-purple-700 hover:text-gray-200" key={index}  onClick={setSelected? ()=>setSelected(item) : ()=>navigate('/msg',{state:{'selected':item}})} >

                                
                                    <ProfileIcon width={10} height={10} ></ProfileIcon>

                                    <div className="text-base flex space-x-1">
                                        <p className="font-bold"> {item.name}</p>
                                        <p className='text-green-700'>&#9679;</p>
                                    </div>
                                </section>

                            )
                        }


                    })
                }
            </div>



        </>


    )
}
