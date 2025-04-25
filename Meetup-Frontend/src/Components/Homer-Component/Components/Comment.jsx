import { ProfileIcon } from "./ProfileIcon"


export const Comment = ({comment}) => {
    return (
        <section className="flex space-x-2 ">
            <ProfileIcon width={12} height={12} ></ProfileIcon>
            <div className="w-80/100 px-3 py-1 rounded-md border-2 border-slate-500">

                <div className="flex justify-between">
                    <p className="text-base font-semibold">{comment?.userID['name']}</p>

                    <p className="text-sm text-gray-500">21 Hours Ago</p>
                </div>

                <div>
                    <p className="text-sm text-gray-700">{comment?.comment}</p>
                </div>
            </div>

        </section>
    )
}
