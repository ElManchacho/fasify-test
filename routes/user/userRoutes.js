
//  User routes export

module.exports = function (server, opts, done){

    // Services imports

    const UserService = require('../../service/user/userService.js')

    // Service Instanciation

    const userService = new UserService()
        
    // Define a route to get a specific user 

    server.route({
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

    // End fastify instanciation

    done()
}