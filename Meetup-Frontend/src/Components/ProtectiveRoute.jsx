import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router'

export const ProtectiveRoute = ({children}) => {
  const user=useSelector((state)=>state.SocialMedia.users)

  if(!user){
   return <Navigate to={"/auth"} replace ></Navigate>
  }else{
    return children
  }
}
