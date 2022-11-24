const users = [];

// Join user to chat 
function userJoin(id, username, room) {
    const user = {id, username, room}
    users.push(user);
    return user;
}

function getCurrentUser(id) {
    return users.find(user => user.id === user.id)
}

module.exports = {
    userJoin,
    getCurrentUser
}