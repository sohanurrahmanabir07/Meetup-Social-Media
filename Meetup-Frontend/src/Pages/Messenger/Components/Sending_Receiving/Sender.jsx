import { useSelector } from "react-redux"


export const Sender = ({ item, user }) => {

    console.log('message', item)
    return (
        <div className="chat chat-end">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <div className="chat-header">
                {user.name}

            </div>
            <div className="chat-bubble  bg-purple-800  text-white">{item.message}</div>
            <time className="text-xs opacity-50">
                {
                    new Date().toLocaleDateString('en-GB') !== new Date(item.time).toLocaleDateString('en-GB')
                        ? `${new Date(item.time).toLocaleDateString('en-GB')} ${new Date(item.time).toLocaleTimeString('en-US')}`
                        : new Date(item.time).toLocaleTimeString('en-US')
                }

            </time>
            {/* <div className="chat-footer opacity-50">Seen at {item.time}</div> */}


        </div>

    )
}
