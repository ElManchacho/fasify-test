const getUserSchema = {
    description: 'Get specifi user',
    tags: ['user'],
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