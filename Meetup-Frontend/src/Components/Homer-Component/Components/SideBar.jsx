import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { HomeProfile } from "../HomeProfile"
import { faUser } from "@fortawesome/free-regular-svg-icons"


export const SideBar = ({Component}) => {
    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                
                <label htmlFor="my-drawer" className="btn drawer-button rounded-lg"><FontAwesomeIcon icon={faUser} size="lg"></FontAwesomeIcon> Profile</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                   {Component}
                </ul>
            </div>
        </div>
    )
}
