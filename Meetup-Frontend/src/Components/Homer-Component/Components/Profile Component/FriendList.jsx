import { FriendCard } from "./FriendCard"


export const FriendList = () => {
    return (
        <div className='px-4 py-3 space-y-6'  >


            <section className='flex justify-between items-center'>

                <p className='text-xl font-semibold'>
                    Friends <span> <button className="btn btn-error">230</button> </span>
                </p>


                <button className="btn btn-dash btn-secondary">See All Photos</button>

                

            </section>

            <section className="grid grid-cols-2 gap-4 mb-5">    

                <FriendCard></FriendCard>
                <FriendCard></FriendCard>
                <FriendCard></FriendCard>
                <FriendCard></FriendCard>


            </section>






        </div>
    )
}
