const hellowWorldSchema = {
  schema: {
    description: 'Hello world',
    tags: ['helloworld'],
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