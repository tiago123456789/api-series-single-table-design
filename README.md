## About

I created this project to study about how to model Dynamodb using single table design

## Technolgies

- Nodejs
- Typescript
- Dynamodb
- Api gateway
- Lambda function
- Serverless framework
- Jest(unit tests)
- Github actions(pipeline ci)

## Instructions

- Clone repository
- Execute command **npm install** to install all modules project needs
- Create **serverless.env.yml** file based **serverless.env.example.yml** file.
- Execute command **npm run deploy-to-create-resource:production** use this command to deploy your application first time in prodution environment.
- Execute command **npm run deploy-to-create-resource:staging** use this command to deploy your application first time in staging environment.
- Execute command **npm run deploy:production** use this command when is your second time to deploy your application in production environment.
- Execute command **npm run deploy:staging** use this command when is your second time to deploy your application in staging environment.
- Execute command **npm run start:dev** to run lambda function locally. WARN: you need deploy application one time to create Dynamodb table.


## Architecture

![the project architecture](./archtiecture-api-movie.pn "The project architecture")


## Extra

- Import **Insomnia_2023-09-03.json** file with routes in Insominia to test. 



