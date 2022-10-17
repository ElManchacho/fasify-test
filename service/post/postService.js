class PostService{

    postConnection

    constructor(){
        this.postConnection = require('../../jsonDb/postsJsonDb.json') // simulate connectivity to database
    }

    getPosts() {
        
        var postList = this.postConnection // With a normal database, you query it right here. Would be a 'SELECT * FROM Post' in sqlt)
        return postList

    }
    
}

module.exports = PostService