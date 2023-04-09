
import {configureStore} from '@reduxjs/toolkit';
import userReducer  from '../loginS/loginSlice'
import listFriendReducer from '../listFriend/listfriendSlice'
import messengerReducer from '../messenger/messengerSlice';
import dataForumReducer from '../forum/forumSlice'
const rootReducer ={
    
    user: userReducer,
    listFriend:listFriendReducer,
    messenger:messengerReducer,
    forum:dataForumReducer,
}

const store = configureStore({
   reducer:rootReducer,
});

export default store;