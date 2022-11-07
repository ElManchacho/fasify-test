// Instantiating API

// Require the framework and instantiate it

const fastify = require('fastify')({ logger: true })

// Adds swagger to API

fastify.register(require('@fastify/swagger'), {
    swagger: {
      info: {
        title: 'Test swagger',
        description: 'Testing the Fastify swagger API',
        version: '0.1.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      host: 'localhost:3000',
      schemes: ['http','https'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'User', description: 'User related endpoints' },
        { name: 'Post', description: 'Post related endpoints' }
      ],
      definitions: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            pseudo: { type: 'string' },
            age: { type: 'int'},
            birthDate: { type: 'Date', format: 'en-US'},
            password: { type: 'string' }
          }
        },
        Post: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            idCreator: { type: 'string' },
            creationDate: { type: 'Date', format: 'en-US'},
            title: { type: 'string' },
            text: { type: 'string' }
          }
        }
      },
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header'
        }
      }
    }
  })

// Adds UI to swagger

fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next() },
      preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
  })

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

// Call swagger after instanciating routes

fastify.ready(err => {
    if (err) throw err
    fastify.swagger()
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