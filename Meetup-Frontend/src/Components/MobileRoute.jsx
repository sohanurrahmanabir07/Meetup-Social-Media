import { useLocation, useNavigate } from "react-router"
import { useIsMobile } from "../CustomHooks/useIsMobile"
import { Navigate } from "react-router"


export const MobileRoute = ({children}) => {

    const location=useLocation()
    const isMobile=useIsMobile()
    const navigate=useNavigate()

    if(isMobile){
        return children
    }else{
      return <Navigate to={'/home'} replace ></Navigate>
    }
    
}
