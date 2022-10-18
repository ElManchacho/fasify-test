
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
            const { body } = request
            const { idcreator } = request.headers // --> Not case sensistive !
            return { newPost: await postService.newPost(idcreator, JSON.parse(body)) }
        }
    })

    server.route({
        method:'DELETE',
        url:'/post/:postId',
        handler:async(request, reply)=>{
            const { postId } = request.params
            const { userid } = request.headers
            return { deletedPost: await postService.deletePost(userid, postId) }
        }
    })

    // End fastify instanciation
    
    done()
}