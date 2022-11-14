
//  User routes export

module.exports = function (server, opts, done) {

  // Services imports

  const UserService = require('../../service/user/userService.js')

  // Service Instanciation

  const userService = new UserService()

  // Define a route to get a specific user with it's schema

  const { getUserSchema } = require('../../schemas/userSchema')
  server.route({
    method: 'GET',
    url: '/user/:pseudo',
    schema: getUserSchema,
    handler: async (request, reply) => {
      const { pseudo } = request.params
      try {
        const user = await userService.getUser(pseudo);
        if (user) {
          return reply.status(200).send(user);
        }
        return reply.status(404).send();
      } catch (error) {
        return error;
      }
    }
  })

  // Define a route to get all user's pseudo

  const { getUsersPseudo } = require('../../schemas/userSchema')
  server.route({
    method: 'GET',
    url: '/user',
    schema: getUsersPseudo,
    handler: async (request, reply) => {
      try {
        const users = await userService.getUsersPseudo();
        if (users) {
          console.log(users)
          return reply.status(200).send(users);
        }
        return reply.status(404).send();
      } catch (error) {
        return error;
      }
    }
  })

  // End fastify instanciation

  done()
}