import { createSlice, current } from '@reduxjs/toolkit'
import React from 'react'
import { postDAtaMessenger } from '../API/callApi';
export const datamessengerSlice = createSlice({
    name:'messenger',
    initialState:{
        data:[],
        dataDisplay:[],
        loading:false,
        openMessenger:false,
        name:null,
    },
    reducers:{
        openMessenger:(state,action)=>{
          state.openMessenger = true
          state.name = action.payload
          console.log(action.payload);
          
      },
        fetchMessengerStart:(state)=>{
            state.loading = true
            
      },
       fetchMessengerSuccess:(state,action)=>{
           state.loading = false;
           state.data.push(action.payload);
           state.openMessenger = true
           const test = state.dataDisplay.find((mess)=>{
            return mess._id === action.payload._id
           })
           console.log(action.payload);
           if(!test){
            if(state.dataDisplay.length<3){
                state.dataDisplay.push(action.payload)
               }
               else{
                state.dataDisplay[0] = action.payload
               }
        }},
       
        cloneMessenger:(state,action)=>{
         
            const close = state.dataDisplay.filter(function(mess){
                return mess._id !== action.payload
            })
            if(close){state.dataDisplay = close}
            state.name = 'xx'
        
        },
        updateMessenger:(state,action)=>{

             const index = state.dataDisplay.findIndex(obj => JSON.stringify(obj.name)===JSON.stringify(action.payload.name))
             console.log(index);
             state.dataDisplay[index].messenger.push(action.payload.content)
           
        }
    }
})
export const fetchMessenger = (dataPost)=>{
    return async (dispatch)=>{
        dispatch(fetchMessengerStart());
        
        try {
            const response = await postDAtaMessenger(dataPost);
            const dataMessenger = response.data;
            console.log(dataMessenger);
            if (dataMessenger!='done') {
                dispatch(fetchMessengerSuccess(dataMessenger))
            }
           

            
        } catch (error) {
            console.log(error);
        }
    }
};

export const { fetchMessengerStart,updateMessenger,fetchMessengerSuccess,openMessenger,cloneMessenger } =  datamessengerSlice.actions

export default  datamessengerSlice.reducer