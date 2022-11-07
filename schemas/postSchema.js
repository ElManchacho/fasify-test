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
        postid: { type: 'string' }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                idCreator: { type: 'string' },
                creationDate: { type: 'string' },
                title: { type: 'string' },
                text: { type: 'string' }
            }
        },
        404: {
            description: 'Get Post not found response',
            type: 'null',
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
        type: ['object', 'string'], // Had to accept both string and object types, because swagger passes an Object to the request, and the swagger passes a String --> generate a message at API start "strict mode: use allowUnionTypes to allow union type keyword at "#" (strictTypes)", don't know how to solve that
        properties: {
            title: { type: 'string' },
            text: { type: 'string' }
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                idCreator: { type: 'string' },
                creationDate: { type: 'string' },
                title: { type: 'string' },
                text: { type: 'string' }
            }
        },
        400: {
            description: 'New Post bad request response',
            type: 'null',
        },
        404: {
            description: 'New Post not found response',
            type: 'null',
        }
    }
}

const deletePostSchema = {
    description: 'Delete a post by id',
    tags: ['Post'],
    params: {
        postid: { type: 'string' }
    },
    headers: {
        userid: { type: 'string' }
    },
    response: {
        200: {
            description: 'Delete Post successful response',
            type: 'null',
        },
        404: {
            description: 'Delete Post not found response',
            type: 'null',
        }
    }
}

const updatePostSchema = {
    description: 'Update post by id',
    tags: ['Post'],
    params: {
        postid: { type: 'string' }
    },
    headers: {
        idcreator: { type: 'string' }
    },
    body: {
        type: ['object', 'string'], // Had to accept both string and object types, because swagger passes an Object to the request, and the swagger passes a String --> generate a message at API start "strict mode: use allowUnionTypes to allow union type keyword at "#" (strictTypes)", don't know how to solve that
        properties: {
            title: { type: 'string' },
            text: { type: 'string' }
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                idCreator: { type: 'string' },
                creationDate: { type: 'string' },
                title: { type: 'string' },
                text: { type: 'string' }
            }
        },
        404: {
            description: 'Update Post not found response',
            type: 'null',
        }
    }
}

module.exports = {
    getPostsSchema,
    getPostSchema,
    newPostSchema,
    deletePostSchema,
    updatePostSchema
}