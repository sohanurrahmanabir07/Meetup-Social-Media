import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users:null,

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

    }
  },
});

export const { addUser,removeUser } = SocialMediaSlice.actions;
export default SocialMediaSlice.reducer;
