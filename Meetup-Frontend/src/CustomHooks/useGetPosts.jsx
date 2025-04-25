import axios from 'axios'
import React, { useEffect, useState } from 'react'
import socket from '../Socket/SocketServer'

export const useGetPosts = (user, page) => {

    const [postData, setPostData] = useState([])

    useEffect(() => {

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/newsFeed?page=${page}`, user, {
            withCredentials: true
        })
            .then((res) => {

                if (res.status == 201) {

                    setPostData(res.data)
                }
            })


        socket.on('InsertNewPost', (post) => {
            setPostData((prev) => [post, ...prev])
        })
        socket.on('updateFeed', (post) => {

            setPostData((prevData) => {
                const index = prevData.findIndex((item) => item._id === post._id);
                if (index !== -1) {
                    const newData = [...prevData];
                    newData[index] = post;
                    return newData;
                }
                return prevData; // no match found, return unchanged
            });
            console.log('All post',postData)
        })

        socket.on('getNotificaion',(data)=>{
            console.log('notificaiton',data)
        })


    }, [user, page])
    return postData
}
