import React, { useEffect, useState } from 'react'
import { useLocation, useOutletContext } from 'react-router'
import { Post } from './Post'

export const SinglePost = () => {
    const location = useLocation()
    const { postData, setPostData, HandleLike, handleDeletePost } = useOutletContext()
    const [post, setPost] = useState(null)


    useEffect(() => {

        if (location?.state?.item) {
            
            const result=postData.find((item,index)=>item._id==location.state.item.info._id)

            if(result!=-1){

                setPost(result)
            }
           
           

        }
    }, [location.state,postData])
    

   


    if (!post) {
        return (
            <div>
                <p className='font-semibold text-2xl' >No Post...</p>
            </div>

        )
    }
    return (
        <div className='md:max-w-[750px] md:m-auto'>
            {post && (  <Post item={post} HandleLike={HandleLike} handleDeletePost={handleDeletePost} ></Post>) }
          
        </div>
    )


}
