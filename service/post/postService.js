class PostService {

    postConnection

    constructor() {
        this.postConnection = require('../../jsonDb/postsJsonDb.json') // simulate connectivity to database
    }

    getPosts() {

        var postList = this.postConnection // With a normal database, you query it right here. Would be a 'SELECT * FROM Post' in sqlt)
        return postList

    }

    getPost(idPost) {

        // Get specific Post object by id

        var content = this.postConnection

        var postToFind = content.find(({ id }) => id === idPost)

        return postToFind
    }

    newPost(idCreator, body) {

        // Create a new Post object

        const Post = require('../../ObjectClasses/postClass')

        var newPost = new Post(idCreator, body.title, body.text)

        // Add new Post object to JSON database

        const fs = require('fs');

        var fileName = 'jsonDb\\postsJsonDb.json' // --> Path to reach the JSON database file from the server location

        var file = this.postConnection

        var content = file

        file.push(newPost)

        content = JSON.stringify(content)

        fs.writeFile(fileName, content, function writeJSON(err) {
            if (err) {
                return err
            };
        });

        return newPost
    }

    deletePost(userId, idPost) {

        // Add new Post object to JSON database

        const fs = require('fs');

        var fileName = 'jsonDb\\postsJsonDb.json' // --> Path to reach the JSON database file from the server location

        var file = this.postConnection

        var content = file

        var message = {}

        var postToDelete

        if (content.find(({ id }) => id === idPost)) {
            if (content.find(({ idCreator }) => idCreator === userId)) {
                postToDelete = content.find(({ id }) => id === idPost)
                message = {
                    statusCode: 200
                }
            }

            else {
                if (postToDelete == undefined) {
                    message.statusCode = 403
                    message.error = 'Forbidden'
                    message.message = 'Access forbidden. You are not allowed to modify post with ID ' + idPost + '.'
                }
            }
        }
        else {
            if (postToDelete == undefined) {
                message.statusCode = 442
                message.error = 'Unprocessable Entity'
                message.message = 'Post with ID ' + idPost + ' does not exist.'
            }
        }

        var idPostToDelete = content.indexOf(postToDelete)

        content.splice(idPostToDelete, 1)

        if (message.statusCode == 200) {
            content = JSON.stringify(content)

            fs.writeFile(fileName, content, function writeJSON(err) {
                if (err) {
                    return err
                };
            });
        }

        return { postToDelete, message }
    }

    updatePost(userId, body, idPost) {

        // Add new Post object to JSON database

        const fs = require('fs');

        var fileName = 'jsonDb\\postsJsonDb.json' // --> Path to reach the JSON database file from the server location

        var file = this.postConnection

        var content = file

        var message = {}

        var postToModify

        if (content.find(({ id }) => id === idPost)) {
            if (content.find(({ idCreator }) => idCreator === userId)) {
                postToModify = content.find(({ id }) => id === idPost)
                var idPostToModify = content.indexOf(postToModify)
                content[idPostToModify].title = body.title
                content[idPostToModify].text = body.text
                message = {
                    statusCode: 200
                }
            }

            else {
                if (postToModify == undefined) {
                    message.statusCode = 403
                    message.error = 'Forbidden'
                    message.message = 'Access forbidden. You are not allowed to modify post with ID ' + idPost + '.'
                }
            }
        }
        else {
            if (postToModify == undefined) {
                message.statusCode = 442
                message.error = 'Unprocessable Entity'
                message.message = 'Post with ID ' + idPost + ' does not exist.'
            }
        }
        
        if (message.statusCode==200){
            content = JSON.stringify(content)

            fs.writeFile(fileName, content, function writeJSON(err) {
                if (err)  {
                    return err
                };
            });
        }

        return { postToModify }
    }

}

module.exports = PostService