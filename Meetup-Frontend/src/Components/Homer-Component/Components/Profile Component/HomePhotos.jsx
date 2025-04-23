import { PhotoCard } from "./Photos"


export const HomePhotos = () => {

    return (
        <div className="flex space-x-5 space-y-5 flex-wrap ">

            {
                [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15].map((item, index) => {
                    return (

                        <div className="max-w-[200px] max-sm:w-[100px] ">
                            <PhotoCard url={"https://res.cloudinary.com/jnto/image/upload/w_1080,h_600,c_fill,f_auto,fl_lossy,q_60/v1/media/filer_public/7b/b4/7bb47b18-9205-4408-b4b3-b27284147cee/karigurashi032_bpgpvr"} ></PhotoCard>
                        </div>


                    )
                })
            }

        </div>
    )
}
