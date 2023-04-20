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

![image](https://user-images.githubusercontent.com/74706889/233377325-372ffab4-ddcf-467d-ae97-358dca530abf.png)

  Fastify-User
  
  ![image](https://user-images.githubusercontent.com/74706889/233379750-f465a9a9-fdfc-4820-b25c-a53676e19ee7.png)

  
![image](https://user-images.githubusercontent.com/74706889/233377536-62eda0c6-8cda-4e98-b797-866594e7815d.png)

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Stmt1482712489000",
            "Effect": "Allow",
            "Action": [
                "iam:CreateRole"
            ],
            "Resource": [
                "arn:aws:iam::841581342668:role/ecsTaskExecutionRole"
            ]
        }
    ]
}
  
![image](https://user-images.githubusercontent.com/74706889/233378597-06b90f63-63db-4680-9e44-0c8c8ab4c280.png)

  
Policy name : fastify-test-policy
  
  
  ![image](https://user-images.githubusercontent.com/74706889/233380237-5bfc07ec-a216-46ad-84c7-0bd34e5ee00e.png)

  
  ![image](https://user-images.githubusercontent.com/74706889/233380362-f0d8c21c-ffb2-4f61-af3a-c272b69b4293.png)

  
  ![image](https://user-images.githubusercontent.com/74706889/233380484-6a51c218-3a58-4482-96f9-0f5916bfcef9.png)

  
Go into the user list and select your newly create user, then go check it's access keys :
  
  ![image](https://user-images.githubusercontent.com/74706889/233380955-cc797055-a371-4f02-89d1-b1a5561717f3.png)

  Create one :
  
  ![image](https://user-images.githubusercontent.com/74706889/233381106-2f0f2276-1ff1-4d3d-b94b-8f544dd2135a.png)

  After creation, don't forget to store the key values.
  
  
Run : aws configure
  
Output :
AWS Access Key ID [None]: AKIA4H4RIF7GE2GGJ2XB
AWS Secret Access Key [None]: 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
Default region name [None]: eu-west-3
Default output format [None]: 
  
  
Create an empty ECS cluster :
  
  aws ecs create-cluster --cluster-name docker-fastify-aws
  
We will now create a new ECR, but first set : Cloud9 Preferences > AWS Sesstings > Credentials > AWS managed temporary credentials > False
  
  ![image](https://user-images.githubusercontent.com/74706889/233388447-babc3348-f329-45af-a7b3-e8567702c4af.png)

  
Run : aws ecr get-login --no-include-email
  
  Output :
  
  
  ![image](https://user-images.githubusercontent.com/74706889/233387617-c9916e3a-7ad7-4626-aa40-1f6d2c5bda99.png)

  As it is shown in the seconde section of the prompt command above, launch the docker login command.
  
  
  aws ecr create-repository --repository-name docker-fastify-aws/nodejs
  
  docker tag docker-fastify-aws 841581342668.dkr.ecr.eu-west-3.amazonaws.com/docker-fastify-aws/nodejs
  
  Run : docker images
  to see your newly created docker image
  
  Push your image on ECR : docker push 841581342668.dkr.ecr.eu-west-3.amazonaws.com/docker-fastify-aws/nodejs
  
  
  Run : aws ecr list-images --repository-name docker-fastify-aws/nodejs
  to see it
  
  Go in the "aws-deploy" folder and run :  
  aws iam create-role --role-name ecsTaskExecutionRole --assume-role-policy-document file://task-execution-assume-role.json
  
  Save the "Arn" output attribute
  
  If error, check user's autorisations & policies in IAM : its credentials may have leaked in your code (be careful next time) and block every aciton from this user.
  Remove it or restart full User creation process.
  
  aws iam attach-role-policy --role-name ecsTaskExecutionRole --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
  
  Edit node-task-definition.json file and fill "executionRoleArn": "<ROLE-ARN-YOU-SAVED-EARLIER>" &  "image": "<YOUR-ECR-IMAGE-URI>"
  "image" value can be found on the ECR list on AWS here : https://eu-west-3.console.aws.amazon.com/ecr/repositories?region=eu-west-3 (url will change depending your region).

{
    "family": "nodejs-fargate-task",
    "networkMode": "awsvpc",
    "executionRoleArn": "<ROLE-ARN-YOU-SAVED-EARLIER>",
    "containerDefinitions": [
        {
            "name": "nodejs-app",
            "image": "<YOUR-ECR-IMAGE-URI>",
            "portMappings": [
                {
                    "containerPort": 3000,
                    "hostPort": 3000,
                    "protocol": "tcp"
                }
            ],
            "essential": true
        }
    ],
    "requiresCompatibilities": [
        "FARGATE"
    ],
    "cpu": "256",
    "memory": "512"
}
  
  aws ecs register-task-definition --cli-input-json file://node-task-definition.json 
  
  
  
  
  
