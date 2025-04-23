
import { useLocation, useNavigate } from 'react-router'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { addUser } from '../redux/SocialStore'
import socket from '../Socket/SocketServer'

export const Auth = () => {

    const location = useLocation()
    const type = location.state.from

    const dispatch=useDispatch()

    const navigate=useNavigate()

    let [formData, setFormData] = useState({
        'name': '',
        'address': '',
        'email': '',
        'phone': '',
        'password': '',
        'confirmPassword': '',
        'friends': {},
        'chatHistory': {}
    })
    let title = ""
    if (type == 'signup') {
        title = "Sign Up"
    } else {
        title = "Sign In"
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (type == 'signup' && (formData.password == formData.confirmPassword)) {
            delete formData.confirmPassword


            axios.post(`${import.meta.env.VITE_BACKEND_URL}/registration`, formData, {
                withCredentials: true,
                headers: {
                    'Content-type': 'application/json'
                }
            }).then((res) => {
                console.log(res)
                if (res.status == 201) {
                    Swal.fire({
                        title: "Sign Up Successful!",
                        text: "You clicked the button!",
                        icon: "success"
                    })
                } else {

                    Swal.fire({
                        title: "SomeThing Went Wrong!",
                        text: "You clicked the button!",
                        icon: "error"
                    })
                }


            })
                .catch(err => {
                    console.log(err)
                    Swal.fire({
                        title: "Server Error!",
                        text: err.response.data.message,
                        icon: "error"
                    })

                })




        }

        if (type == 'signin') {
            delete formData.name
            delete formData.address
            delete formData.confirmPassword
            delete formData.email
            delete formData.chatHistory
            delete formData.friends

            axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, formData, {
                withCredentials: true,
                headers: {
                    'Content-type': 'application/json'
                }
            }).then((res) => {
                console.log(res)
                if (res.status == 201) {

                    navigate('/')
                    Swal.fire({
                        title: "Login Successful!",
                        text: "You clicked the button!",
                        icon: "success"
                    })

                    socket.connect()
                    


                    dispatch(addUser(res.data.data))
                }


            })
                .catch(err => {


                    console.log(err)
                    Swal.fire({
                        title: "Server Error!",
                        text: err.response.data.message,
                        icon: "error"
                    })
                }


                )

        }



        setFormData({
            'name': '',
            'address': '',
            'email': '',
            'phone': '',
            'password': '',
            'confirmPassword': '',
            'friends': {},
            'chatHistory': {}

        })
    }

    const handleForm = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value })

    }

    return (
        <div>


            <section className=' border-2  w-1/3 rounded-xl p-3 m-auto lg:mt-20'>

                <h3 className="font-bold text-lg text-center">{title}</h3>
                <form method="dialog" className='flex flex-col items-center space-y-3 py-3' onSubmit={handleSubmit}>

                    {type == 'signup' ? (<>
                        <p className='font-semibold'>Name</p>
                        <input type="text" name="name" className='w-3/4 rounded-md border-base-300 outline-2' onChange={handleForm} value={formData.name} />
                    </>) : ''}


                    {type == 'signup' ? (<>
                        <p className='font-semibold'>Email</p>
                        <input type="text" name="email" className='w-3/4 rounded-md border-base-300 outline-2' onChange={handleForm} value={formData.email} />
                    </>) : ''}

                    
                    {type == 'signup' ?
                        <>
                            <p className='font-semibold'>Address</p>
                            <input type="text" name="address" className='w-3/4 rounded-md border-base-300 outline-2' onChange={handleForm} value={formData.address} />
                        </> : ''}
                    {type == 'signup' || 'signin' ?
                        <>
                            <p className='font-semibold'>Phone</p>
                            <input type="text" name="phone" className='w-3/4 rounded-md border-base-300 outline-2' onChange={handleForm} value={formData.phone} />
                        </> : ''}
                    <p className='font-semibold'> Password</p>
                    <input type="password" className='w-3/4 rounded-md border-base-300 outline-2' name="password" onChange={handleForm} value={formData.password} />
                    {type == 'signup' ?
                        <>
                            <p className='font-semibold'>Confirm Password</p>
                            <input type="password" className='w-3/4 rounded-md border-base-300 outline-2' name="confirmPassword" onChange={handleForm} value={formData.confirmPassword} />
                        </> : ''}
                    <button className='btn '>Submit</button>


                </form>


            </section>






        </div>
    )
}
