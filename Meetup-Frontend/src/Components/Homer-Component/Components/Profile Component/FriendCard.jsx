import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ProfileIcon } from "../ProfileIcon"
import { faMessage } from "@fortawesome/free-regular-svg-icons"
import { faUserXmark } from "@fortawesome/free-solid-svg-icons"


export const FriendCard = () => {
    return (
        <div className="border-2 p-5 border-slate-500 rounded-md  flex flex-col justify-center items-center  space-y-2">

            <ProfileIcon width={15} height={15} ></ProfileIcon>

            <p className="text-md font-semibold"> Ninja Hathori </p>

            <section className="flex space-x-5">

                <div className="tooltip cursor-pointer" data-tip="Send Message">
                   <FontAwesomeIcon icon={faMessage} size="lg" ></FontAwesomeIcon>
                </div>

                <div className="tooltip cursor-pointer" data-tip="Unfriend">
                   <FontAwesomeIcon icon={faUserXmark} size="lg" ></FontAwesomeIcon>
                </div>



            </section>




        </div>
    )
}
