import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faUser } from "@fortawesome/free-regular-svg-icons"
import { RightPortion } from "../RightPortion"

import { ProfileIcon } from "./ProfileIcon"
import { Post } from "./Post"
import { faGlobe } from "@fortawesome/free-solid-svg-icons"

export const RightSideBar = ({Component,buttonName}) => {
    return (
        <div className="drawer drawer-end w-25">
            <input id="my-drawer-102" type="checkbox" className="drawer-toggle" />
            <label htmlFor="my-drawer-102" className="drawer-button btn "> <FontAwesomeIcon icon={faGlobe} size="md"></FontAwesomeIcon> {buttonName}</label>
            <div className="drawer-side z-20">
                <label htmlFor="my-drawer-102" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                   
                    {Component}

              
                   
             
                    
                </div>
            </div>
        </div>
    )
}
