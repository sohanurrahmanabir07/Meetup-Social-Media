import React, { useRef, useState } from 'react'
import { ProfileIcon } from '../../../Components/Homer-Component/Components/ProfileIcon'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../../../redux/SocialStore'

export const UploadProfilePicture = ({user,type}) => {
    const uploadRef = useRef(null)
    const [Loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState(user?.pp)
    const [imageFile, setImageFile] = useState(null)
    const dispatch = useDispatch()
    const handleFile = (e) => {

        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file)
            setImageUrl(url)
            setImageFile(file)

        }
        else {
            Swal.fire({
                icon: "error",
                title: "Oops Image Couldnt Select...",
                text: "Something went wrong!",

            });
        }
    }


    const handleUpload = () => {
        const formData = new FormData()

        if (imageFile) {
            formData.append('image', imageFile)
            setLoading(true)
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/uploadpporcp?type=pp&id=${user._id}`, formData, {
                withCredentials: true
            })
                .then((res) => {
                    if (res.status == 201) {
                        dispatch(addUser(res.data.updatedUser))
                        Swal.fire({
                            title: "Edit Profile!",
                            text: 'Profile Updated Successfully',
                            icon: "success"
                        })
                    }
                })
                .catch((error)=>{
                    console.log(error)
                }).finally(()=>{
                    setLoading(false)
                })
            
        }else if(!imageFile && imageUrl=='none'){

            console.log('yes working')
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/removepporcp?id=${user?._id}&type=pp`,{
                withCredentials:true
            })
            .then((res)=>{
                if(res.status==201){
                    dispatch(addUser(res.data.updateUser))
                }
                else{
                    Swal.fire({
                        title: "Edit Profile!",
                        text: 'Picture Removed Successfully',
                        icon: "success"
                    })
                }
            })
        }
    }


    return (
        <div className='text-center' >
            <section className='flex items-center space-x-3'>
                <ProfileIcon
                    width={100}
                    url={imageUrl}
                    height={100} >

                </ProfileIcon>
                <div className="flex space-x-2">

                    <div>
                        <input type="file" accept="image/*" ref={uploadRef} onChange={handleFile} style={{ display: 'none' }} name="" id="" />
                        <button className="btn btn-secondary btn-dash" onClick={() => uploadRef.current.click()}> Upload</button>
                    </div>

                    <button disabled={((user?.pp=="")||(user?.pp==null)) ? true:false}  className="btn btn-secondary btn-dash" onClick={() => setImageUrl('none')}> Remove</button>

                </div>
            </section>
            <button onClick={handleUpload} disabled={(Loading || (!imageFile && (imageUrl==null || imageUrl!='none'))) && true} className='btn btn-secondary btn-dash'>{Loading && 'Saving...' || 'Save'}</button>

        </div>
    )
}
