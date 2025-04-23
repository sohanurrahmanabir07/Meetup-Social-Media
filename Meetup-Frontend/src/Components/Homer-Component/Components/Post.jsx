import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ProfileIcon } from "./ProfileIcon"
import { faComment, faThumbsUp } from "@fortawesome/free-regular-svg-icons"
import { faShare } from "@fortawesome/free-solid-svg-icons"
import { SendingBox } from '../../../Pages/Messenger/Components/SendingBox'
import { Comment } from "./Comment"

export const Post = () => {
    return (
        <div className="space-y-2 p-5 max-sm:p-2 border-2 my-3 border-slate-400 rounded-md w-90/100  max-sm:w-full">

            <section className="flex space-x-2">
                <ProfileIcon width={12} height={12} ></ProfileIcon>
                <div>
                    <p className="text-lg font-semibold">Sohanur Rahman Abir  <span className="text-gray-500 text-sm">&#9679;</span> <span className="text-gray-500 text-sm" >21 Hours Ago</span> </p>
                    <p className="text-sm">Software Engineer at Google</p>
                </div>

            </section>
            {/* _____________Caption________________ */}
            <section>
                <p className="text-base font-semibold text-gray-600">I'm thrilled to share that I've completed a graduate certificate course in project management with the president's honor roll.</p>
            </section>

            <section >
                <img className="w-full rounded-lg " src={`https://www.hindustantimes.com/ht-img/img/2025/03/29/550x309/8__taare_zameen_par_1743059484900_1743247296802.jpg`} alt="" />
            </section>

            <section className="flex justify-between items-center">

                <div className="flex space-x-2">
                    <p className="text-base"><FontAwesomeIcon icon={faThumbsUp} className=" cursor-pointer" size="lg" ></FontAwesomeIcon> (59)</p>
                    <p className="text-base">
                        <FontAwesomeIcon icon={faComment} className="cursor-pointer"  ></FontAwesomeIcon> (60)
                    </p>
                </div>

                <div>
                    <FontAwesomeIcon icon={faShare} className="cursor-pointer" size="xs"></FontAwesomeIcon>
                </div>

            </section>


            <section className="flex items-center">
                <ProfileIcon width={12} height={12}></ProfileIcon>
                <div className="bg-purple-500  w-full h-50/100 text-white   p-1 rounded-lg">
                    <SendingBox></SendingBox>
                </div>
            </section>
            <section className="lg:ml-10 max-sm:ml-3 w-full space-y-4">
                <Comment></Comment>
                <Comment></Comment>
            </section>






        </div>
    )
}
