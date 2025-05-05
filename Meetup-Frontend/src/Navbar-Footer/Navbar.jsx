import React, { useEffect, useState } from 'react'
import { ThemeController } from './NavbarTools/ThemeController'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification, addTo_rqst_pnding_List, removeUser, update_rqst_pending } from '../redux/SocialStore'
import socket from '../Socket/SocketServer'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { NotificationInfo } from './NavbarTools/NotificationInfo'
import { faCircleXmark, faCross, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useGetUser } from '../CustomHooks/useGetUser'
import { ProfileIcon } from '../Components/Homer-Component/Components/ProfileIcon'
import { useIsMobile } from '../CustomHooks/useIsMobile'
import { Searching } from './NavbarTools/Searching'

export const Navbar = () => {
    const navigate = useNavigate()

    const user = useSelector((state) => state.SocialMedia.users)
    const dispatch = useDispatch()
    const [showSearch, setShowSearch] = useState(false)
    const isMobile = useIsMobile()
    const [unreadCount, setUnreadCount] = useState(0)
    const notification = useSelector((state) => state.SocialMedia.notification)
    const requestSet = useSelector((state) => state.SocialMedia.pendingList)


    useEffect(() => {
        const cnt = notification?.filter((item) => item.read === false || item.read === 'false').length
        setUnreadCount(cnt)
    }, [notification])


    useEffect(() => {

        socket.on('updateRqstPendingList', (result) => {

            dispatch(update_rqst_pending({ data: result.data, type: result.type }))

        })

    }, [])




    return (


        <div className=' dark:bg-slate-950 max-sm:p-2 bg-purple-950 text-gray-300 sticky top-0 '>

            {
                showSearch ?


                    (
                        <div className='relative'>

                            <Searching></Searching>
                            <FontAwesomeIcon icon={faCircleXmark} size='md'  onClick={()=>(setShowSearch(false))} className='absolute cursor-pointer -right-1 -top-1 text-slate-800 dark:text-gray-300 ' ></FontAwesomeIcon>

                        </div>



                    )

                    :


                    (
                        <div className="navbar  flex justify-between items-center lg:max-w-[1340px] lg:m-auto ">
                            <div className="cursor-pointer" onClick={() => navigate('/home')} >
                                <a className="text-2xl">Meetup🔥</a>
                            </div>
                            {/* searching box */}

                            {user && (
                                <section className='w-4/10 relative max-sm:hidden '>


                                    <Searching></Searching>

                                </section>
                            )}


                            {/* buttonss */}
                            <section className='flex space-x-4 items-center'>
                                {
                                    user && (
                                        <div className='cursor-pointer md:hidden' onClick={() => setShowSearch(true)} >
                                            <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' ></FontAwesomeIcon>
                                        </div>
                                    )
                                }


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

                                        (<div className="dropdown dropdown-center cursot-pointer  p-1 relative">

                                            <FontAwesomeIcon tabIndex={isMobile ? null : 0} onClick={isMobile ? () => navigate('/notification') : ''} icon={faBell} size='lg' className='cursor-pointer' ></FontAwesomeIcon>
                                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 lg:w-[400px] max-sm:w-52 p-2 shadow-sm md:w-52">
                                                <NotificationInfo unreadCount={unreadCount} setUnreadCount={setUnreadCount}></NotificationInfo>

                                            </ul>
                                            <p className='absolute -top-2 -right-2 bg-blue-600 text-gray-200 rounded-full text-xs w-4 h-4 text-center  '>{unreadCount}</p>
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
                                                        <ProfileIcon width={10} height={10} url={user?.pp} ></ProfileIcon>
                                                    </div>
                                                </div>

                                                <ul
                                                    tabIndex={0}
                                                    className="menu dark:text-gray-300 text-slate-800  menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

                                                    <li>
                                                        <p className='font-semibold'>{user.name}</p>
                                                    </li>
                                                    <li>

                                                        <div className="justify-between" onClick={()=> navigate('/profile', { state: { user: user } })} >
                                                            Profile
                                                            
                                                        </div>
                                                    </li>
                                                    <li><a>Settings</a></li>
                                                    <li onClick={() => {
                                                        navigate('/')
                                                        dispatch(removeUser());
           

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
                    )
            }


        </div>
    )
}
