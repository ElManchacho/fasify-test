
// Posts routes export

module.exports = function (server, opts, done) {

    // Services imports

    const PostService = require('../../service/post/postService')

    const UserService = require('../../service/user/userService.js')

    // Service Instanciation

    const postService = new PostService()

    const userService = new UserService()

    // Posts list route with response schema

    const { getPostsSchema } = require('../../schemas/postSchema')
    server.route({
        method: 'GET',
        url: '/post/list',
        schema: getPostsSchema,
        handler: async (request, reply) => {
            return { posts: await postService.getPosts() }
        }
    })

    // Specific post route with response schema

    const { getPostSchema } = require('../../schemas/postSchema')
    server.route({
        method: 'GET',
        url: '/post/:postid',
        schema: getPostSchema,
        handler: async (request, reply) => {
            const { postid } = request.params
            try {
                const post = await postService.getPost(postid);
                if (post) {
                    return reply.status(200).send(post);
                }
                return reply.status(404).type('text/plain').send('Post of specified id not found');
            } catch (error) {
                return error;
            }
        }
    })

    // Post creation route with response schema

    const { newPostSchema } = require('../../schemas/postSchema')
    server.route({
        method: 'POST',
        url: '/post/new',
        schema: newPostSchema,
        handler: async (request, reply) => {
            const { idcreator } = request.headers // --> Not case sensistive
            try {
                const creator = await userService.getUserById(idcreator);
                if (!creator) {
                    return reply.status(404).type('text/plain').send('User not found');
                }
                else {
                    const { body } = request
                    try {
                        const newPost = await postService.newPost(creator.id, body);
                        if (newPost) {
                            return reply.status(200).send(newPost)
                        }
                        else {
                            return reply.status(400).type('text/plain').send('Bad request');
                        }
                    } catch (error) {
                        return error;
                    }
                }
            } catch (error) {
                return error;
            }
        }
    })

    // Post deletion route with response schema

    const { deletePostSchema } = require('../../schemas/postSchema')
    server.route({
        method: 'DELETE',
        url: '/post/:postid',
        schema: deletePostSchema,
        handler: async (request, reply) => {
            const { userid } = request.headers
            try {
                const creator = await userService.getUserById(userid);
                if (!creator) {
                    return reply.status(404).type('text/plain').send('User not found');
                }
                else {
                    try {
                        const { postid } = request.params
                        const deletedPost = await postService.deletePost(userid, postid);
                        if (deletedPost) {
                            return reply.status(200).type('text/plain').send('Post of specified user successfully deleted');
                        }
                        else {
                            return reply.status(404).type('text/plain').send('Post of specified user not found');
                        }
                    } catch (error) {
                        return error;
                    }
                }
            } catch (error) {
                return error;
            }
        }
    })

    // Post patch route with response schema

    const { updatePostSchema } = require('../../schemas/postSchema')
    server.route({
        method: 'PATCH',
        url: '/post/:postid',
        schema: updatePostSchema,
        handler: async (request, reply) => {
            const { idcreator } = request.headers
            try {
                const creator = await userService.getUserById(idcreator);
                if (!creator) {
                    return reply.status(404).type('text/plain').send('User not found');
                }
                else {
                    try {
                        const { postid } = request.params
                        const { body } = request
                        const updatedPost = await postService.updatePost(creator.id, body, postid);
                        if (updatedPost) {
                            return reply.status(200).send(updatedPost)
                        }
                        else {
                            return reply.status(404).type('text/plain').send('Post of specified user not found');
                        }
                    } catch (error) {
                        return error;
                    }
                }
            } catch (error) {
                return error;
            }
        }
    })

    // End fastify instanciation

    done()
}