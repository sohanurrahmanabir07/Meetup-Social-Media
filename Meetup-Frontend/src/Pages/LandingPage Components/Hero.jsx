
export const Hero = ({Component1,Component2,height}) => {
    return (


            <section className={`flex justify-center max-sm:flex-col items-center space-x-5 ${height} `}>

                {Component1}
                {Component2}

            </section>

            

    )
}
