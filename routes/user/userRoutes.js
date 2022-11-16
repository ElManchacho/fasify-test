
//  User routes export

module.exports = function (server, opts, done) {

  // Services imports

  const UserService = require('../../service/user/userService.js')

  // Service Instanciation

  const userService = new UserService()

  // Define a route to get a specific user by it's pseudo

  const { getUserByPseudoSchema } = require('../../schemas/userSchema')
  server.route({
    method: 'GET',
    url: '/userPseudo/:pseudo',
    schema: getUserByPseudoSchema,
    handler: async (request, reply) => {
      const { pseudo } = request.params
      try {
        const user = await userService.getUserByPseudo(pseudo);
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

  const { getUsersPseudoSchema } = require('../../schemas/userSchema')
  server.route({
    method: 'GET',
    url: '/userPseudos',
    schema: getUsersPseudoSchema,
    handler: async (request, reply) => {
      try {
        const users = await userService.getUsersPseudo();
        if (users) {
          return reply.status(200).send(users);
        }
        return reply.status(404).send();
      } catch (error) {
        return error;
      }
    }
  })

  // Define a route to get a user by it's ID

  const { getUserByIdSchema } = require('../../schemas/userSchema')
  server.route({
    method: 'GET',
    url: '/user/:id',
    schema: getUserByIdSchema,
    handler: async (request, reply) => {
      const { id } = request.params
      try {
        const user = await userService.getUserById(id);
        if (user) {
          return reply.status(200).send(user);
        }
        return reply.status(404).send();
      } catch (error) {
        return error;
      }
    }
  })

  // Define a route to create a user

  const { createUserSchema } = require('../../schemas/userSchema')
  server.route({
    method: 'POST',
    url: '/user/new',
    schema: createUserSchema,
    handler: async (request, reply) => {
      const { body } = request
            try {
                const creator = await userService.getUserByPseudo(body.pseudo);
                if (creator) {
                    return reply.status(404).type('text/plain').send(`User with pseudo '${body.pseudo}' already exists.`);
                }
                else {
                    try {
                        const newUser = await userService.createUser(body);
                        if (newUser) {
                            return reply.status(200).send(newUser)
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

  // End fastify instanciation

  done()
}