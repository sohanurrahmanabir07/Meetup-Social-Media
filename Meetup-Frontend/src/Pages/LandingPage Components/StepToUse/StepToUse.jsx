import { Content } from "./Component/Content"
import { TimeLineMiddle } from "./Component/TimeLineMiddle"
import CreateAccount from '../../../assets/images/Landing-Page/CreateAccount2.webp'

import AddFreind from '../../../assets/images/Landing-Page/AddFriend.webp'
import Comment from '../../../assets/images/Landing-Page/Comment.png'

import UploadImage from '../../../assets/images/Landing-Page/UploadImage.webp'


import GroupChat from '../../../assets/images/Landing-Page/GroupChat.png'
import SendMessage from '../../../assets/images/Landing-Page/SendMessage.webp'




export const StepToUse = () => {


    const Content1 = (
        <div className="text-center">
            <p className="font-semibold md:text-2xl text-lg">Step One</p>
            <p className="font-semibold md:text-lg">Create Account and Sign in</p>
        </div>
    )

    const Content2 = (
        <div className="text-center">
            <p className="font-semibold md:text-2xl text-lg">Step Two</p>
            <p className="font-semibold md:text-lg">Search For Friends And Send Friend Request</p>
        </div>
    )

    const Content3 = (
        <div className="text-center">
            <p className="font-semibold md:text-2xl text-lg">Step Three</p>
            <p className="font-semibold md:text-lg">Like And Write Your Emotions to your Friends Post </p>
        </div>
    )

    const Content4 = (
        <div className="text-center">
            <p className="font-semibold md:text-2xl text-lg">Step Four</p>
            <p className="font-semibold md:text-lg">Update Your Feed With Status or Photo with Captions </p>
        </div>
    )

    const Content5 = (
        <div className="text-center">
            <p className="font-semibold md:text-2xl text-lg">Step Five</p>
            <p className="font-semibold md:text-lg">Send Message to your Friends  </p>
        </div>
    )

    const Content6 = (
        <div className="text-center">
            <p className="font-semibold  md:text-2xl text-lg">Step Six</p>
            <p className="font-semibold md:text-lg"> Make a group and Send Messages  </p>
        </div>
    )
    const Content7 = (
        <div className="text-center">
            <p className="font-semibold  md:text-2xl text-lg">In Future</p>
            <p className="font-semibold md:text-lg">More Feature will come </p>
        </div>
    )

    return (
        <div>


            <ul className="timeline timeline-vertical">
                <li>
                    <div className="timeline-start timeline-box">

                        <Content img={CreateAccount} content={Content1}  ></Content>

                    </div>
                    <TimeLineMiddle></TimeLineMiddle>

                    <hr className="bg-gray-200" />
                </li>
                <li>
                <hr className="bg-gray-200" />
                    <TimeLineMiddle></TimeLineMiddle>

                    <div className="timeline-end timeline-box">

                        <Content img={AddFreind} content={Content2}  ></Content>

                    </div>
                    <hr className="bg-gray-200" />
                </li>
                <li>
                <hr className="bg-gray-200" />
                    <div className="timeline-start timeline-box">

                        <Content img={Comment} content={Content3}  ></Content>

                    </div>
                    <TimeLineMiddle></TimeLineMiddle>
                    <hr className="bg-gray-200" />
                </li>
                <li>
                <hr className="bg-gray-200" />
                    <TimeLineMiddle></TimeLineMiddle>
                    <div className="timeline-end timeline-box">

                        <Content img={UploadImage} content={Content4}  ></Content>

                    </div>

                    <hr className="bg-gray-200" />
                </li>
                <li>
                <hr className="bg-gray-200" />
                    <div className="timeline-start timeline-box">

                        <Content img={SendMessage} content={Content5}  ></Content>

                    </div>
                    <TimeLineMiddle></TimeLineMiddle>
                    <hr className="bg-gray-200" />
                </li>
                <li>
                <hr className="bg-gray-200" />
                    <TimeLineMiddle></TimeLineMiddle>
                    <div className="timeline-end timeline-box">

                        <Content img={GroupChat} content={Content6}  ></Content>

                    </div>
                    <hr className="bg-gray-200" />
                </li>

                <li>
                <hr className="bg-gray-200"  />
                    <TimeLineMiddle></TimeLineMiddle>
                    <div className="timeline-start timeline-box">

                        <Content img={CreateAccount} content={Content7}  ></Content>

                    </div>
                </li>

            </ul>
        </div>
    )
}
