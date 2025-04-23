import React from 'react'
import { HomeProfile } from '../Components/Homer-Component/HomeProfile'
import { NewsFeed } from '../Components/Homer-Component/NewsFeed'
import { RightPortion } from '../Components/Homer-Component/RightPortion'
import { SideBar } from '../Components/Homer-Component/Components/SideBar'
import { RightSideBar } from '../Components/Homer-Component/Components/RightSideBar'

export const Home = () => {

  return (
    <div className='text-3xl lg:max-w-[1500px] lg:m-auto'>

      <div className='md:hidden my-5 flex justify-between'>
        <SideBar></SideBar>
        <RightSideBar></RightSideBar>
      </div>
      
      <div className='flex lg:space-5 max-sm:flex-col'>

        <section className='w-20/100 lg:h-[500px] max-sm:hidden'>
          <HomeProfile></HomeProfile>
        </section>

        <section className='w-60/100 border-l-2 border-gray-300 max-sm:w-full'>
          <NewsFeed></NewsFeed>
        </section>

        <section className='w-20/100 max-sm:hidden'>

          <RightPortion></RightPortion>
        </section>







      </div>


    </div>
  )
}
