import axios from 'axios'
import React, { useEffect, useState } from 'react'


export const useNotifactions = (id) => {
  const [notificaiton,setNotification]=useState(null)
  const p=1
  const l=10
  useEffect(()=>{

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/notification?p=${p}&l=${l}&id=${id}`,{
        withCredentials:true
    })
    .then((res)=>setNotification(res.data))
    .catch((err)=>console.log(err))

  },[])



  return notificaiton
}
