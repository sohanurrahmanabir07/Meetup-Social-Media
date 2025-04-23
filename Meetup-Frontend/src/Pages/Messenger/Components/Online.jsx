import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useSelector } from 'react-redux'

export const Online = ({ onlineUser, friendInfo,selected,setSelected }) => {

    const user = useSelector((state) => state.SocialMedia.users)


    if (!friendInfo || !onlineUser) return null;

    return (



        <>
            <div className=' h-[calc(100vh-60px)] w-1/5 p-2'>
                <p className='font-bold text-center border-b-2 border-slate-400 pb-2'>Online</p>

                {
                    friendInfo &&  onlineUser && Object.keys(friendInfo).map((item, index) => {

                        

                        if (onlineUser[item]) {
                            const user = friendInfo[item]
                            return (

                                <section className="flex my-2  items-center  cursor-pointer space-x-2" key={index}  onClick={()=>setSelected(user)} >

                                    <div className='relative' >
                                        <img className="w-10  rounded-full" src="https://t4.ftcdn.net/jpg/06/08/55/73/360_F_608557356_ELcD2pwQO9pduTRL30umabzgJoQn5fnd.jpg" alt="" />
                                        <FontAwesomeIcon icon={faCircle} className='text-green-700 w-3 absolute right-0 bottom-0.5' ></FontAwesomeIcon>
                                    </div>

                                    <div className="text-sm">
                                        <p className="font-bold"> {user.name}</p>
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
