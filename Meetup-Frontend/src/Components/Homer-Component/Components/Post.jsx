import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ProfileIcon } from "./ProfileIcon"
import { faComment, faEllipsisVertical, faThumbsUp } from "@fortawesome/free-solid-svg-icons"
import { faShare } from "@fortawesome/free-solid-svg-icons"
import { SendingBox } from '../../../Pages/Messenger/Components/SendingBox'
import { Comment } from "./Comment"
import { useState } from "react"
import socket from "../../../Socket/SocketServer"
import { useSelector } from "react-redux"
import { DateTime } from "./DateTime"
import { useNavigate } from "react-router"


export const Post = ({ item, HandleLike,handleDeletePost }) => {
    const [totalComment, setTotalComment] = useState(4)
    const [messagField, setMessageField] = useState('')
    const [showComments, setShowComments] = useState(false)
    const user = useSelector((state) => state.SocialMedia.users)
    const navigate=useNavigate()
    const LikeList = new Set(item.likes)
    const handleLike = () => {
        const data = {
            senderID: user._id,
            receiverID: item.userID._id,
            info: item,
            type: 'like',
            TimeStamp: new Date()

        }
        socket.emit('incoming_notification', data)
    }

    const handleSend = (e) => {
        e.preventDefault()

        const comment = {
            userID: user._id,
            comment: messagField,
            postID: item._id,
            TimeStamp: new Date()
        }

        const data = {
            senderID: user._id,
            receiverID: item.userID._id,
            info: comment,
            type: 'comment',
            TimeStamp: new Date()

        }

        socket.emit('incoming_notification', data)

        setMessageField('')

    }






    if (item) {
        return (
            <div className="space-y-2 p-5 max-sm:p-2  dark:bg-slate-950 dark:text-gray-300 border-1 my-3 border-slate-400 rounded-md w-90/100  max-sm:w-full">



                <section className="flex justify-between  ">
                    <div className="flex space-x-2">
                        <ProfileIcon width={10} height={10} url={item?.userID?.pp} ></ProfileIcon>
                        <div>
                            <p onClick={()=>navigate('/profile',{state:{user:item?.userID}})} className="text-lg font-semibold"> {item?.userID['name']}  <span className="text-gray-500 text-sm">&#9679;</span> <span className="text-gray-500 text-sm" >{<DateTime item={item} ></DateTime>}</span> </p>
                            <p className="text-sm">{item?.userID?.worksAt || 'N/A'}</p>
                        </div>
                    </div>

                    {
                        user._id == item.userID._id && (
                            <div className="dropdown dropdown-end">

                                <FontAwesomeIcon className="w-5 cursor-pointer" tabIndex={0} icon={faEllipsisVertical} size="xs" ></FontAwesomeIcon>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm space-y-3">
                                    <p onClick={handleDeletePost}  className="hover:bg-purple-950 hover:text-gray-300 text-base font-semibold rounded-sm cursor-pointer">Delete</p>
                                    <p className="hover:bg-purple-950 hover:text-gray-300 text-base font-semibold rounded-sm cursor-pointer">Hide</p>
                                </ul>
                            </div>
                        )
                    }


                </section>


                {/* _____________Caption________________ */}
                <section>
                    <p className="text-base font-semibold">

                        {

                            item?.info || item?.caption

                        }</p>
                </section>

                {
                    item?.type == 'photo' ?

                        (

                            <section >
                                <img className="w-full rounded-lg aspect-square" src={`${item?.imageUrl || `https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=`} `} alt="" />
                            </section>

                        )
                        :

                        ''
                }


                <section className="flex justify-between items-center">

                    <div className="flex space-x-2">
                        <p className="text-base" onClick={() => HandleLike(item)} >
                            <FontAwesomeIcon icon={faThumbsUp} className={` cursor-pointer  ${LikeList.has(user._id) ? `text-blue-500` : ``} `} size="lg" ></FontAwesomeIcon> ({item?.likes?.length})

                        </p>
                        <p className="text-base">
                            <FontAwesomeIcon icon={faComment} className="cursor-pointer"  ></FontAwesomeIcon> ({item['comments']?.length})
                        </p>
                    </div>

                    <div>
                        <FontAwesomeIcon icon={faShare} className="cursor-pointer" size="xs"></FontAwesomeIcon>
                    </div>

                </section>


                <section className="flex items-center">
                    <ProfileIcon width={10} height={10}></ProfileIcon>
                    <div className="bg-purple-950  w-full h-50/100 text-white rounded-lg">
                        <SendingBox messagField={messagField} setMessageField={setMessageField} handleSend={handleSend} ></SendingBox>
                    </div>
                </section>
                <section className="lg:ml-10 max-sm:ml-3 w-full space-y-4 duration-300 ease-in">

                    {
                        showComments && item?.comments?.slice(0, totalComment).map((comment, index) => {

                            return (
                                <Comment key={index} comment={comment}></Comment>

                            )
                        })


                    }
                    {
                        showComments ? item?.comments?.length > totalComment ?
                            (
                                <div className="text-center">
                                    <button className="btn btn-ghost btn-secondary" onClick={() => setTotalComment((prev) => prev + 4)} >....Load More</button>
                                </div>
                            )
                            :
                            (
                                <div className="text-center">
                                    <button className="btn btn-ghost btn-secondary" onClick={() => setTotalComment((prev) => prev - 4)} >....Load Less</button>
                                </div>
                            )

                            :

                            ''
                    }
                    {
                        item?.comments?.length != 0 ? showComments ?
                            (
                                <div className="text-center">
                                    <button className="btn btn-ghost btn-secondary" onClick={() => setShowComments(!showComments)} >Hide Comments</button>
                                </div>

                            )
                            :
                            (<div className="text-center">
                                <button className="btn btn-ghost btn-secondary" onClick={() => setShowComments(!showComments)} >Show Comments</button>
                            </div>)
                            :
                            ''
                    }

                </section>






            </div>
        )
    }

}
