npm install

npm audit fix

docker build -t docker-fastify-aws .

Test with 
docker run -p 3000:3000 docker-fastify-aws

See it running with
docker container ls
Pay attention to the container ID

Stop it with
docker container stop <CONTAINER-ID>

