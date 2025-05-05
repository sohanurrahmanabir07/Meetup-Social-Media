import { faCalendar, faCircleXmark, faImage, faSmile } from "@fortawesome/free-regular-svg-icons"
import { faVideo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import Swal from "sweetalert2"
import socket from "../../../Socket/SocketServer"
import { ProfileIcon } from "./ProfileIcon"

export const NewPost = () => {
    const PhotoInputRef = useRef();
    const VideoInputRef = useRef()
    const [imagePath, setImagePath] = useState(null)
    const [File, setFile] = useState(null)
    const [Loading, setLoading] = useState(false)
    const user = useSelector((state) => state.SocialMedia.users)
    const [newPost, setNewPost] = useState({
        userID: user._id,
        type: 'status',
        info: '',
        caption: '',
        imageUrl: '',
        TimeStamp: new Date()
    })

    const handleClick = (v) => {

        if (v == 'photo') {
            PhotoInputRef.current.click()
        } else {
            VideoInputRef.current.click()
        }
        // fileInputRef.current.click(); // Trigger the hidden input
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {

            const path = URL.createObjectURL(file)
            setImagePath(path)
            setFile(file)

        } else {
            Swal.fire({
                icon: "error",
                title: "Oops Image Couldnt Select...",
                text: "Something went wrong!",

            });
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault()



        setLoading(true)
        let formData = new FormData()
        if (File) {


            if (newPost.info != '') {
                const caption = newPost.info
                const data = { ...newPost }
                data.caption = newPost.info
                data.info = ''
                data.type = 'photo'
                setNewPost(data)

                formData.append('image', File)
                formData.append('data', JSON.stringify(data))


            }


        } else {
            formData = newPost

        }


        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/newsPost`, formData, {
            withCredentials: true
        })
            .then((res) => {

                if (res.status == 201) {
                    Swal.fire({
                        icon: "success",
                        title: 'You have Posted Successfully',


                    });

                    const data = {
                        friends: user.friends,
                        post: res.data
                    }



                    socket.emit('UpdateFeed', data)
                    console.log('emitting data', data)




                }
                setNewPost({
                    userID: user._id,
                    type: 'status',
                    info: '',
                    caption: '',
                    imageUrl: '',
                    shareMap: {},
                    TimeStamp: new Date()
                })
                setFile(null)
                setImagePath(null)

                


            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: err.message,
                    text: "Something went wrong!",

                });
            })
            .finally(() => {
                setLoading(false)  // move this here
            })








    }


    return (
        <div className="space-y-2 p-3 md:p-5  dark:bg-slate-950 dark:text-gray-300 border-1 border-slate-500 rounded-md w-90/100 max-sm:w-full">

            <form action="" onSubmit={handleSubmit} >

                <section className="flex space-x-2">

                    <ProfileIcon width={12} height={12} url={user?.pp} ></ProfileIcon>
                    <textarea name="info" className="p-2 resize-none w-2/3 max-sm:w-full h-[100px] text-xl focus:outline-none border-2 border-slate-400  rounded-md " onChange={(e) => { setNewPost({ ...newPost, [e.target.name]: e.target.value }) }} value={newPost.info} placeholder="Write your thoughts..." id=""></textarea>

                    <button className="btn btn-error" disabled={Loading || !(File || newPost.info !== '')}> {Loading ? 'Posting...' : 'Post'}</button>

                </section>

            </form>
            <section>
                {
                    imagePath && (

                        <div className="w-[150px] relative">
                            <img src={imagePath} className="rounded-lg" alt="" />
                            <div className="absolute -top-4 -right-2 cursor-pointer" onClick={() => { setImagePath(null); PhotoInputRef.current.value = null; setFile(null) }}>
                                <FontAwesomeIcon icon={faCircleXmark} className="text-yellow-300" size="xs" ></FontAwesomeIcon>
                            </div>

                        </div>
                    )
                }


            </section>



            <section className="space-x-4 flex flex-wrap space-y-2">

                <div>
                    <input type="file" accept="image/*" ref={PhotoInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
                    <button className="btn " type="button" onClick={() => handleClick('photo')} > <span><FontAwesomeIcon className="text-green-600" icon={faImage} size="md"></FontAwesomeIcon></span> Photo</button>
                </div>

                <div>
                    <input type="file" accept="video/*" ref={VideoInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
                    <button className="btn rounded-lg" type="button" onClick={() => handleClick('video')}> <span><FontAwesomeIcon className="text-blue-600" icon={faVideo} size="md"></FontAwesomeIcon></span>  Video</button>
                </div>

                <div className="cursor-not-allowed">

                    <button type="button" className="btn rounded-lg cursor-not-allowed" disabled={true}> <span><FontAwesomeIcon className="text-black bg-yellow-400  rounded-full " icon={faSmile} size="md"></FontAwesomeIcon></span> Feeling/Activity</button>
                </div>


                <div className="cursor-not-allowed">

                    <button type="button" className="btn rounded-lg" disabled={true}  > <span><FontAwesomeIcon icon={faCalendar} size="md" className="text-red-600" ></FontAwesomeIcon></span> Event</button>
                </div>




            </section>

            {
                Loading ? (
                    <section className="text-center">
                        <span className="loading loading-dots w-[70px]"></span>
                    </section>

                ) :
                    ''
            }









        </div>
    )
}
