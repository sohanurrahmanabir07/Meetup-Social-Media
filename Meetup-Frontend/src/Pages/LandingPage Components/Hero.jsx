
export const Hero = ({Component1,Component2,height,reverse}) => {

    return (


            <section className={`flex justify-center max-sm:space-y-10 max-sm:flex-col ${reverse? `max-sm:${reverse}`: ``} items-center space-x-5 ${height} `}>

                {Component1}
                {Component2}

            </section>

            

    )
}
