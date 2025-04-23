import React from 'react'
import { FriendCard } from './FriendCard'

export const HomeFriendList = () => {
    return (
        <div className='w-90/100 mx-auto space-y-5 border-2 rounded-lg border-slate-500 p-5  lg:p-10'>
            <p className='md:text-3xl font-semibold border-b-2 border-slate-500 pb-3'>Friend List</p>
            <div className="flex space-x-5 space-y-5 flex-wrap">

                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item, index) => {
                        return (

                            <div className="max-w-[200px] max-sm:w-[120px] ">
                                <FriendCard></FriendCard>
                            </div>


                        )
                    })
                }

            </div>


        </div>
    )
}
