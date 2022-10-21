const getUserSchema = {
    description: 'Get specific user',
    tags: ['User'],
    params: {
        pseudo: { type: 'string' }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                user: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        pseudo: { type: 'string' },
                        age: { type: 'integer' },
                        birthdate: { type: 'string' },
                        password: { type: 'string' }
                    }
                }
            }
        }
    }
}

module.exports = {
    getUserSchema
}