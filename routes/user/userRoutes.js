
//  User routes export

module.exports = function (server, opts, done){

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
            return {user: await userService.getUser(pseudo)}
        }
    })

    // End fastify instanciation

    done()
}