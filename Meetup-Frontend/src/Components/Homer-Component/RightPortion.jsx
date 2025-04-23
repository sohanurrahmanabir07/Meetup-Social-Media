
import { People } from './Components/People'
export const RightPortion = () => {
  return (
    <div className='space-y-5'>


      <People type={'online'}></People>

      <People type={'people you may know'} ></People>

    </div>
  )
}
