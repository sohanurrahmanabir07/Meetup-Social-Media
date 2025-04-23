

import { NewPost } from './Components/NewPost'
import { Post } from './Components/Post'

export const NewsFeed = () => {


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      // You can now upload or preview the file here
    }
  };


  return (
    <div className='flex flex-col md:items-center py-5 space-y-5'>

      <NewPost handleNewPost={handleFileChange} ></NewPost>

      <Post></Post>


    </div>
  )
}
