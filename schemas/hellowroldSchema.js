const hellowWorldSchema = {
  schema: {
    description: 'Hello world',
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