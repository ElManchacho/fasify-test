
// Posts routes export

module.exports = function (server, opts, done) {
    
    // Services imports

    const PostService = require('../../service/post/postService')

    // Service Instanciation

    const postService = new PostService()

    // Import return schema

    const { getPostsSchema } = require('../../schemas/userSchema')
    
    // Posts list route

    server.route({
        method: 'GET',
        url: '/post/list',
        //schema:getPostsSchema,
        handler: async (request, reply) => {
            return { posts: await postService.getPosts() }
        }
    })

    // Specific post route

    server.route({
        method:'GET',
        url:'/post/:postId',
        handler:async(request, reply)=>{
            const { postId } = request.params
            return { post: await postService.getPost(postId) }
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

    // Post deletion route

    server.route({
        method:'DELETE',
        url:'/post/:postId',
        handler:async(request, reply)=>{
            const { postId } = request.params
            const { userid } = request.headers
            return { deletedPost: await postService.deletePost(userid, postId) }
        }
    })

    // Post patch route

    server.route({
        method:'PATCH',
        url:'/post/:postId',
        handler:async(request, reply)=>{
            const { postId } = request.params
            const { userid } = request.headers
            const { body } = request
            return { updatedPost: await postService.updatePost(userid, JSON.parse(body), postId) }
        }
    })

    // End fastify instanciation
    
    done()
}