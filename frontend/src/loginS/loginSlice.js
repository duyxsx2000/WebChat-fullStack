import {createSlice, current,} from '@reduxjs/toolkit';
import {postDataLogin, postDataRegister} from '../API/callApi'
import { fetchRoomChat} from '../forum/forumSlice';


export const userSlice = createSlice({
    name:'user',
    initialState:{
        data:[[]],
        loading:false,
        error:null,
        user:false,
        statusRegister:false,
        userList:[]
    } ,
    reducers:{
      
        LoginSuccess: (state, action) => {

            if(action.payload.data){state.loading = true;}  
            state.data =(action.payload)  
        },
        registerSuccess:(state,action)=>{
         
          
          if(action.payload.user){
            state.user = true
          };

          if(action.payload.statusRegister){
            state.statusRegister = true
          }
          
        },

        setUserList:(state,action)=>{
           state.userList = action.payload
        }
    }
})

  export const Login = (dataLogin) => {
    return async (dispatch) => {
      try {
        // receive dataLogin and send to the server to receive dataUser
        const response = await postDataLogin(dataLogin);
        const dataUser = response.data;
        // send new rêceived to action creator reducer to perform action to change data
        dispatch(LoginSuccess(dataUser)) 
        dispatch(fetchRoomChat(dataUser.listRoom))
        dispatch(setUserList(dataUser.userList))
        
      } catch (error) {
        // If the request fails, write the error information to the console.
        console.log(error);
      };
    };
  };
  export const fetchRegister = (dataRegister)=>{
    return async (dispatch)=>{
      try {
        //receive dataRegister and post to the server to response
        const response = await  postDataRegister(dataRegister);
        //send new rêceived to action creator reducer to perform action to change data
        dispatch(registerSuccess(response.data))
      } catch (error) {
        console.log(error);
      }
    }
  }


const  {reducer,actions} = userSlice;
export const {LoginSuccess,registerSuccess,setUserList}     = actions;
export default reducer;