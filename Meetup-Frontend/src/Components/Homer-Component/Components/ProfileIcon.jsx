
import { useState } from 'react'
import NoProfile from '../../../assets/images/profile picture/emptypic.webp'
export const ProfileIcon = ({ width, height, url }) => {

    if (width > 24) {
        width = `[${width}px]`
    }
    if (height > 24) {
        height = `[${height}px]`
    }
    return (
        <div>
            <img style={{width:`${width}px`}} className={`w-${width} h-${height}  ${width >= 120 ? `max-sm:${width - 50}  ` : `max-sm:${width}px `}   ${height >= 120 ? `max-sm:${height - 50}px  ` : `max-sm:${height}px`} aspect-square object-cover border-4 border-white rounded-full `} src={` ${url == null || url == 'none' ? `${NoProfile}` : `${url}`}  `} alt="" />
        </div>
    )
}
