
import { useLocation, useNavigate } from 'react-router'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../redux/SocialStore'
import socket from '../Socket/SocketServer'

export const Auth = () => {
    const user = useSelector((state) => state.SocialMedia.users)
    const location = useLocation()
    let type = location.state?.from

    if (!type) {
        type = 'signin'
    }

    const dispatch = useDispatch()

    const navigate = useNavigate()

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


            axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/registration`, formData, {
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

            axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, formData, {
                withCredentials: true,
                headers: {
                    'Content-type': 'application/json'
                }
            }).then((res) => {
                console.log(res)
                if (res.status == 201) {

                    navigate('/home')
                    Swal.fire({
                        title: "Login Successful!",
                        text: "You clicked the button!",
                        icon: "success"
                    })



           

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
        <div className='w-full h-screen md:flex md:items-center md:justify-center max-sm:px-10 '>


            <section className=' border-2 md:w-1/3 max-sm:w-full rounded-xl p-3 max-sm:mt-20'>

                <h3 className="font-bold text-lg text-center">{title}</h3>
                <form method="dialog" className='flex flex-col  space-y-3 py-3' onSubmit={handleSubmit}>

                    {type == 'signup' ? (<>


                        <label className="label">Name</label>
                        <input required type="text" className="input w-full" name="name" placeholder="Enter Your Name" onChange={handleForm} value={formData.name} />
                    </>) : ''}


                    {type == 'signup' ? (<>


                        <label className="label">Email</label>
                        <input required type="email" className="input w-full" name="email" placeholder="Enter Your Email" onChange={handleForm} value={formData.email} />
                    </>) : ''}


                    {type == 'signup' ?
                        <>

                            <label className="label">Address</label>
                            <input required type="text" className="input w-full" name="address" placeholder="Enter Your Address" onChange={handleForm} value={formData.address} />
                        </> : ''}
                    {type == 'signup' || 'signin' ?
                        <>


                            <label className="label">Phone</label>
                            <input required type="text" className="input w-full" name="phone" placeholder="Enter Your Phone" onChange={handleForm} value={formData.phone} />
                        </> : ''}

                    <label className="label">Password</label>
                    <input required type="password" className="input w-full" name="password" placeholder="Enter Your Password" onChange={handleForm} value={formData.password} />
                    {type == 'signup' ?
                        <>
   

                            <label className="label">Confirm Password</label>
                            <input required type="password" className="input w-full" name="confirmPassword" placeholder="Please Re-write password" nChange={handleForm} value={formData.confirmPassword} />
                        </> : ''}

                    <button  className="btn btn-neutral mt-4">{type=='signin'? 'Login': 'Register'}</button>





                </form>


            </section>






        </div>
    )
}
