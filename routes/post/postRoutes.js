
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
            return { postList: await postService.getPosts() }
        }
    })

    // Post creation route
    
    server.route({
        method: 'POST',
        url: '/post/new',
        handler: async (request, reply) => {
            const { body, headers } = request
            const { idCreator } = headers
            return { newPost: await postService.newPost(idCreator, JSON.parse(body)) }
        }
    })

    // End fastify instanciation
    
    done()
}