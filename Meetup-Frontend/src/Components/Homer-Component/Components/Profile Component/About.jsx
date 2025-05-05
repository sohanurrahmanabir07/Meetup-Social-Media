import { faCalendar, faHeart } from "@fortawesome/free-regular-svg-icons"
import { faBriefcase, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export const About = ({user}) => {
    return (
        <div className="p-2">


            <p className="text-xl font-bold ">About</p>


            {/* __________Bio____________________ */}

            <div className="space-y-3">
                <p className="text-lg text-gray-500">
                   {user?.bio}
                </p>

                <div className="flex space-x-2  items-center text-lg">
                    <FontAwesomeIcon icon={faBriefcase} size="md"></FontAwesomeIcon>
                    <p className="text-gray-500 text-lg font-semibold">Works At:  {user?.worksAt || 'N/A'}  </p>
                </div>


                <div className="flex space-x-2 items-center text-lg">
                    <FontAwesomeIcon icon={faCalendar} size="md"></FontAwesomeIcon>
                    <p className="text-gray-500 text-lg font-semibold">Born:   { new Date(user?.dOb).toDateString() || 'N/A'} </p>
                </div>

                <div className="flex space-x-2 items-center text-lg">
                    <FontAwesomeIcon icon={faHeart} size="md"></FontAwesomeIcon>
                    <p className="text-gray-500 text-lg font-semibold">Status:  {user?.status || 'N/A'} </p>
                </div>


                <div className="flex space-x-2 items-center text-lg">
                    <FontAwesomeIcon icon={faLocationDot} size="md"></FontAwesomeIcon>
                    <p className="text-gray-500 text-lg font-semibold">Lives:  {user?.address || 'N/A'} </p>
                </div>



            </div>






        </div>
    )
}
