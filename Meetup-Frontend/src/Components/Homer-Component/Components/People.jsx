
import { ProfileIcon } from './ProfileIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useGetUser } from '../../../CustomHooks/useGetUser'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

export const People = ({ type }) => {
    const [suggestions, setSuggestions] = useState([])
    const [checkSuggestion,setCheckSuggestion]=useState({})
    const myProfile=useSelector((state)=>state.SocialMedia.users)
    const navigate=useNavigate()
    const addFreind = (
        <span className='cursor-pointer text-center'>
            <FontAwesomeIcon icon={faPlus} size='md' ></FontAwesomeIcon>
        </span>
    )

    const allUsers = useGetUser()

    useEffect(()=>{
        const track=new Set()
        let temp=[]
        allUsers?.map((item)=>{
            const index=Math.floor(Math.random()*(allUsers.length))
            if (!(track.has(index)) && allUsers[index]._id != myProfile._id){
                temp=[...temp,allUsers[index]]
                track.add(index)
                if(track.length>=8){
                    return
                }
            }
        })
        setSuggestions(temp)
    
    },[allUsers])






    return (
        <div className='border-1  dark:bg-slate-950 dark:text-gray-300 border-slate-500 lg:h-[450px]  rounded-lg p-3 overflow-y-scroll'>


            <p className='text-lg font-semibold border-b-2 border-slate-500 pb-2'> {type == 'online' ? ('People Who are Online') : 'People You May Know'} {type == 'online' ? (<span className="text-green-600 text-sm">&#9679;</span>) : ''} </p>


            <div className='space-y-2 cursor-pointer rounded-lg'>

                {

                    suggestions && suggestions.map((item,index) => {
                        
                            return (
                                <section key={index} onClick={()=>navigate('/profile',{state:{user:item}})} className="flex space-x-2 items-center  rounded-md   hover:bg-purple-700 hover:text-gray-200">
                                    <ProfileIcon width={10} height={10} ></ProfileIcon>
                                    <div>
                                        <p className="text-base font-semibold">{item?.name.slice(0,15)} {addFreind} </p>

                                    </div>
                                </section>
                            )
                        }

                    )   
                }


            </div>






        </div>
    )
}
