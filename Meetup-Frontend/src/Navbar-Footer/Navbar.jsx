import React, { useState } from 'react'
import { ThemeController } from './NavbarTools/ThemeController'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../redux/SocialStore'
import socket from '../Socket/SocketServer'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { NotificationInfo } from './NavbarTools/NotificationInfo'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useGetUser } from '../CustomHooks/useGetUser'
import { ProfileIcon } from '../Components/Homer-Component/Components/ProfileIcon'

export const Navbar = () => {
    const navigate = useNavigate()

    const user = useSelector((state) => state.SocialMedia.users)
    const dispatch = useDispatch()

    let allUsers = useGetUser()

    const [search, setSearch] = useState('')


    const handleChange = (e) => {
        setSearch(e.target.value)

    }

    const filterUser = allUsers?.filter((item) => item['name'].toLowerCase().includes(search.toLowerCase()))




    return (
        <div className='bg-primary-content'>


            <div className="navbar  flex justify-between  lg:max-w-[1500px] lg:m-auto ">
                <div className="cursor-pointer" onClick={() => navigate('/home')} >
                    <a className="text-2xl">Meetup🔥</a>
                </div>
                {/* searching box */}

                {user && (
                    <section className='w-4/10 relative max-sm:hidden'>

                        <label className="input  w-full focus:outline-none" >
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
                            <input type="search" onChange={handleChange} value={search} className="grow focus:outline-none broder-3 border-slate-700" placeholder="Search" />

                        </label>
                        <div className='absolute w-full rounded-md bg-white font-semibold text-lg list-none '>
                            {
                                search.length > 1 && filterUser?.map((item, index) => {
                                    return (

                                        <div onClick={() => {
                                            navigate('/profile', { state: { user: item } })

                                            setSearch('')



                                        }} className='flex space-x-3 cursor-pointer items-center hover:bg-purple-900 hover:text-white p-2'>
                                            <ProfileIcon width={10} height={10}></ProfileIcon>
                                            <li key={index} >{item?.name}</li>
                                        </div>

                                    )
                                })
                            }

                        </div>

                    </section>
                )}


                {/* buttonss */}
                <section className='flex space-x-4 items-center'>

                    <div className='cursor-pointer md:hidden'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' ></FontAwesomeIcon>
                    </div>

                    {
                        user && (
                            <div className='cursor-pointer' onClick={() => navigate('/msg')}>
                                <FontAwesomeIcon icon={faFacebookMessenger} size='lg' />
                            </div>

                        )
                    }

                    <div className='cursor-pointer'>
                        <ThemeController></ThemeController>
                    </div>

                    {
                        user ?

                            (<div className="dropdown dropdown-center cursot-pointer">

                                <FontAwesomeIcon tabIndex={0} icon={faBell} size='lg' className='cursor-pointer' ></FontAwesomeIcon>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 lg:w-[400px] max-sm:w-52 p-2 shadow-sm md:w-52">
                                    <NotificationInfo></NotificationInfo>
                                </ul>
                            </div>)
                            :


                            ''
                    }


                    {!user ? (<div className='space-x-2'>
                        <button className="btn btn-active btn-secondary rounded-lg" onClick={() => navigate('/auth', { state: { from: 'signin' } })}>Login</button>

                        <button className="btn btn-active btn-success rounded-lg" onClick={() => navigate('/auth', { state: { from: 'signup' } })} >Registration</button>

                    </div>) : ''}

                    <div className="flex-none">

                        <div className="dropdown dropdown-end">


                            <div
                                tabIndex={0}
                                className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                                <div className="card-body">
                                    <span className="text-lg font-bold">8 Items</span>
                                    <span className="text-info">Subtotal: $999</span>
                                    <div className="card-actions">
                                        <button className="btn btn-primary btn-block">View cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>




                        {user ?


                            (


                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img
                                                alt="Tailwind CSS Navbar component"
                                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                        </div>
                                    </div>

                                    <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

                                        <li>
                                            <p className='font-semibold'>{user.name}</p>
                                        </li>
                                        <li>

                                            <a className="justify-between">
                                                Profile
                                                <span className="badge">New</span>
                                            </a>
                                        </li>
                                        <li><a>Settings</a></li>
                                        <li onClick={() => {
                                            navigate('/')
                                            dispatch(removeUser());
                                            console.log('after logout', user)

                                            socket.disconnect()
                                            if (user == null) {
                                                navigate('/')
                                            }

                                        }}><a>Logout</a></li>
                                    </ul>

                                </div>
                            )




                            :





                            ''}

                    </div>


                </section>


            </div>
        </div>
    )
}
