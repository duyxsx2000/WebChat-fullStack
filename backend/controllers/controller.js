import  express  from "express";
import mongoose from "mongoose";
import { Status,User,Friend,Messenger,GrupChat,RoomChat } from "../models/model.js";



export const getDataStatus = async function(req,res){
      
      const dataStatus = await Status.find()
      const dataUser = await User.find()
      res.status(200).json({dataStatus:dataStatus,dataUser:dataUser})

}

export const postDataStatus = async function(req,res){

      const data = req.body
      await Status.updateOne({name:data.name},{like:data.like,cmt:data.cmt});


}
export const postLogin = async function(req,res){//Receive login data from client, compare with database and send back data if conditions are met
      const dataPost = req.body;
      const dataUser = await User.find()
      const userList = dataUser.map((user)=>{
            return user.name
      })
      
      const dataFindUser = dataUser.find((x)=>{
            return x.account === dataPost.account
      });

      const name = dataFindUser.name;
      const dataListRoomChat = await RoomChat.find();

      const dataFindListRoomChat = dataListRoomChat.filter((x)=>{
            return x.listMember.includes(name)
      })
      
      if(!dataFindUser){
            res.json({caption:'Account does not exist'})
      }else{     
            if(dataFindUser.password == dataPost.password){
                  res.status(200).json({data:dataFindUser,caption:'done login',listRoom:dataFindListRoomChat,userList:userList})
            }else{
                  res.json({caption:'wrong password'})
            }
      }
};
export const postRegister = async function(req,res){
      //receive registration data from the client, if the conditions are met, create new data through the model
      const dataPost = req.body;
      const dataUsers = await User.find();
      const dataFind = dataUsers.find((data)=>{
            return (data.account === dataPost.account)||(data.name === dataPost.name)
      })
      if(!dataFind){
            await User.create({
                  account:dataPost.account,
                  name:dataPost.name,
                  sdt:dataPost.sdt,
                  password:dataPost.password
            });
            res.json({user:true})
      }else{
            res.json({statusRegister:true})  
      }
            
      
}
export const postDataListFriend = async function(req,res){
      //receive data from the client to compare and send back the appropriate data
      const dataFriends = await Friend.find()
      const dataPost = req.body
      const dataFriend = dataFriends.find((x)=>{
            return x.name === dataPost.dataPost
      })
      if(dataFriend){
            
            res.json(dataFriend.listFriend)
      }
      
}
export const postDataMessenger = async function(req,res){
      //get data from client and execute conditions
      const dataMessengers = await Messenger.find()
      const dataPost = req.body;
      if(dataPost.getData){
            
            const dataMessengeer = dataMessengers.find((x)=>{
                  const isEqual = dataPost.name.every(value =>x.name.includes(value))
                  if(isEqual) return x
                   
             });

             if(dataMessengeer){ //If satisfied, send the corresponding messenger data to the client
                  res.json(dataMessengeer)
             }
             else{ //Otherwise, it will create new data as required and send the new data to the client
                  const include = dataPost.name.includes('xx')
                  if(!include){
                        console.log('123');
                        
                        await Messenger.create({
                              name:dataPost.name,
                              messenger:[{
                                    dateSend:Date.now(),
                                    sender:dataPost[0],
                                    content:`hello ${dataPost.name[1]}`
                              }],
                              openmessenger:false
                        });
                        await Friend.updateOne(
                              {name:dataPost.name[0]},
                              {
                                    $push:{listFriend:dataPost.name[1]} 
                              }
                        );
                        await Friend.updateOne(
                              {name:dataPost.name[1]},
                              {
                                    $push:{listFriend:dataPost.name[0]} 
                              }
                        )
                        const dataMessengers = await Messenger.find()
                        
                        res.json(dataMessengers[dataMessengers.length-1])
                  }else{
                        res.json('done')
                  }
                 
                  
             }
          

      }

      if(dataPost.postData){ //add data to the database

            await Messenger.updateOne(
                  {name:dataPost.name},
                  {
                      $push:{messenger:{dateSend:Date.now(),sender:dataPost.sender,content:dataPost.content }} 
                  }
            )
            res.json('done')
            
           

      }
     
}

export const getDataChat = async function(req,res){
      const dataChat = await GrupChat.find()
      res.json(dataChat)
}
export const postDataChat = async function(req,res){//create new data in model group Chat and return client
      const dataNewChat = req.body; 
      await GrupChat.create({name:dataNewChat.name,
                              messenger:dataNewChat.messenger,
                              dateChat:Date.now(),
                              img:dataNewChat.img
                            });
                            
      const dataChat = await GrupChat.find()
      
      res.json(dataChat)
     
      
}
export const postCreateRoomChat = async function(req,res){
      const dataPost = req.body
      const dataRoomChat = await RoomChat.find();
      if(dataPost.getData){//returns the client data romChat corresponding to the condition

            const dataListRoomChat = await RoomChat.find();
            const dataFindListRoomChat = dataListRoomChat.filter((x)=>{
                  return x.listMember.includes(dataPost.name)
            })
            res.json({dataRoomChat:dataFindListRoomChat,getData:true})
      }
      if(dataPost.create){//create new data and return
           
            await RoomChat.create({
                  listMember:[dataPost.name],
                  nameRoom:dataPost.nameRoomChat,
                  content:[
                      {
                          name:dataPost.name,
                          messenger:`xin chào đến với roomChat ${dataPost.nameRoomChat}`,
                          dateChat:Date.now()
                      }
                  ]
            });
            const liveRoomChat = await RoomChat.find();
            const newRoomChat = liveRoomChat.find((x)=>{
                  return x.nameRoom === dataPost.nameRoomChat
            });

            res.json({newRoomChat,newRoom:true})
            
           
      };

      if(dataPost.newData){//update data in model RoomChat
           
            const find = dataRoomChat.find((x)=>{
                  return x.nameRoom === dataPost.nameRoomChat
            })
            if (find) {
                  
                  await RoomChat.updateOne(
                        {nameRoom:find.nameRoom},
                        {
                            $push:{content:{ name: dataPost.name, messenger: dataPost.messenger, dateChat:Date.now(),img:dataPost.img}} 
                        }
                  )
            }; 
            res.json('done')
      };

      if(dataPost.addNewMember){

            const find = dataRoomChat.find((x)=>{
                  return x.nameRoom === dataPost.nameRoomChat
            });
            if (find) {
                  
                  await RoomChat.updateOne(
                        {nameRoom:find.nameRoom},
                        {
                            $push:{listMember:dataPost.nameNewMember} 
                        }
                  )
            }; 
            res.json('done')

      }
    
}
