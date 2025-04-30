

export const Content = ({img,content}) => {
    return (
        <div className="flex items-center">

            <div>
                <img className="md:w-[300px]" src={img} alt="" />
            </div>
            {
                content
            }
           
        </div>
    )
}
