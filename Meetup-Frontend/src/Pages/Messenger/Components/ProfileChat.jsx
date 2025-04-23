import { faArrowLeft, faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const ProfileChat = ({ selected, setSelected }) => {
    return (

        <div className='flex space-x-2 '>

            <button className='cursor-pointer'  onClick={()=>setSelected(null)}>

                <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>

            </button>
            <section className="flex   items-center w-full cursor-pointer space-x-3 border-2 p-2 rounded-lg">


                <div className='relative' >
                    <img className="w-10  rounded-full" src="https://t4.ftcdn.net/jpg/06/08/55/73/360_F_608557356_ELcD2pwQO9pduTRL30umabzgJoQn5fnd.jpg" alt="" />
                    <FontAwesomeIcon icon={faCircle} className='text-green-700 w-3 absolute right-0 bottom-0.5' ></FontAwesomeIcon>
                </div>

                <div className="text-sm">
                    <p className="font-bold"> {selected?.name || selected?.groupName}</p>
                </div>
            </section>


        </div>

    )

}
