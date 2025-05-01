import React from 'react'

export const Photos = ({ active, setActive, photos }) => {

    return (
        <div className='p-2 space-y-4'>

            <section className='flex justify-between items-center'>

                <p className='text-xl font-semibold'>
                    Photos
                </p>


                <button className="btn btn-dash btn-secondary" onClick={() => setActive('photos')} >See All Photos</button>

            </section>



            <section>
                <div className="grid grid-cols-2 gap-2 max-w-[600px] mx-auto p-4">

                    {/* First two images — large aspect ratio */}
                    {
                        photos && photos.slice(0,4).map((item, index) => {
                            return (
                                <PhotoCard url={item} key={index}></PhotoCard>
                            )
                        })
                    }





                </div>




            </section>



        </div>
    )
}

export const PhotoCard = ({ url }) => {
    return (


        <div className="col-span-1 overflow-hidden rounded-lg cursor-pointer">
            <img className="w-full aspect-[4/3] object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                src={url}
                alt="" />
        </div>

    )
}