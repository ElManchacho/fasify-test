
// Hello world route export

module.exports = function(server, opts, done){

    // Define HellowWorld route

    server.get('/', async (request, reply) => {
        return { hello: 'world' }
    })

    // End fastify instanciation

    done()
}