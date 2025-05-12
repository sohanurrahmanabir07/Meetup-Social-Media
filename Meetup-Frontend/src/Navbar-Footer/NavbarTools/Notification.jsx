import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ProfileIcon } from "../../Components/Homer-Component/Components/ProfileIcon"
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons"
import { faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"

import { useRef } from "react"



export const Notification = ({ item, handleMarkRead, index }) => {
    const user = useSelector((state) => state.SocialMedia.users)
    const navigate = useNavigate()
    const openNotification=useRef(null)
    return (

        <li  className={`list-row max-sm:rounded-sm  ${item?.read == false ? `bg-purple-600 text-white` : ''}  my-3 `} onClick={() => handleMarkRead(index)} >

            <div className="flex items-center" onClick={() => navigate('/profile', { state: { user: item.senderID } })}>
                <ProfileIcon url={item?.senderID?.pp} width={10} height={10} ></ProfileIcon>
            </div>

            <div ref={openNotification}  > 

                {
                    item.type == 'comment' || item.type == 'like' ?
                        (
                            <p className="list-col-wrap text-base" onClick={()=> navigate('/post', { state: { 'item': item } })}>
                                {item.senderID?.name}<span className='font-semibold'></span> Has {item.type == 'comment' ? ' Commented' : 'Liked'} Your Post
                            </p>
                        )
                        :

                        item.type == 'friendRequest' ?
                            (

                                <p className="list-col-wrap text-base" onClick={() => navigate('/profile', { state: { 'user': item?.info?.senderID, 'feed': 'friends' } })}>
                                    {item?.info?.senderID?.name}<span className='font-semibold'></span> Has Sent You Friend Request
                                </p>

                            )
                            :
                            (

                                <p className="list-col-wrap text-base" onClick={() => navigate('/profile', { state: { user: item.info?.receiverID } })}>
                                    {item?.info?.receiverID?.name}<span className='font-semibold'></span> Has Accepted Your Friend Request
                                </p>

                            )
                }



            </div>
            <button className="btn btn-square btn-ghost">
                {
                    item.type == 'comment' ?
                        (<FontAwesomeIcon icon={faComment} ></FontAwesomeIcon>
                        )
                        :
                        item.type == 'like' ?
                            (<FontAwesomeIcon icon={faHeart} ></FontAwesomeIcon>)
                            :
                            (<FontAwesomeIcon icon={faUserPlus} ></FontAwesomeIcon>)

                }





            </button>

        </li>

    )
}
