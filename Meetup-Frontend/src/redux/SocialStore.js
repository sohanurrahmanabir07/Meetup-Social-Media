import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
    users:null,
    notification:[]

};

const SocialMediaSlice = createSlice({
  name: "SocialMedia",
  initialState,
  reducers: {
    addUser:(state,action)=>{
       state.users=action.payload
       console.log('from redux',state.users)

    },
    removeUser:(state,action)=>{

        state.users=null
        console.log('after removing from redux',state.users)

    },
    addNotification:(state,action)=>{

      state.notification=[action.payload,...state.notification]

    },
    loadNotification:(state,action)=>{
      state.notification=action.payload


    
    }
}});

export const { addUser,removeUser,addNotification,loadNotification } = SocialMediaSlice.actions;
export default SocialMediaSlice.reducer;
