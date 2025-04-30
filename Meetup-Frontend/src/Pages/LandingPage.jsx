
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HeroSection from '../assets/images/Landing-Page/HeroSection.webp'
import UpdatePost from '../assets/images/Landing-Page/UpdatePost.png'
import RealTimeChat from '../assets/images/Landing-Page/RealTime Chat.png'
import FriendRequest from '../assets/images/Landing-Page/bFriend Reequest.webp'
import { Hero } from './LandingPage Components/Hero'
import { faBullseye } from '@fortawesome/free-solid-svg-icons'
import { StepToUse } from './LandingPage Components/StepToUse/StepToUse'

export const LandingPage = () => {

    const writingPart1 = (
        <div className="space-y-5 w-1/2 text-center ">
            <p className="font-semibold md:text-5xl">Connect, Share, and Chat <br />Welcome to  <span className='text-orange-500'>M</span>eetup🔥</p>
            <p className="text-lg">Your hub for real-time conversations and photo sharing</p>
            <div>
                <button className="btn btn-outline hover:bg-purple-950 hover:text-gray-300 border-1 border-purple-950">Join Now</button>
            </div>
        </div>
    )

    const ImagePart1 = (
        <div className='md:w-1/2 '>

            <img src={HeroSection} className='md:h-[450px]' alt="" />
        </div>
    )

    const WritingPar2 = (
        <div className="space-y-5 w-1/2 text-center ">

            <p className="font-semibold md:text-4xl text-left">Speak your mind, share your world</p>


            <div className='flex space-x-2 items-center'>
                <FontAwesomeIcon icon={faBullseye} size='lg' className='text-red-500' ></FontAwesomeIcon>
                <p className="text-lg">Share text statuses or photo captions instantly.</p>
            </div>

            <div className='flex space-x-2 items-center'>
                <FontAwesomeIcon icon={faBullseye} size='lg' className='text-red-500'></FontAwesomeIcon>
                <p className="text-lg">Express thoughts, ideas, or moments from your life.</p>
            </div>
            <div className='flex space-x-2 items-center'>
                <FontAwesomeIcon icon={faBullseye} size='lg' className='text-red-500' ></FontAwesomeIcon>
                <p className="text-lg">Updates appear in real time on your personal feed.</p>
            </div>
            <div className='flex space-x-2 items-center'>
                <FontAwesomeIcon icon={faBullseye} size='lg' className='text-red-500' ></FontAwesomeIcon>
                <p className="text-lg">Built for both casual sharing and deep expression.</p>
            </div>
        </div>
    )

    const WritingPar3 = (
        <div className="space-y-5 w-1/2 text-center ">

            <p className="font-semibold md:text-4xl text-left">Real-Time Chat with Friends</p>


            <div className='flex space-x-2 items-center'>
                <FontAwesomeIcon icon={faBullseye} size='lg' className='text-red-500' ></FontAwesomeIcon>
                <p className="text-lg">Instant messaging with friends or groups..</p>
            </div>

            <div className='flex space-x-2 items-center'>
                <FontAwesomeIcon icon={faBullseye} size='lg' className='text-red-500'></FontAwesomeIcon>
                <p className="text-lg">See when others are typing or have read your message..</p>
            </div>
            <div className='flex space-x-2 items-center'>
                <FontAwesomeIcon icon={faBullseye} size='lg' className='text-red-500' ></FontAwesomeIcon>
                <p className="text-lg">Smooth real-time experience..</p>
            </div>
            <div className='flex space-x-2 items-center'>
                <FontAwesomeIcon icon={faBullseye} size='lg' className='text-red-500' ></FontAwesomeIcon>
                <p className="text-lg">Stay connected anytime, anywhere.</p>
            </div>
        </div>
    )

    const WritingPart4 = (
        <div className="space-y-5 w-1/2 text-center ">

            <p className="font-semibold md:text-4xl text-left"> Friend Requests / Accept</p>


            <div className='flex space-x-2 items-center'>
                <FontAwesomeIcon icon={faBullseye} size='lg' className='text-red-500' ></FontAwesomeIcon>
                <p className="text-lg">Send/receive friend requests in real time...</p>
            </div>

            <div className='flex space-x-2 items-center'>
                <FontAwesomeIcon icon={faBullseye} size='lg' className='text-red-500'></FontAwesomeIcon>
                <p className="text-lg">Grow your social circle naturally...</p>
            </div>
            <div className='flex space-x-2 items-center'>
                <FontAwesomeIcon icon={faBullseye} size='lg' className='text-red-500' ></FontAwesomeIcon>
                <p className="text-lg">Find, reconnect, and meet new people effortlessly..</p>
            </div>
            <div className='flex space-x-2 items-center'>
                <FontAwesomeIcon icon={faBullseye} size='lg' className='text-red-500' ></FontAwesomeIcon>
                <p className="text-lg">Instant notifications when someone Sends Friend Request and Accepts</p>
            </div>
        </div>
    )



    const ImagePart2 = (
        <div className='md:w-1/2 '>

            <img src={UpdatePost} className='md:h-[450px]' alt="" />
        </div>
    )

    const ImagePart3 = (
        <div className='md:w-1/2 '>

            <img src={RealTimeChat} className='md:h-[450px]' alt="" />
        </div>
    )
    const ImagePart4 = (
        <div className='md:w-1/2 '>

            <img src={FriendRequest} className='md:h-[450px]' alt="" />
        </div>
    )







    return (
        <div className="md:max-w-[1340px] md:m-auto">

            <section>

                <Hero Component1={writingPart1} Component2={ImagePart1} height={`h-screen`} ></Hero>
            </section>

            <section className='md:text-5xl font-semibold text-center mb-20'>
                <p>Features You Will Get</p>
            </section>

            <main className='space-y-15'>
                <section className='px-4'>
                    <Hero Component1={ImagePart2} Component2={WritingPar2}  ></Hero>
                </section>
                <section className='px-4'>
                    <Hero Component1={WritingPar3} Component2={ImagePart3}  ></Hero>
                </section>
                <section className='px-4'>
                    <Hero Component1={ImagePart4} Component2={WritingPart4}  ></Hero>
                </section>



            </main>


            <section className='my-20 text-center'>
                <p className='font-semibold text-5xl'>How to get Started with <span className='text-orange-500'>M</span>eetup🔥</p>
            </section>


            <section>
                <StepToUse></StepToUse>
            </section>







        </div>
    )
}
