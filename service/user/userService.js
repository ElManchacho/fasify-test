class UserService{

    userConnection

    userType

    constructor(){
        this.userConnection = require('../../jsonDb/usersJsonDb.json') // simulate connectivity to database

        this.userType = this.userConnection[0]
    }

    getUsers() {

        userList = this.userConnection // With a normal database, you query it right here. Would be a 'SELECT * FROM User' in sql
        
        return userList

    }

    getUser(pseudo){
        var users = this.userConnection
        // simulate query by pseudo
        var userToFind = this.userType
        users.forEach(user=>{
            if (user['pseudo']==pseudo){
                userToFind =  user
            }
        })
        return userToFind
    }
    
}

module.exports = UserService