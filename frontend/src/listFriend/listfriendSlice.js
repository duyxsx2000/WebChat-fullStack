import React from "react";
import { createSlice, current } from "@reduxjs/toolkit";
import { postDataListFriend } from "../API/callApi";



export const listFriendSlice = createSlice({
    name:'listFriend',
    initialState:{
        data:[],
        loading: false,
        status:false,
        
    },
    reducers:{
        fetchListFriendStart:(state)=>{
              state.loading = true
              
        },
        fetchListFriendSuccess:(state,action)=>{
             state.loading = false;
             state.data = action.payload
             
             state.status = true
            
        },
       
     
    }
});
export const fetchLisrfriend = (dataPost)=>{
    return async (dispatch)=>{
        dispatch(fetchListFriendStart())
        try {
            console.log(dataPost);
            
            const response = await postDataListFriend({dataPost})
            const dataListFriend = response.data
            console.log( dataListFriend);
            dispatch(fetchListFriendSuccess(dataListFriend))
        } catch (error) {
            console.log(error);
        }
    }
}




const  {reducer,actions} = listFriendSlice;
export const {fetchListFriendSuccess,fetchListFriendStart}     = actions;
export default reducer;