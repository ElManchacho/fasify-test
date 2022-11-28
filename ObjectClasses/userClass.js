const { v4 } = require('uuid');

module.exports = class User{ // --> Better to use Typescript to give types

    id //:string,
    name //:string,
    pseudo //:string,
    email //:string,
    age //:int,
    birthDate //:Date,
    password //:string

    constructor(name, pseudo, email, age, birthDate, password){

        this.id = v4()

        this.name = name

        this.pseudo = pseudo

        this.age = age

        this.birthDate = birthDate
        
        this.password = password

        this.email = email
    }
}