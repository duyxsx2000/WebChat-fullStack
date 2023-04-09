
import { RoomChat,Messenger,GrupChat} from "./models/model.js";
import sharp from "sharp";



export function watchRoomChat(io,socket){ //function that listens for changes in RoomChat model and sends messages back to client via socket
  RoomChat.watch([],{fullDocument:"updateLookup"}).on('change', (data)=>{

    if (data.updateDescription && data.updateDescription.updatedFields) {
      const arr= Object.values(data.updateDescription.updatedFields)
      socket.emit("roomChat",{content:arr,listMember:data.fullDocument.listMember,nameRoom:data.fullDocument.nameRoom})
    }
  })
}

export function watchMessenger(io,socket){ //function that listens for changes in Messenger model and sends messages back to client via socket
  Messenger.watch([],{fullDocument:"updateLookup"}).on('change',(data)=>{
    
    if(data && data.updateDescription && data.updateDescription.updatedFields){
      const fullChange = data.fullDocument
      const arr = Object.values(data.updateDescription.updatedFields)
      socket.emit("messenger",{content:arr[0],name:fullChange.name})
    }
  })    
}
export function watchGroupChat (io,socket){ //function that listens for changes in GroupChat model and sends messages back to client via socket

  GrupChat.watch().on('change',data=>{
    socket.emit("grupChat",data.fullDocument);
  });
}