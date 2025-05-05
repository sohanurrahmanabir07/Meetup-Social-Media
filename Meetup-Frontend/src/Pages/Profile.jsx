import React, { useEffect, useRef, useState } from 'react'

import { ProfileIcon } from '../Components/Homer-Component/Components/ProfileIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faLocationDot, faPen, faXmark } from '@fortawesome/free-solid-svg-icons'
import { NewPost } from '../Components/Homer-Component/Components/NewPost'
import { Post } from '../Components/Homer-Component/Components/Post'
import { About } from '../Components/Homer-Component/Components/Profile Component/About'
import { Photos } from '../Components/Homer-Component/Components/Profile Component/Photos'
import { FriendList } from '../Components/Homer-Component/Components/Profile Component/FriendList'
import { Link, NavLink, useLocation, useSearchParams } from 'react-router'
import { HomePhotos } from '../Components/Homer-Component/Components/Profile Component/HomePhotos'
import { HomeFriendList } from '../Components/Homer-Component/Components/Profile Component/HomeFriendList'
import { useMyPost } from '../CustomHooks/useMyPost'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { faMessage, faUser } from '@fortawesome/free-regular-svg-icons'
import socket from '../Socket/SocketServer'
import { addTo_rqst_pnding_List, remove_rqst_pnding_List } from '../redux/SocialStore'
import { Modal } from '../Components/Modal'
import { EditProfile } from './Profile Component/Edit Profile/EditProfile'
import { UploadProfilePicture } from './Profile Component/Edit Profile/UploadProfilePicture'
import NoProfile from '../../src/assets/images/profile picture/emptypic.webp'
import Swal from 'sweetalert2'

