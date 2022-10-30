require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const port = process.env.PORT;
const socketIo = require('socket.io')
const formatMessage = require('./public/utils/messages');
const { joinUser, getUser, userLeave, getRoomUsers} = require("./public/utils/users");
const { Console } = require("console");

const server = http.createServer(app);  
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')))
const botName = "ወሬ";

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/public/index.html")
})

io.on('connection', socket =>{
   
    socket.on('joinRoom', ({username, room}) => {
         const user = joinUser(socket.id, username, room);
        //  console.log("just after user joined the chatt");
        //  console.log(user);
         
       


        socket.join(user.room)  
        io.to(user.room).emit('roomName', {
            room: user.room,
            roomUsers: getRoomUsers(user.room)
         })

        console.log("New WEb Socket connection...");
    
        socket.emit('message', formatMessage(botName,'You Joined the chatt'));
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} Joined the chatt`));
        
       
    })

    socket.on('newMsg', msg => {
        const user = getUser(socket.id);
        // console.log("after join message");
        // console.log(user)

        io.to(user.room).emit('message', formatMessage(user.username, msg));
    })

    socket.on("disconnect", () => {
        // console.log(socket.id)
        // const user = getUser(socket.id);
        // console.log('when user desconnects');
        // console.log(user);
        const user = userLeave(socket.id);
          if(user){
            // console.log('when user desconnects');
            // console.log(user);
    
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} disconnected`));

            io.to(user.room).emit('roomName', {
                room: user.room,
                roomUsers: getRoomUsers(user.room)
             })

          }
           
    })


})


server.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
})