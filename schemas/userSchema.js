const getUserByPseudoSchema = {
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
                email: { type: 'string' },
                age: { type: 'integer' },
                birthDate: { type: 'string' },
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

const pseudoExistsSchema = {
    description: 'See if pseudo exists',
    tags: ['User'],
    params: {
        pseudo: { type: 'string' }
    },
    response: {
        200: {
            type: 'boolean',
        },
        404: {
            description: 'No existing users',
            type: 'null',
        }
    }
}

const emailExistsSchema = {
    description: 'See if email exists',
    tags: ['User'],
    params: {
        email: { type: 'string' }
    },
    response: {
        200: {
            type: 'boolean',
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
                email: { type: 'string' },
                age: { type: 'integer' },
                birthDate: { type: 'string' },
                password: { type: 'string' }
            }
        },
        404: {
            description: 'Get User not found response',
            type: 'null',
        }
    }
}

const createUserSchema = {
    description: 'Create a new user',
    tags: ['User'],
    body: {
        type: ['object', 'string'], // Had to accept both string and object types, because swagger passes an Object to the request, and the swagger passes a String --> generate a message at API start "strict mode: use allowUnionTypes to allow union type keyword at "#" (strictTypes)", don't know how to solve that
        properties: {
            name: { type: 'string' },
            pseudo: { type: 'string' },
            email: { type: 'string' },
            age: { type: 'number' },
            birthdate: { type: 'string' },
            password: { type: 'string' }
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                pseudo: { type: 'string' },
                email: { type: 'string' },
                age: { type: 'number' },
                birthDate: { type: 'string' },
                password: { type: 'string' }
            }
        },
        400: {
            description: 'New User bad request response',
            type: 'null',
        },
        404: {
            description: 'New User not found response',
            type: 'null',
        }
    }
}

module.exports = {
    getUsersPseudoSchema,
    pseudoExistsSchema,
    emailExistsSchema,
    getUserByPseudoSchema,
    getUserByIdSchema,
    createUserSchema
}