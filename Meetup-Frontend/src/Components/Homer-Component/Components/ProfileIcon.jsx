import React from 'react'

export const ProfileIcon = ({ width, height }) => {

    if (width > 24) {
        width = `[${width}px]`
    }
    if (height > 24) {
        height = `[${height}px]`
    }
    return (
        <div>
            {/* <img className={`w-[150px] h-[150px] object-cover border-4 border-white rounded-full `} src={'https://ofiles.kitety.com/ghibli/landingpage/e56036c6-2160-4ef3-bb7d-d189e2eb8c41.webp'} alt="" /> */}
            <img className={`w-${width} h-${height} aspect-4/3 object-cover border-4 border-white rounded-full `} src={'https://ofiles.kitety.com/ghibli/landingpage/e56036c6-2160-4ef3-bb7d-d189e2eb8c41.webp'} alt="" />
        </div>
    )
}
