const getUserSchema = {
    description: 'Get specific user by pseudo',
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

const getUsersPseudoSchema = {
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

const getUserByIdSchema = {
    description: 'Get specific user by id',
    tags: ['User'],
    params: {
        id: { type: 'string' }
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

module.exports = {
    getUserSchema,
    getUsersPseudoSchema,
    getUserByIdSchema
}