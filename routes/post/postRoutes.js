
// Posts routes export

module.exports = function (server, opts, done) {
    
    // Services imports

    const PostService = require('../../service/post/postService')

    // Service Instanciation

    const postService = new PostService()
    
    // Posts list route with response schema

    const { getPostsSchema } = require('../../schemas/postSchema')
    server.route({
        method: 'GET',
        url: '/post/list',
        schema:getPostsSchema,
        handler: async (request, reply) => {
            return { posts: await postService.getPosts() }
        }
    })

    // Specific post route with response schema

    const { getPostSchema } = require('../../schemas/postSchema')
    server.route({
        method:'GET',
        url:'/post/:postId',
        schema:getPostSchema,
        handler:async(request, reply)=>{
            const { postId } = request.params
            return { post: await postService.getPost(postId) }
        }
    })

    // Post creation route with response schema
    
    const { newPostSchema } = require('../../schemas/postSchema')
    server.route({
        method: 'POST',
        url: '/post/new',
        //schema:newPostSchema,
        handler: async (request, reply) => {
            const { body } = request
            const { idcreator } = request.headers // --> Not case sensistive !
            return { newPost: await postService.newPost(idcreator, JSON.parse(body)) }
        }
    })

    // Post deletion route with response schema

    const { deletePostSchema } = require('../../schemas/postSchema')
    server.route({
        method:'DELETE',
        url:'/post/:postId',
        schema:deletePostSchema,
        handler:async(request, reply)=>{
            const { postId } = request.params
            const { userid } = request.headers
            return { deletedPost: await postService.deletePost(userid, postId) }
        }
    })

    // Post patch route with response schema

    const { updatePostSchema } = require('../../schemas/postSchema')
    server.route({
        method:'PATCH',
        url:'/post/:postId',
        schema:updatePostSchema,
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