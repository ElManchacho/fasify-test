
// Hello world route export

module.exports = function (server, opts, done) {

    // Define HellowWorld route

    const hellowWorldSchema = require('./../../schemas/hellowroldSchema')
    console.log(hellowWorldSchema)
    server.get('/', hellowWorldSchema, async (request, reply) => {
            return { hello: 'world' }
        })

    // End fastify instanciation

    done()
}