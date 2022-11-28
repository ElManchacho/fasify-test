class UserService{

    userConnection

    userType

    constructor(){
        this.userConnection = require('../../jsonDb/usersJsonDb.json') // simulate connectivity to database

        this.userType = this.userConnection[0]
    }

    getUsers() {

        const userList = this.userConnection // With a normal database, you query it right here. Would be a 'SELECT * FROM User' in sql
        
        return userList

    }

    getUsersPseudo() {

        const userList = this.userConnection
        
        const pseudoList = []

        userList.forEach(user=>{
            pseudoList.push(user.pseudo)
        })
        
        return pseudoList

    }

    getUserByPseudo(body){
        if (typeof body == 'string'){ //  Had to accept both string and object types, because swagger passes an Object to the request, and the swagger passes a String, then the string must be converted into Json object
            body = JSON.parse(body)
        }
        var users = this.userConnection
        // simulate query by pseudo
        var userFound
        users.forEach(user=>{
            if (user['pseudo']==body.pseudo){
                userFound = user
            }
        })

        return userFound
    }

    getUserByEmail(body){
        if (typeof body == 'string'){ //  Had to accept both string and object types, because swagger passes an Object to the request, and the swagger passes a String, then the string must be converted into Json object
            body = JSON.parse(body)
        }
        var users = this.userConnection
        // simulate query by email
        var userFound
        users.forEach(user=>{
            if (user['email']==body.email){
                userFound = user
            }
        })

        return userFound
    }

    getUserById(id){
        var users = this.userConnection
        // simulate query by id
        var userFound
        users.forEach(user=>{
            if (user['id']==id){
                userFound = user
            }
        })
        
        return userFound
    }

    createUser(body){
        if (typeof body == 'string'){ //  Had to accept both string and object types, because swagger passes an Object to the request, and the swagger passes a String, then the string must be converted into Json object
            body = JSON.parse(body)
        }

        // Create a new User object

        const User = require('../../ObjectClasses/userClass')

        var newUser = new User(body.name, body.pseudo, body.email, body.age, body.birthDate, body.password)

        // Add new User object to JSON database

        const fs = require('fs');

        var fileName = 'jsonDb\\usersJsonDb.json' // --> Path to reach the JSON database file from the server location

        var file = this.userConnection

        var content = file

        file.push(newUser)

        content = JSON.stringify(content)

        fs.writeFile(fileName, content, function writeJSON(err) {
            if (err) {
                return err
            };
        });

        return newUser
    }
    
}

module.exports = UserService