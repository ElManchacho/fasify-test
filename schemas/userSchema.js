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
                id: { type: 'string' },
                name: { type: 'string' },
                pseudo: { type: 'string' },
                age: { type: 'integer' },
                birthdate: { type: 'string' },
                password: { type: 'string' }
            }
        },
        404: {
            description: 'Get User not found response',
            type: 'null',
        }
    }
}

const getUsersPseudo = {
    description: 'Get all user\'s pseudos',
    tags: ['User'],
    response: {
        200: {
            type: 'array',
            items: {
                type: 'string',
            }
        },
        404: {
            description: 'No existing users',
            type: 'null',
        }
    }
}

module.exports = {
    getUserSchema,
    getUsersPseudo
}