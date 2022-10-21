const getPostsSchema = {
    description: 'Get posts list',
    tags: ['Post'],
    response: {
        200: {
            type: 'object',
            properties: {
                posts: {
                    type: 'array',
                    items: {
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
}

const getPostSchema = {
    description: 'Get a post by it\'s id',
    tags: ['Post'],
    params: {
        postId: { type: 'string' }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                post: {
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

const newPostSchema = {
    description: 'Add a new post',
    tags: ['Post'],
    headers: {
        idcreator: { type: 'string' }
    },
    body: {
        type: 'object',
        properties: {
            title: { type: 'string' },
            text: { type: 'string' }
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                post: {
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

const deletePostSchema = {
    description: 'Delete a post by id',
    tags: ['Post']
}

const updatePostSchema = {
    description: 'Update post by id',
    tags: ['Post']
}

module.exports = {
    getPostsSchema,
    getPostSchema,
    newPostSchema,
    deletePostSchema,
    updatePostSchema
}