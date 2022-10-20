const getPostsSchema = {
    description: 'Get posts list',
    tags: ['user'],
    params: {
        pseudo: { type: 'string' }
    },
    response: {
        200: {
            type: 'array',
            properties: {
                posts: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        idCreator: { type: 'string' },
                        creationDate: { type: 'string' },
                        title: { type: 'string' },
                        text: { type: 'string' }
                    }
                }
            }
        }
    }
}

module.exports = {
    getPostsSchema
}