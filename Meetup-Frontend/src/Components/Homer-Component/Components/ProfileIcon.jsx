import React from 'react'

export const ProfileIcon = ({width,height}) => {
    return (
        <div>
            <img className={`w-${width} h-${height} object-cover border-4 border-white rounded-full `} src={'https://ofiles.kitety.com/ghibli/landingpage/e56036c6-2160-4ef3-bb7d-d189e2eb8c41.webp'} alt="" />
        </div>
    )
}
