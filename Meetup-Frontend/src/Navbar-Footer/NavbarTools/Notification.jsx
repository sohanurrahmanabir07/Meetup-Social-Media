import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ProfileIcon } from "../../Components/Homer-Component/Components/ProfileIcon"
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons"
import { faUserPlus } from "@fortawesome/free-solid-svg-icons"


export const Notification = ({ item }) => {


    return (
        <li className="list-row">
            {/* <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" /></div> */}
            <ProfileIcon width={10} height={10} ></ProfileIcon>

            <div>
                <p className="list-col-wrap text-base">
                    {item.senderID.name}<span className='font-semibold'></span> Has {item.type == 'comment' ? ' Commented' : 'Liked'} Your Post
                </p>
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
