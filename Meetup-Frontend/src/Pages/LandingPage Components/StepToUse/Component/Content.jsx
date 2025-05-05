

export const Content = ({img,content}) => {
    return (
        <div className="flex items-center max-sm:flex-col max-sm:space-y-3">

            <div>
                <img className="md:w-[300px]" src={img} alt="" />
            </div>
            {
                content
            }
           
        </div>
    )
}
