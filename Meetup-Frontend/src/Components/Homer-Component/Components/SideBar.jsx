import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { HomeProfile } from "../HomeProfile"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { useLocation } from "react-router"


export const SideBar = ({ Component,buttonName}) => {



    

    const closeDrawer = () => {
        
        const checkbox = document.getElementById("my-drawer-chatlist")
        if (checkbox) checkbox.checked = false
    }
    return (
        <div className="drawer">
            <input id="my-drawer-chatlist" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">

                <label htmlFor="my-drawer-chatlist" className="btn drawer-button rounded-lg"><FontAwesomeIcon icon={faUser} size="lg"></FontAwesomeIcon> {buttonName}</label>
            </div>
            <div className="drawer-side z-20">
                <label htmlFor="my-drawer-chatlist" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                  
                    {Component}
              

                </ul>
            </div>
        </div>
    )
}
