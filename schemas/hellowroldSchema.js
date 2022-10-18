const hellowWorldSchema = {
    schema: {
        description: 'post some data',
        tags: ['helloworld', 'code'],
        // request needs to have a querystring with a `name` parameter
    querystring: {
        name: { type: 'string' }
      },
      // the response needs to be an object with an `hello` property of type 'string'
      response: {
        200: {
          type: 'object',
          properties: {
            hello: { type: 'string' }
          }
        }
      }
    }
}

module.exports = hellowWorldSchema