import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const URL = import.meta.env.VITE_BACKEND_URL;

// const socket = io(URL, {
//   withCredentials: true,
//   transports: ['websocket'],
//   autoConnect: false, // 👈 Important: we control when to connect
// });
// const socket=io(URL,{
//   withCredentials:true,
//   autoConnect:false
// })
const socket=io(URL,{
  autoConnect: false,
  reconnection: true,
  withCredentials: true
})
export default socket;
