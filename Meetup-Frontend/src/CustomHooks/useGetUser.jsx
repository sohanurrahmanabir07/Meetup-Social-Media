import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const useGetUser = () => {
  const [allUsers,setAllUsers]=useState(null)

  useEffect(()=>{

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/getUsers`,{
        withCredentials:true
    })
    .then((res)=>setAllUsers(res.data))
    .catch((err)=>console.log(err))

    
  },[])
  return allUsers
}
