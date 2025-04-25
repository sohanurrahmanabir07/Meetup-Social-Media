import React, { useEffect, useState } from 'react'

import { ProfileIcon } from '../Components/Homer-Component/Components/ProfileIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faLocationDot, faPen } from '@fortawesome/free-solid-svg-icons'
import { NewPost } from '../Components/Homer-Component/Components/NewPost'
import { Post } from '../Components/Homer-Component/Components/Post'
import { About } from '../Components/Homer-Component/Components/Profile Component/About'
import { Photos } from '../Components/Homer-Component/Components/Profile Component/Photos'
import { FriendList } from '../Components/Homer-Component/Components/Profile Component/FriendList'
import { Link, NavLink, useLocation, useSearchParams } from 'react-router'
import { HomePhotos } from '../Components/Homer-Component/Components/Profile Component/HomePhotos'
import { HomeFriendList } from '../Components/Homer-Component/Components/Profile Component/HomeFriendList'
import { useMyPost } from '../CustomHooks/useMyPost'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { faMessage, faUser } from '@fortawesome/free-regular-svg-icons'

export const Profile = () => {

    const [active, setActive] = useState('feed')
    const location = useLocation()
    const [myPost, setMyPost] = useState(null)

    const [totalPost, setTotalPost] = useState(5)

    let myProfile = useSelector((state) => state.SocialMedia.users)
    const [user, setUser] = useState(location.state?.user || myProfile)

    const myFriend = myProfile.friends



    useEffect(() => {

        if (location.state?.user) {
            setUser(location.state.user);
        }
        if(location.state?.feed){
            setActive('friends')
        }
    }, [location.state]);

    useEffect(() => {
        if (user?._id) {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/mypost?id=${user._id}`, {
                withCredentials: true
            })
                .then((res) => setMyPost(res.data))
                .catch((err) => console.log(err.message));
        }
    }, [user]);


    return (
        <div className='md:max-w-[1500px] md:mx-auto flex'>


            <section className=' md:w-75/100 max-sm:w-full space-y-5 '>
                <div className='border-2 border-slate-500 rounded-sm'>

                    <section>
                        <div className=' lg:h-[400px] w-full overflow-y-hidden'>
                            <img className='object-cover' src={'https://i.pinimg.com/originals/30/5c/5a/305c5a457807ba421ed67495c93198d3.jpg'} alt="" />
                        </div>

                        <div className='md:flex justify-between lg:px-15 max-sm:px-5'>

                            <div className=' md:-mt-20 -mt-15 '>
                                <div>
                                    <img className={`md:w-[150px] md:h-[150px] w-[100px] h-[100px] object-cover border-4 border-white rounded-full `} src={'https://ofiles.kitety.com/ghibli/landingpage/e56036c6-2160-4ef3-bb7d-d189e2eb8c41.webp'} alt="" />
                                </div>
                            </div>

                            <div className='flex justify-between md:w-85/100 w-full items-center'>
                                <div>
                                    <p className='font-bold md:text-2xl'>{user?.name}</p>
                                </div>
                                <div>
                                    <button className="btn btn-soft btn-secondary ">Edit Profile <FontAwesomeIcon icon={faPen} size='sm'></FontAwesomeIcon></button>
                                </div>
                            </div>

                        </div>

                    </section>

                    <section className='flex space-x-3'>





                        {
                            ((location.state && (myProfile._id != location.state.user._id))) ?

                                !(myFriend[location.state.user._id]) ?

                                    (
                                        <div className='flex items-center btn  btn-ghost btn-secondary'  >
                                            <FontAwesomeIcon icon={faUser} size='lg' > </FontAwesomeIcon>
                                            <p>Add Friend</p>
                                        </div>
                                    )

                                    :

                                    (
                                        <div className='flex items-center btn  btn-ghost btn-secondary'>
                                            <FontAwesomeIcon icon={faUser} size='lg' > </FontAwesomeIcon>
                                            <p>Friends</p>
                                        </div>
                                    )


                                :
                                ''


                        }

                        {
                            ((location.state) && (location.state.user._id != myProfile._id)) ?
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
                            <p>Student</p>
                        </div>
                        <div className=' flex items-center space-x-2' >
                            <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
                            <p>Dhaka,Bangladesh</p>
                        </div>



                    </section>

                    <div className='px-2'>

                        <section role="tablist" className="tabs font-semibold tabs-border border-2 border-slate-500 py-2 border-b-0 border-x-0 ">
                            <NavLink><a role="tab" className={`tab ${active == `feed` ? `tab-active` : ``}`} onClick={() => setActive('feed')} >Feed</a></NavLink>
                            <NavLink><a role="tab" className={`tab ${active == `about` ? `tab-active` : ``}`} onClick={() => setActive('about')} >About</a></NavLink>
                            <NavLink> <a role="tab" className={`tab ${active == `photos` ? `tab-active` : ``}`} onClick={() => setActive('photos')} >Photos</a></NavLink>
                            <NavLink><a role="tab" className={`tab ${active == `friends` ? `tab-active` : ``}`} onClick={() => setActive('friends')} >Friends</a></NavLink>



                        </section>
                    </div>


                </div >

                {
                    active == 'feed' ? (

                        <div className='space-y-10'>

                            {
                                location.state && (location.state.user._id == myProfile._id) ?
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

                                    <About></About>
                                </div>
                            )
                            :
                            active == 'photos' ?
                                (
                                    <div className='max-sm:flex max-sm:justify-center max-sm:items-center'>

                                        <HomePhotos></HomePhotos>
                                    </div>
                                )
                                :
                                (
                                    <div className='max-sm:flex max-sm:justify-center max-sm:items-center '>

                                        <HomeFriendList friends={user?.friendList} ></HomeFriendList>
                                    </div>
                                )

                }



            </section >

            <section className='max-sm:hidden md:w-25/100 px-3 space-y-10'>

                <div className='border-2 border-slate-500 rounded-lg'>
                    <About></About>
                </div>
                <div className='border-2 border-slate-500 rounded-lg'>
                    <Photos active={active} setActive={setActive} ></Photos>
                </div>
                <div className='border-2 border-slate-500 rounded-lg'>
                    <FriendList friends={user?.friendList} active={active} setActive={setActive}  ></FriendList>
                </div>


            </section>


        </div >
    )
}
