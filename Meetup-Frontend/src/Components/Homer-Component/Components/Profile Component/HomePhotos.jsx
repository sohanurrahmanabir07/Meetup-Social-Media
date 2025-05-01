import { useEffect } from "react"
import { PhotoCard } from "./Photos"
import axios from "axios"


export const HomePhotos = ({photos}) => {


    return (
        <div className="flex space-x-5 space-y-5 flex-wrap ">

            {
                photos.map((item, index) => {
                    return (

                        <div className="max-w-[200px] max-sm:w-[100px] "  key={index}>
                            <PhotoCard url={item} ></PhotoCard>
                        </div>


                    )
                })
            }

        </div>
    )
}
