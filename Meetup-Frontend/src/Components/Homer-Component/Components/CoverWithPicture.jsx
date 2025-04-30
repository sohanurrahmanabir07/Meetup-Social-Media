import { useLocation } from "react-router"
import { ProfileIcon } from "./ProfileIcon"


export const CoverWithPicture = () => {
    const location=useLocation()
    
    return (
        <section>
            <div className='lg:h-[120px] overflow-y-hidden'>
                <img className='object-cover' src={'https://i.pinimg.com/originals/30/5c/5a/305c5a457807ba421ed67495c93198d3.jpg'} alt="" />
            </div>

            <div className='w-full flex items-center justify-center -mt-10'>
                <ProfileIcon width={150} height={150}></ProfileIcon>
            </div>

            
        </section>
    )
}
