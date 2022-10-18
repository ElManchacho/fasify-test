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
      host: 'localhost',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'user', description: 'User related end-points' },
        { name: 'code', description: 'Code related end-points' }
      ],
      definitions: {
        User: {
          type: 'object',
          required: ['id', 'email'],
          properties: {
            id: { type: 'string', format: 'uuid' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: {type: 'string', format: 'email' }
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