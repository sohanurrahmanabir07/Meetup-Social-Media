
import { Online } from '../../Pages/Messenger/Components/Online'
import { People } from './Components/People'
export const RightPortion = () => {
  return (
    <div className='space-y-5'>


      <div className='border-1  dark:bg-slate-950 dark:text-gray-300  border-slate-500 lg:h-[450px]  rounded-lg p-3 overflow-y-scroll'>
        <Online  ></Online>
      </div>

      <People type={'people you may know'} ></People>



    </div>
  )
}
