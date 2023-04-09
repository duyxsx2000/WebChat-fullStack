import { createSlice, current,createAsyncThunk} from "@reduxjs/toolkit";
import { getDataGroupChat,postDataGroupChat,postDataRoomChat} from "../API/callApi";

export const dataForumSlice = createSlice({
    name:'forum',

    initialState:{
        data:{
            groupChat:[],
            roomChat:[],
            display:[],
            oppenModelCreateNewRoomChat:false
        },
        loading:false
    },

    reducers:{

        fetchDataGrupChatLoading:(state,action)=>{
            state.loading = true      
        },

        fetchDataGrupChatSuccess:(state,action)=>{
            state.loading = false
            state.data.groupChat = action.payload   
        },

        updateNewGrupChat:(state,action)=>{
            state.data.groupChat.push(action.payload) 
        },

        fetchRoomChat:(state,action)=>{
            state.data.roomChat =action.payload
        },

        upNewRoomChat:(state,action)=>{
            state.data.roomChat.push(action.payload)
        },

        setDisplay:(state,action)=>{
            if(action.payload === 'out'){
                state.data.display = []
            }else{
                state.data.display = action.payload    
            }
           
        },

        upNewChatInRoom:(state,action)=>{
            state.data.display.content.push(action.payload)
        },

        setOppenModelCreateNewRoomChat:(state,action)=>{
           !state.data.oppenModelCreateNewRoomChat ?
           state.data.oppenModelCreateNewRoomChat = true : state.data.oppenModelCreateNewRoomChat = false
        },
        upNewMemberList:(state,action)=>{
                       
            const index = state.data.roomChat.findIndex((element)=>element.nameRoom === action.payload.nameRoom)
            if(index !== -1){
                state.data.roomChat[index].listMember=(action.payload.listMember)
            };
            if(state.data.display.nameRoom === action.payload.nameRoom){
                state.data.display.listMember=(action.payload.listMember)
            }
            
        }
    }
    
});
export const fetchDataGrupChat =()=>{
      return async (dispatch)=>{
         dispatch(fetchDataGrupChatLoading());
         //start loading data state
        try {          
          const response = await getDataGroupChat();
          const data = response.data; 
          
         dispatch(fetchDataGrupChatSuccess(data))
         //get data from server and pass it through action to reducer to update data
        } catch (error) {   
        }
      }
};
export const postNewDataGrupChat = (newchat)=>{
    return async (dispatch)=>{
        try {
            const response = await postDataGroupChat(newchat); 
            // post new dataChat to server 
           
        } catch (error) {
            console.log(error);
        }
    }
};
export const postRoomChat = (data)=>{
    return async (dispatch)=>{
        try { 
            
            const response = await postDataRoomChat(data);
            if(response && response.data && response.data.newRoom){
                dispatch(upNewRoomChat(response.data.newRoomChat))
            };
               
        } catch (error) {
            console.log(error);
        }
    }
}



export const {fetchDataGrupChatLoading,upNewChatInRoom,upNewMemberList,setDisplay,fetchDataGrupChatSuccess,updateNewGrupChat,fetchRoomChat,upNewRoomChat,setOppenModelCreateNewRoomChat} = dataForumSlice.actions;
export default dataForumSlice.reducer

