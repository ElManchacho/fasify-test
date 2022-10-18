# fastify-test (https://github.com/ElManchacho/fasify-test.git)

Just a test project to train fastify API creation

# Ideas

## To come

For now, nothing.

## Done

Tidy route instanciation

Have a complete CRUD logic delivered by the API (CREATE, READ, UPDATE, DELETE)

--> READ

--> CREATE (POST request)

--> UPDATE (PATCH request)

--> DELETE

A route to create an object

A route that'd take headers and body values in account

A basic test swagger (add @fastify/swagger + @fastify/swagger-ui to your fastify server)

# Start things

## Prerequisite (in main folder)

```bash
npm i
```


## Start API server (in main folder)

```bash
node server
```


# Access things

## Endpoint

Find your http adress to call your requests on here : http://localhost:3000/

(a basic hello world is bound to that address)

## Swagger

And the swagger to observe here : http://localhost:3000/docs

# Other ressources

## Postman collection

A json Postman collection is available in the folder 'PostmanCollection', named 'Fastify-Test.postman_collection.json'.

Simply import it with Postman to observe the routes and test it.

## External ressources (documentation)

Fastify : https://www.fastify.io/

Swagger schema generation : https://github.com/fastify/fastify-swagger

Swagger UI generation : https://github.com/fastify/fastify-swagger-ui