export const Profile = () => {

    const [active, setActive] = useState(localStorage.getItem('active') || 'feed')
    const location = useLocation()
    const [loading, setLoading] = useState(false)
    const [myPost, setMyPost] = useState(null)
    const [photos, SetPhotos] = useState([])
    const [totalPost, setTotalPost] = useState(5)

    let myProfile = useSelector((state) => state.SocialMedia.users)
    const dispatch = useDispatch()
    const pendingSet = new Set(useSelector((state) => state.SocialMedia.pendingSet))
    const requestSet = new Set(useSelector((state) => state.SocialMedia.requestSet))
    const pendingList = useSelector((state) => state.SocialMedia.pendingList)
    const requestList = useSelector((state) => state.SocialMedia.requestList)
    const [user, setUser] = useState(location.state?.user || myProfile)
    const box = useRef(null)

    const updateProfilePicuter = useRef(null)
    const myFriend = myProfile?.friends



    useEffect(() => {

        if (location.state?.user) {
            localStorage.setItem('profile', JSON.stringify(location.state.user))


            setUser(JSON.parse(localStorage.getItem('profile')))

        } else {
            setUser(myProfile)
        }
        if (location.state?.feed) {
            localStorage.setItem('active', location.state.feed)
            setActive(localStorage.getItem('active'))
        }




    }, [location.state, myProfile]);

    useEffect(() => {
        if (user?._id) {


            setLoading(true)
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/mypost?id=${user?._id}`, {
                withCredentials: true
            })
                .then((res) => {
                    setLoading(false)

                    setMyPost(res.data)
                })
                .catch((err) => console.log(err.message));
        }
    }, [user]);
    useEffect(() => {
        let photoArr = []
        myPost && myPost.map((item, index) => {
            if (item.type == 'photo' && item.imageUrl != null) {
                photoArr.push(item.imageUrl)
            }
        })

        SetPhotos(photoArr.reverse())

    }, [myPost])


    useEffect(() => {


        return () => {
            localStorage.removeItem('profile')
            localStorage.removeItem('active')

        }
    }, [])

    const handleRequest_Accept = (v) => {

        const data = {
            senderID: myProfile?._id,
            receiverID: JSON.parse(localStorage.getItem('profile'))?._id,
            type: v,
            info: null,
            TimeStamp: JSON.stringify(new Date())

        }
        let rqst_data = {
            senderID: myProfile,
            receiverID: JSON.parse(localStorage.getItem('profile')),
            pending: true,
            TimeStamp: JSON.stringify(new Date())
        }
        let Info = null
        if (v == 'requestAccept') {
            Info = pendingList.find((item) => item.senderID?._id == JSON.parse(localStorage.getItem('profile'))?._id)



        } else if (v == 'friendRequest') {


            dispatch(addTo_rqst_pnding_List({ data: [rqst_data], type: 'rqstList' }))

            const temp = { ...rqst_data }

            temp.senderID = myProfile?._id,
                temp.receiverID = JSON.parse(localStorage.getItem('profile'))?._id
            Info = temp

        } else if (v == 'cancelRequest') {
            Info = requestList.find((item) => item.receiverID?._id == JSON.parse(localStorage.getItem('profile'))?._id)
            const temp = { ...Info }
            temp.senderID = Info.senderID._id
            temp.receiverID = Info.receiverID._id
            Info = temp
            if (Info) {
                dispatch(remove_rqst_pnding_List({ data: JSON.parse(localStorage.getItem('profile'))._id, type: 'rqstList' }))
            }

        }
        else {
            console.log('cancelPending')
            Info = pendingList.find((item) => item?.senderID?._id == JSON.parse(localStorage.getItem('profile'))?._id)
            console.log('Info of deleting ', Info)

            if (Info) {
                const temp = { ...Info }
                temp.senderID = Info.senderID._id
                temp.receiverID = Info.receiverID._id
                Info = temp
            }


            if (Info) {
                dispatch(remove_rqst_pnding_List({ data: JSON.parse(localStorage.getItem('profile'))._id, type: 'pendingList' }))
            }

        }






        if (Info != -1) {
            data.info = Info

            socket.emit('incoming_notification', data)
        }





    }

    const handleModal = () => {

        box.current.showModal()

    }

    const handleFriend = () => {

        Swal.fire({
            title: "Do you want break your FriendShip?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Unfriend Now",
            denyButtonText: `No Way`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                socket.emit('unfriend',{friend:user, me: myProfile })

                Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }


    return (
        <div className='md:max-w-[1500px] md:mx-auto flex'>


            <section className=' md:w-75/100 max-sm:w-full space-y-5 '>
                <div className='border-2 border-slate-500 rounded-sm'>

                    <section>
                        {/* ------Cover picture---- */}
                        <div className=' lg:h-[400px] w-full overflow-y-hidden'>
                            <img className='object-cover' src={'https://i.pinimg.com/originals/30/5c/5a/305c5a457807ba421ed67495c93198d3.jpg'} alt="" />
                        </div>

                        <div className='md:flex justify-between lg:px-15 max-sm:px-5'>

                            <div className=' md:-mt-20 -mt-15 '>
                                <div className='relative md:w-[150px] md:h-[150px] w-[100px] h-[100px] '>
                                    <img className={`md:w-[150px] md:h-[150px] w-[100px] h-[100px] object-cover border-4 border-white rounded-full `} src={user?.pp != null ? user.pp : NoProfile} alt="" />
                                    {/* <ProfileIcon width={150} height={150} url={user?.pp} ></ProfileIcon> */}
                                    {
                                        user._id == myProfile._id ?
                                            (<div className='absolute bottom-0 right-0 ' ref={updateProfilePicuter} onClick={() => updateProfilePicuter.current.showModal()}>
                                                <FontAwesomeIcon className='cursor-pointer' icon={faPen} size='base' ></FontAwesomeIcon>

                                            </div>)
                                            :
                                            ''

                                    }

                                </div>

                            </div>
                            <Modal box={box} Component={<EditProfile></EditProfile>} ></Modal>
                            <Modal box={updateProfilePicuter} Component={<UploadProfilePicture user={myProfile} ></UploadProfilePicture>} ></Modal>

                            <div className='flex justify-between md:w-85/100 w-full items-center'>
                                <div>
                                    <p className='font-bold md:text-2xl'>{user?.name}</p>
                                </div>
                                {
                                    ((localStorage.getItem('profile') && (myProfile?._id != JSON.parse(localStorage.getItem('profile'))?._id))) ?
                                        ''
                                        :
                                        (
                                            <>
                                                <div onClick={handleModal}>
                                                    <button className="btn btn-soft btn-secondary ">Edit Profile <FontAwesomeIcon icon={faPen} size='sm'></FontAwesomeIcon></button>
                                                </div>

                                            </>
                                        )
                                }

                            </div>

                        </div>

                    </section>

                    <section className='flex space-x-3'>






                        {
                            ((localStorage.getItem('profile') && (myProfile?._id != JSON.parse(localStorage.getItem('profile'))?._id))) ?

                                !(myFriend[JSON.parse(localStorage.getItem('profile'))?._id]) ?


                                    pendingSet.has(JSON.parse(localStorage.getItem('profile'))?._id) ?
                                        (
                                            <section className='flex space-x-2'>
                                                <div className='flex items-center btn  btn-ghost btn-secondary' onClick={() => handleRequest_Accept('requestAccept')} >
                                                    <FontAwesomeIcon icon={faUser} size='lg' > </FontAwesomeIcon>
                                                    <p>Accept Request?</p>
                                                </div>

                                                <div className='flex items-center btn  btn-ghost btn-secondary' onClick={() => handleRequest_Accept('cancelPending')} >
                                                    <FontAwesomeIcon icon={faXmark} size='lg' > </FontAwesomeIcon>
                                                    <p>Delete Request</p>
                                                </div>


                                            </section>

                                        )
                                        :

                                        requestSet.has(JSON.parse(localStorage.getItem('profile'))?._id) ?



                                            (
                                                <div className='flex items-center btn  btn-ghost btn-secondary' onClick={() => handleRequest_Accept('cancelRequest')} >
                                                    <FontAwesomeIcon icon={faUser} size='lg' > </FontAwesomeIcon>
                                                    <p>Cancel Request?</p>
                                                </div>
                                            )



                                            :






                                            (
                                                <div className='flex items-center btn  btn-ghost btn-secondary' onClick={() => handleRequest_Accept('friendRequest')} >
                                                    <FontAwesomeIcon icon={faUser} size='lg' > </FontAwesomeIcon>
                                                    <p>Add Friend</p>
                                                </div>
                                            )




                                    :

                                    (
                                        <div className='flex items-center btn  btn-ghost btn-secondary' onClick={handleFriend}>
                                            <FontAwesomeIcon icon={faUser} size='lg' > </FontAwesomeIcon>
                                            <p>Friends</p>
                                        </div>
                                    )


                                :
                                ''




                        }

                        {
                            ((localStorage.getItem('profile')) && (JSON.parse(localStorage.getItem('profile'))?._id != myProfile?._id)) ?
                                (
                                    < div className='flex items-center btn btn-ghost btn-secondary'>
                                        <FontAwesomeIcon icon={faMessage} size='lg' > </FontAwesomeIcon>
                                        <p>Message</p>
                                    </div>
                                )
                                :
                                ''

                        }




                    </section>


                    <section className='flex space-x-3 flex-wrap  my-3 px-2'>

                        <div className=' flex items-center space-x-2'>
                            <FontAwesomeIcon icon={faBriefcase}></FontAwesomeIcon>
                            <p>{user?.worksAt || 'N/A'}</p>
                        </div>
                        <div className=' flex items-center space-x-2' >
                            <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
                            <p>{user?.address || 'N/A'} </p>
                        </div>



                    </section>

                    <div className='px-2'>

                        <section role="tablist" className="tabs font-semibold tabs-border border-2 border-slate-500 py-2 border-b-0 border-x-0 ">
                            <NavLink><p role="tab" className={`tab ${active == `feed` ? `tab-active` : ``}`} onClick={() => setActive('feed')} >Feed</p></NavLink>
                            <NavLink><p role="tab" className={`tab ${active == `about` ? `tab-active` : ``}`} onClick={() => setActive('about')} >About</p></NavLink>
                            <NavLink> <p role="tab" className={`tab ${active == `photos` ? `tab-active` : ``}`} onClick={() => setActive('photos')} >Photos</p></NavLink>
                            <NavLink><p role="tab" className={`tab ${active == `friends` ? `tab-active` : ``}`} onClick={() => setActive('friends')} >Friends</p></NavLink>



                        </section>
                    </div>


                </div >

                {
                    active == 'feed' ? (

                        <div className='space-y-10'>

                            {
                                localStorage.getItem('profile') && (JSON.parse(localStorage.getItem('profile'))?._id == myProfile?._id) ?
                                    (
                                        <section>
                                            <NewPost></NewPost>
                                        </section>
                                    )
                                    :
                                    ''
                            }

                            <section>

                                {
                                    loading ?
                                        (
                                            <p className='text-3xl font-bold text-center'>
                                                ...Loading...
                                            </p>
                                        )
                                        :
                                        myPost != null && myPost?.slice(0, totalPost).map((item, index) => {
                                            return (<Post key={index} item={item}></Post>)
                                        })



                                }
                                {
                                    myPost?.length > totalPost ?
                                        (
                                            <div className="text-center">
                                                <button className="btn btn-ghost btn-secondary" onClick={() => setTotalPost((prev) => prev + 5)} >....Load More</button>
                                            </div>
                                        )
                                        :

                                        myPost?.length == 0 ?

                                            (
                                                <div>
                                                    <p className='text-3xl font-bold text-center'>
                                                        ...No Post Yet...
                                                    </p>
                                                </div>
                                            )
                                            :
                                            (
                                                <div className="text-center">
                                                    <button className="btn btn-ghost btn-secondary" onClick={() => setTotalPost((prev) => prev - 5)} >....Load Less</button>
                                                </div>
                                            )
                                }

                            </section>

                        </div>



                    )

                        :
                        active == 'about' ?

                            (
                                <div>

                                    <About user={user}></About>
                                </div>
                            )
                            :
                            active == 'photos' ?
                                (
                                    <div className='max-sm:flex max-sm:justify-center max-sm:items-center'>

                                        <HomePhotos photos={photos}></HomePhotos>
                                    </div>
                                )
                                :
                                (
                                    <div className='max-sm:flex max-sm:justify-center max-sm:items-center '>

                                        <HomeFriendList friends={user.friendList ? user.friendList : ''} ></HomeFriendList>
                                    </div>
                                )

                }



            </section >

            <section className='max-sm:hidden md:w-25/100 px-3 space-y-10'>

                <div className='border-2 border-slate-500 rounded-lg'>
                    <About user={user}></About>
                </div>
                <div className='border-2 border-slate-500 rounded-lg'>
                    <Photos active={active} setActive={setActive} photos={photos} ></Photos>
                </div>
                <div className='border-2 border-slate-500 rounded-lg'>
                    <FriendList friends={user?.friendList} active={active} setActive={setActive}  ></FriendList>
                </div>


            </section>


        </div >
    )
}
