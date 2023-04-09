import express  from "express"
import router from "./routers/router.js"
import mongoose from "mongoose"
import cors from 'cors';
import bodyParser from "body-parser";
import http from "http"
import {Server} from 'socket.io'
import { watchRoomChat,watchMessenger, watchGroupChat} from "./changeData.js";
import sharp from "sharp";

const app = express()
const port = 5000
const httpServer = http.createServer(app)
const io = new Server(httpServer);
const URL = 'mongodb+srv://duymongodb:cqJVG0Df7qF4r5s9@cluster0.hv3hrwq.mongodb.net/?retryWrites=true&w=majority'

// Connect to MongoDB using Mongoose
const connectDB = async () => {
  try {
    await mongoose.connect(
      URL,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    console.log('Connected to mongoDB')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

connectDB()


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/data',router)

const connections ={}

// Set up Socket.IO for real-time communication
io.on("connection", (socket) => { 
  console.log("New client connected" + socket.id);
 
  watchRoomChat(io,socket)
  watchMessenger(io,socket)
  watchGroupChat(io,socket)

  socket.on("name",(data)=>{
    console.log(data);
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
    
  });
});


// Start the server and listen on the specified port
httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})