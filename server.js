// Services imports

const PostService = require('./service/post/postService.js')
const UserService = require('./service/user/userService.js')

// Service Instanciation

const postService = new PostService()

const userService = new UserService()

// Instantiating API

// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

// Hello world route
fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
})

// Posts list route
fastify.route({
    method: 'GET',
    url: '/post/list',
    handler: async (request, reply) => {
        var extractedPostList = postService.getPosts()
        return { postList: extractedPostList }
    }
})

// Specific post route
fastify.route({
    method: 'GET',
    url: '/user/:pseudo',
    schema: {
        // request needs to have a query string with a `pseudo` parameter
        querystring: {
            pseudo: { type: 'string' }
        }
    },
    handler: async (request, reply) => {
        const { pseudo } = request.params;
        var extractedUser = userService.getUser(pseudo)
        return {user: extractedUser}
    }
})

// Run the server!
const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()