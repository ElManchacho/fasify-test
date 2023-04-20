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
  
  
  
  
  
  
  
  
  
