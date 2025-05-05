import { useEffect, useState } from "react"
import { useGetUser } from "../../CustomHooks/useGetUser"
import { ProfileIcon } from "../../Components/Homer-Component/Components/ProfileIcon"
import { useNavigate } from "react-router"


export const Searching = () => {
    const navigate=useNavigate()
    let allUsers = useGetUser()
    const [search, setSearch] = useState('')
    const handleChange = (e) => {
        setSearch(e.target.value)

    }

    const filterUser = allUsers?.filter((item) => item['name'].toLowerCase().includes(search.toLowerCase()))
    
    return (
        <div>

            <label className="input  w-full text-slate-950 focus:outline-none dark:text-gray-300" >
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input type="search" onChange={handleChange} value={search} className="grow  dark:text-gray-300  text-slate-900 focus:outline-none broder-3 border-slate-700" placeholder="Search" />

            </label>
            <div className='absolute w-full rounded-md bg-white font-semibold z-4 text-lg list-none '>
                {
                    search.length > 1 && filterUser?.map((item, index) => {
                        return (

                            <div onClick={() => {
                                navigate('/profile', { state: { user: item } })

                                setSearch('')



                            }} className='flex space-x-3 cursor-pointer items-center text-slate-800 hover:bg-purple-900 hover:text-white p-2' key={index} >
                                <ProfileIcon width={10} height={10}></ProfileIcon>
                                <li >{item?.name}  </li>
                            </div>

                        )
                    })
                }

            </div>

        </div>
    )
}
