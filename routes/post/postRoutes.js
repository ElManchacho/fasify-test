
// Posts routes export

module.exports = function (server, opts, done) {
    
    // Services imports

    const PostService = require('../../service/post/postService')

    // Service Instanciation

    const postService = new PostService()
    
    // Posts list route
    
    server.route({
        method: 'GET',
        url: '/post/list',
        handler: async (request, reply) => {
            var extractedPostList = postService.getPosts()
            return { postList: extractedPostList }
        }
    })

    // End fastify instanciation
    
    done()
}