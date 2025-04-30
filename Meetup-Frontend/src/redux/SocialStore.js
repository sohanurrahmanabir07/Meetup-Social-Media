import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  users: null,
  notification: [],
  requestList: [],
  pendingList: [],
  requestSet:[],
  pendingSet:[],
  onlineUsers:{}

};

const SocialMediaSlice = createSlice({
  name: "SocialMedia",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users = action.payload
      console.log('from redux', state.users)

    },
    removeUser: (state, action) => {

      state.users = null


    },
    addNotification: (state, action) => {

      state.notification = [action.payload, ...state.notification]

    },
    loadNotification: (state, action) => {
      state.notification = action.payload

    },
    addTo_rqst_pnding_List: (state, action) => {

      const { data, type } = action.payload



      if (type == 'rqstList') {

        data.map((item)=>{
          state.requestList=[item,...state.requestList]
          state.requestSet=[item.receiverID._id,...state.requestSet]
        })



      }else{
        data.map((item)=>{

          state.pendingList=[item,...state.pendingList]
          state.pendingSet=[item.senderID._id,...state.pendingSet]
        })

      }


    },
    remove_rqst_pnding_List: (state, action) => {
      const { data ,type } = action.payload

      if(type=='rqstList'){

        state.requestList=state.requestList.filter((item, index) => item.receiverID._id != data)
        state.requestSet=state.requestSet.filter((item,index)=>item!=data)

      }else{
        state.pendingList=state.pendingList.filter((item, index) => item.senderID._id != data)
        state.pendingSet=state.pendingSet.filter((item)=>item!=data._id)


      }
      

    },
    update_rqst_pending:(state,action)=>{
      const { data, type } = action.payload
      if(type == 'rqstList'){
        state.requestList=data

        state.requestSet=[]

        state.requestList.map((item)=>state.requestSet.push(item.receiverID._id))

      }else{
        state.pendingList=data

        state.pendingSet=[]

        state.pendingList.map((item)=>state.pendingSet.push(item.senderID._id))

      }
    },
    getRequestList:(state,action)=>{

      state.requestList=action.payload
      state.requestSet=[]
      state.requestSet=state.requestList.map((item)=>item.receiverID._id)
      console.log('getRequest List',state.requestList)


    },
    getPendingList:(state,action)=>{

      state.pendingList=action.payload
      state.pendingSet=[]
      state.pendingSet=state.pendingList.map((item)=>item.senderID._id)
    },

    getOnlineUsers:(state,action)=>{
      state.onlineUsers=action.payload
      // console.log('Online Users',state.onlineUsers)
    },

    markNotification:(state,action)=>{

      state.notification[parseInt(action.payload)].read=true
    }
  }
});

export const { addUser,update_rqst_pending, removeUser, addNotification, loadNotification,getRequestList,getPendingList,addTo_rqst_pnding_List,remove_rqst_pnding_List,markNotification,getOnlineUsers } = SocialMediaSlice.actions;
export default SocialMediaSlice.reducer;
