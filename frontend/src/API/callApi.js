import axios from "axios"
import React from "react"

const apiLogin = '/data/login';
const apiStatus = '/data/status';
const apiListFriend = '/data/friend';
const apiMessenger = '/data/messenger';
const apiGroupChat = '/data/groupChat';
const apiRegister = '/data/register';
const apiRoomChat = '/data/roomChat'

//api call functions

export const getDataStatus = ()=> axios.get(apiStatus)
export const getDataGroupChat = ()=> axios.get(apiGroupChat)
export const postDataLogin = (dataPost)=> axios.post(apiLogin,dataPost)
export const postDataRegister = (dataPost)=> axios.post(apiRegister,dataPost)
export const postDataStatus = (dataPost)=> axios.post(apiStatus,dataPost)
export const postDataListFriend = (dataPost)=> axios.post(apiListFriend,dataPost)
export const postDAtaMessenger = (dataPost)=> axios.post(apiMessenger,dataPost)
export const postDataGroupChat = (dataPost)=> axios.post(apiGroupChat,dataPost)
export const postDataRoomChat = (dataPost)=> axios.post(apiRoomChat,dataPost)