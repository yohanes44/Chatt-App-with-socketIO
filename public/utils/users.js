
const users = [];

function joinUser (id, username, room){
    const user = {
        id,
        username,
        room
    }
    users.push(user);
    return user;
}

function getUser(id){
    const user = users.find((user) => user.id == id);
    return user;
}

function userLeave(id){
    const userIndex = users.findIndex((user) => user.id == id);

    if(userIndex !== -1){
        return users.splice(userIndex, 1)[0];
    }
}

function getRoomUsers(room){
    return users.filter((user) => user.room == room);
}

module.exports = {
    joinUser,
    getUser,
    userLeave,
    getRoomUsers
}