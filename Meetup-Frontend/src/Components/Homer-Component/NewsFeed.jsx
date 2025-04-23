

import { NewPost } from './Components/NewPost'
import { Post } from './Components/Post'

export const NewsFeed = () => {




  return (
    <div className='flex flex-col md:items-center py-5 space-y-5'>

      <NewPost></NewPost>

      <Post></Post>


    </div>
  )
}
