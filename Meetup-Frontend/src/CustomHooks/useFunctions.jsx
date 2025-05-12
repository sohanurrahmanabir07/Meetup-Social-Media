import React from 'react'
import { useSelector } from 'react-redux'

export const useFunctions = () => {
    const user=useSelector((state)=>state.SocialMedia.users)
    const AllShow=(v)=>{
        console.log('The person is ',user?.name)
    }
    

    const Like=(v)=>{
        console.log('The Person Liked',v)
    }

    return {
        Like,AllShow
    }
}
