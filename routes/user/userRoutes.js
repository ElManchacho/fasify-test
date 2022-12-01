
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
      try {
        const user = await userService.getUserByPseudo(request.params);
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
        const pseudos = await userService.getUsersPseudo();
        if (pseudos) {
          return reply.status(200).send(pseudos);
        }
        return reply.status(404).send();
      } catch (error) {
        return error;
      }
    }
  })

  // Define a route to see if an pseudo exists

  const { pseudoExistsSchema } = require('../../schemas/userSchema')
  server.route({
    method: 'GET',
    url: '/usersPseudo/:pseudo',
    schema: pseudoExistsSchema,
    handler: async (request, reply) => {
      try {
        const { pseudo } = request.params
        const pseudoExists = await userService.pseudoExists(pseudo);
        try{
          return reply.status(200).send(pseudoExists);
        }
        catch{
          return reply.status(404).send();
        }
      } catch (error) {
        return error;
      }
    }
  })

  // Define a route to see if an email exists

  const { emailExistsSchema } = require('../../schemas/userSchema')
  server.route({
    method: 'GET',
    url: '/usersEmails/:email',
    schema: emailExistsSchema,
    handler: async (request, reply) => {
      try {
        const { email } = request.params
        const emailExists = await userService.emailExists(email);
        try{
          return reply.status(200).send(emailExists);
        }
        catch{
          return reply.status(404).send();
        }
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
    url: '/user',
    schema: createUserSchema,
    handler: async (request, reply) => {
      const { body } = request
            try {
                const creatorPseudo = await userService.getUserByPseudo(body); // can't create user with pseudo already existing
                if (creatorPseudo) {
                    return reply.status(404).type('text/plain').send(`User with pseudo '${creatorPseudo.pseudo}' already exists.`);
                }
                const creatorEmail = await userService.getUserByEmail(body); // can't create user with email already existing
                if (creatorEmail) {
                  return reply.status(404).type('text/plain').send(`User with email '${creatorEmail.email}' already exists.`);
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