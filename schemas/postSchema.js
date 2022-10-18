const { v4 } = require('uuid');

module.exports = class Post{ // --> Better to use Typescript to give types

    id //:string,
    idCreator //:string,
    creationDate //:Date,
    title //:string,
    text //:string

    constructor(idCreator, title, text){

        this.id = v4()

        this.idCreator = idCreator

        var today = new Date()
        this.creationDate = today.toLocaleDateString("en-US")

        this.title = title

        this.text = text
    }
}