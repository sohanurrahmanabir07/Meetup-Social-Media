import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const useMyPost = (id) => {
  const [myPost, setMyPost] = useState(null)


  useEffect(() => {
    if (id) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/mypost?id=${id}`, {
        withCredentials: true
      })
        .then((res) => setMyPost(res.data))
        .catch((err) => console.log(err.message))


    }

  }, [])


  return myPost


}
