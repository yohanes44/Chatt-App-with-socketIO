

const socket = io();

var msgForm = document.querySelector('#chat-form');
var msgContainer = document.querySelector('.chat-messages');
var roomName = document.querySelector('#room-name');
var roomUsers = document.querySelector('#users')

// const userName = "john";

const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

// console.log(username + " " + room)

socket.emit('joinRoom', {username, room});

socket.on('roomName', roomInfo => {
    displayRoomName(roomInfo.room);
    displayRoomUsers(roomInfo.roomUsers);
})



msgForm.addEventListener('submit', e => {
        e.preventDefault();
        var messageValue =  e.target.elements.msg.value;
        // console.log(messageValue)
      
         socket.emit("newMsg", messageValue);
        // socket.emit("newMsg", messageValue);
        // pushMsgToDOM(messageValue);
        e.target.elements.msg.value = ' ';
        e.target.elements.msg.focus();
        // msgContainer.scrollTop = msgContainer.scrollHeight;
      

       
    })

socket.on("message", msg =>{
    // console.log(msg)
    pushMsgToDOM(msg);
    msgContainer.scrollTop = msgContainer.scrollHeight;
    // console.log(msgContainer.scrollHeight)
    msgContainer.scrollTop = msgContainer.scrollHeight;
})




function pushMsgToDOM(msg){
    var messageDiv = document.createElement("div");
    messageDiv.classList.add('message');
    messageDiv.innerHTML = `<p class="meta">${msg.username} <span>9:12pm</span></p>
    <p class="text">
        ${msg.text}
    </p>`;
    msgContainer.appendChild(messageDiv);
}

function displayRoomName(room){
    console.log("displayRoomName() called")
    console.log(room)
    console.log("Room Html Element")
    console.log(roomName)
    roomName.innerHTML = room;
}

function displayRoomUsers(users){
    roomUsers.innerHTML = `${users.map((user) => `<li>${user.username}</li>`).join('')}`
}