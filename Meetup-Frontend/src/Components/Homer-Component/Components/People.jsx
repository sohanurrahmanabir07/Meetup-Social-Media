
import { ProfileIcon } from './ProfileIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export const People = ({type}) => {
    const addFreind=(
        <span className='cursor-pointer text-center'>
            <FontAwesomeIcon icon={faPlus} size='md' ></FontAwesomeIcon>
        </span>
    )
    return (
        <div className='border-1  dark:bg-slate-950 dark:text-gray-300 border-slate-500 lg:h-[450px]  rounded-lg p-3 overflow-y-scroll'>


            <p className='text-lg font-semibold border-b-2 border-slate-500 pb-2'> {type=='online' ? ('People Who are Online') : 'People You May Know' } {type=='online'? (<span className="text-green-600 text-sm">&#9679;</span>) : '' } </p>


            <div className='space-y-2 cursor-pointer rounded-lg'>
                <section className="flex space-x-2 items-center  rounded-md   hover:bg-purple-700 hover:text-gray-200">
                    <ProfileIcon width={10} height={10} ></ProfileIcon>
                    <div>
                        <p className="text-base font-semibold">Sohanur Rahman Abir{type=='online'? (<span className="text-green-600 text-sm">&#9679;</span>) : addFreind } </p>
                 
                    </div>
                </section>

                <section className="flex space-x-2 items-center   rounded-md  hover:bg-purple-700 hover:text-gray-200">
                    <ProfileIcon width={10} height={10} ></ProfileIcon>
                    <div>
                        <p className="text-lg font-semibold">Keniji Takashi  {type=='online'? (<span className="text-green-600 text-sm">&#9679;</span>) : '' } </p>
                 
                    </div>
                </section>
                <section className="flex space-x-2 items-center  rounded-md  hover:bg-purple-700 hover:text-gray-200">
                    <ProfileIcon width={10} height={10} ></ProfileIcon>
                    <div>
                        <p className="text-lg font-semibold">Ninja Hathori  {type=='online'? (<span className="text-green-600 text-sm">&#9679;</span>) : '' } </p>
                 
                    </div>
                </section>

                
            </div>






        </div>
    )
}
