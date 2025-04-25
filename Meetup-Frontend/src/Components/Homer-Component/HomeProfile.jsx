import { faIdCard, faNewspaper } from '@fortawesome/free-regular-svg-icons'
import { faGear, faPeopleGroup, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CoverWithPicture } from './Components/CoverWithPicture'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'


export const HomeProfile = () => {
    const navigate = useNavigate()
    const user=useSelector(state=>state.SocialMedia.users)
    return (
        <div>

            <CoverWithPicture></CoverWithPicture>


            <section className='text-center mt-1 font-semibold'>
                <p className='text-lg'>{user?.name}</p>
                <p className='text-sm font-normal'> Software Engineer</p>
            </section>
            <br />

            <div className='px-4 '>

                <section className='flex justify-between items-center space-x-2 text-center'>

                    <div>
                        <p className='text-lg'>200</p>
                        <p className='text-sm text-gray-400  '>Post</p>
                    </div>
                    <div className='border-x-2 border-slate-400 px-3'>
                        <p className='text-lg'>2.5K</p>
                        <p className='text-sm text-gray-400'>Followers</p>
                    </div>

                    <div>
                        <p className='text-lg'>250</p>
                        <p className='text-sm text-gray-400'>Following</p>
                    </div>

                </section>
                <br />
                <hr className='text-gray-400' />



                <section>

                    <div className='flex space-x-2 cursor-pointer items-center' onClick={() => navigate('/profile')} >
                        <FontAwesomeIcon icon={faIdCard} className='w-5'></FontAwesomeIcon>
                        <p className='text-lg font-semibold hover:text-primary'>Profile</p>
                    </div>

                    <div className='flex space-x-2 cursor-pointer items-center'>
                        <FontAwesomeIcon icon={faUserGroup} className='w-5'></FontAwesomeIcon>
                        <p className='text-lg font-semibold hover:text-primary' onClick={() => navigate('/profile', { state: { 'feed': 'friends','user':user } })} >Friends</p>
                    </div>
                    <div className='flex space-x-2 cursor-pointer items-center'>
                        <FontAwesomeIcon icon={faNewspaper} className='w-5'></FontAwesomeIcon>
                        <p className='text-lg font-semibold hover:text-primary'>Latest News</p>
                    </div>
                    <div className='flex space-x-2 cursor-pointer items-center'>
                        <FontAwesomeIcon icon={faPeopleGroup} className='w-5'></FontAwesomeIcon>
                        <p className='text-lg font-semibold hover:text-primary'>Groups</p>
                    </div>

                    <div className='flex space-x-2 cursor-pointer items-center'>
                        <FontAwesomeIcon icon={faGear} className='w-5'></FontAwesomeIcon>
                        <p className='text-lg font-semibold hover:text-primary'>Settings</p>
                    </div>


                </section>





            </div>


        </div>
    )
}
