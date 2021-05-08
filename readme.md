Todo

1. Eslint setup
2. Husky setup
3. API Extractor for docs
4. Tests for types
5. Set up docker
6. OSWAP node js best practices

# Flow of development

#### File setup, linting and configs

:rocket: Run `npx gitignore node`. It creates a gitignore for node env

:rocket: Install express, morgan, validator, jest and all other deps, with types

:rocket: Install api extractor for auto docs

#### Seperate Client and Server

:rocket: Make one folder for server and one for client

# DevOps

#### :whale: Dockerize development

:rocket: 1) Run baseline application

:rocket: 2) Dockerize tours server

:rocket: 3) Set up docker compose

:rocket: 4) Enable hot reloading by mounting in src

#### :whale: Dockerize production

:rocket: 1) Break out separate docker compose files

:rocket: 2) Move DB to Atlas

:rocket: 3) Update client Dockerfile to build production version

:rocket: 4) Use Caddy to serve front end files

:rocket: 5) Parameterize connection strings

:rocket: 6) Split local and production configurations

# Commands

`docker-compose up -d` build the image if does not exist

`docker-compose down -v` removing the container

`docker-compose up -d --build` rebuild the image bcz dockerfile changed

# Learning

:high_brightness: `https://stackoverflow.com/questions/42938220/nodemon-not-restarting-after-typescript-change`

:high_brightness: If we use mongo atlas cluster we do not need to make a seperate container for mongo. Since a container essentially stores the database locally

# Node JS Security Cheat sheet

https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html
