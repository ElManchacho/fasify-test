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

    pseudoExists(pseudo='', body='{}') {
        if (typeof body == 'string'){ //  Had to accept both string and object types, because swagger passes an Object to the request, and the swagger passes a String, then the string must be converted into Json object
            body = JSON.parse(body)
            pseudo = body.pseudo
        }

        var exists = false

        const userList = this.userConnection

        userList.forEach(user=>{
            if(String(user.pseudo)==String(pseudo)){
                exists = true
            }
        })
        
        return exists
    }
    
    emailExists(email='', body='{}') {
        if (typeof body == 'string'){ //  Had to accept both string and object types, because swagger passes an Object to the request, and the swagger passes a String, then the string must be converted into Json object
            body = JSON.parse(body)
            email = body.email
        }

        var exists = false

        const userList = this.userConnection

        userList.forEach(user=>{
            if(String(user.email)==String(email)){
                exists = true
            }
        })
        
        return exists
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

    login(login, password){
        var logState = false

        // TODO : should call a method de un-hash password (plus a hash method for sign up)

        var users = this.userConnection

        if (login.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')){
            
            // simulate query by email

            users.forEach(user=>{
                if (user['email']==login && user['password']==password){
                    logState = true
                }
            })
        }
        else{
            
            // simulate query by pseudo

            users.forEach(user=>{
                if (user['pseudo']==login && user['password']==password){
                    logState = true
                }
            })
        }

        return logState
    }
    
}

module.exports = UserService