// Instantiating API

// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

// Allow CORS rules

cors = require('@fastify/cors');

fastify.register(cors, {
    origin: '*',
  });

// Importing and adding routes from external files to server

const HelloWorldRoute = require('./routes/helloworld/helloWorldRoute')
const PostRoutes = require('./routes/post/postRoutes')
const UserRoutes = require('./routes/user/userRoutes')

fastify.register(HelloWorldRoute)
fastify.register(PostRoutes)
fastify.register(UserRoutes)


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