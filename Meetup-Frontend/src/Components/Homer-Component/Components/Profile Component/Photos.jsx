import React from 'react'

export const Photos = () => {
    return (
        <div className='p-2 space-y-4'>

            <section className='flex justify-between items-center'>

                <p className='text-xl font-semibold'>
                    Photos
                </p>


                <button className="btn btn-dash btn-secondary">See All Photos</button>

            </section>



            <section>
                <div className="grid grid-cols-2 gap-2 max-w-[600px] mx-auto p-4">

                    {/* First two images — large aspect ratio */}

                    <PhotoCard url={"https://media.wired.com/photos/64f9d24e1b27a741aa23c0dd/master/pass/Studio-Ghibli-Ranked-Culture-HERON_img_1.jpg"} ></PhotoCard>
                    
                    <PhotoCard url={"https://www.hindustantimes.com/ht-img/img/2025/04/06/1600x900/parineeti_raghav_Studio_ghibli_1743917509270_1743917509611.jpg"} ></PhotoCard>
                    


                    <PhotoCard  url={"https://akm-img-a-in.tosshub.com/indiatoday/images/story/202504/sam-altman-on-ghibli-trend-305302139-3x4.jpg?VersionId=ZNgLhhEWK2YaYjFGnE_ieERzIOiPXLKF"}></PhotoCard>

                    {/* Rest of the images — same square aspect ratio */}
        

                    <PhotoCard url={"https://res.cloudinary.com/jnto/image/upload/w_1080,h_600,c_fill,f_auto,fl_lossy,q_60/v1/media/filer_public/7b/b4/7bb47b18-9205-4408-b4b3-b27284147cee/karigurashi032_bpgpvr"} ></PhotoCard>

   

                    <PhotoCard url={"https://www.thestatesman.com/wp-content/uploads/2025/03/Screenshot-2025-03-29-144752-png.webp"} ></PhotoCard>

                   

                </div>




            </section>



        </div>
    )
}

export const PhotoCard = ({url}) => {
    return (


        <div className="col-span-1 overflow-hidden rounded-lg cursor-pointer">
            <img className="w-full aspect-[4/3] object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                src={url}
                alt="" />
        </div>

    )
}