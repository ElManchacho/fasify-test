class PostService{

    postConnection

    constructor(){
        this.postConnection = require('../../jsonDb/postsJsonDb.json') // simulate connectivity to database
    }

    getPosts() {
        
        var postList = this.postConnection // With a normal database, you query it right here. Would be a 'SELECT * FROM Post' in sqlt)
        return postList

    }

    newPost(idCreator, body) {

        // Create a new Post object

        const Post  = require('../../schemas/postSchema')

        var newPost = new Post(idCreator ,body.title, body.text)

        // Add new Post object to JSON database

        const fs = require('fs');

        var fileName = 'jsonDb\\postsJsonDb.json' // --> Path to reach the JSON database file from the server location

        var file = this.postConnection

        var content = file

        file.push(newPost)

        content = JSON.stringify(content)

        fs.writeFile(fileName, content, function writeJSON(err) {
            if (err)  {
                return err
            };
          });

        return newPost
    }
    
}

module.exports = PostService