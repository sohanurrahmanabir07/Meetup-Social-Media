import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ProfileIcon } from "../../../Components/Homer-Component/Components/ProfileIcon"
import { useRef, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../../../redux/SocialStore"


export const EditProfile = () => {
    const user = useSelector((state) => state.SocialMedia.users)
    const [name, setName] = useState(user.name || '')
    const [bio, setBio] = useState(user.bio || '')
    const [worksAt, setWorksAt] = useState(user.worksAt || '')
    const [dOb, setDoB] = useState(user.dOb || '')
    const [status, setStatus] = useState(user.status || '')
    const [address, setAddress] = useState(user.address || '')
   

    const dispatch = useDispatch()


    const handleUpdate = (e) => {
        e.preventDefault()

        const data = {
            id: user._id, name, bio, worksAt, dOb, status, address
        }

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/updateInfo`, data, {
            withCredentials: true
        })
            .then((res) => {
                if (res.status == 201) {
                    console.log('res', res)
                    dispatch(addUser(res.data.updatedProfile))
                    Swal.fire({
                        title: "Edit Profile!",
                        text: 'Profile Updated Successfully',
                        icon: "success"
                    })
                }
            })
            .catch((error) =>
                Swal.fire({
                    title: "Opps!",
                    text: error.message,
                    icon: "error"
                })

            )

    }

   
    const handleReset = () => {
        setAddress(user.address || '')
        setBio(user.bio || '')
        setDoB(user.dOb || '')
        setName(user.name || '')
        setStatus(user.status || '')
        setWorksAt(user.worksAt || '')
    }

    
    return (
        <div>
            <section className="bg-amber-300 flex flex-col items-center space-y-3">



                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4  grid grid-cols-1 md:grid-cols-2 gap-4">

                    <legend className="fieldset-legend">Page details</legend>
                    <div>
                        <label className="label">Bio</label>
                        <input type="text" className="input" value={bio} name="bio" onChange={(e) => setBio(e.target.value)} placeholder="My Bio" />
                    </div>

                    <div>
                        <label className="label">Name</label>
                        <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                    </div>
                    <div>
                        <label className="label">Works At</label>
                        <input type="text" className="input" value={worksAt} onChange={(e) => setWorksAt(e.target.value)} placeholder="Works At" />
                    </div>
                    <div>
                        <label className="label">Birth Day</label>
                        <input type="date" data-date="" data-date-format="DD MMMM YYYY" className="input" value={dOb} onChange={(e) => setDoB(e.target.value)} placeholder="Works At" />
                    </div>
                    <div>
                        <label className="label">Status</label>
                        <select name="" id="" className="input" value={status} onChange={(e) => setStatus(e.target.value)} >
                            <option disabled={true}>Choose Your relationship</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="relation">In a Relationship</option>
                        </select>
                    </div>
                    <div>
                        <label className="label">Address </label>
                        <input type="text" className="input" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                    </div>


                </fieldset>

                <div className="space-x-2">
                    <button className="btn btn-secondary btn-dash" onClick={handleUpdate} >Update</button>
                    <button className="btn btn-secondary btn-dash" onClick={handleReset} >Reset</button>
                </div>
            </section>
        </div>
    )
}
