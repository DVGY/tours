# Table of contents

- [Flow of development](#flow-of-development)
- [DevOps](#devops)
- [Nginx](#nginx)
- [Database Modelling](#database-modelling)
- [Commands](#commands)
- [Learnings](#learnings)
- [Node JS Security Cheat sheet](#node-js-security-cheat-sheet)

# Flow of development

#### File setup, linting and configs

:rocket: Run `npx gitignore node`. It creates a gitignore for node env

:rocket: Install express, morgan, validator, jest and all other deps, with types

:rocket: Install api extractor for auto docs

#### Seperate Client and Server

:rocket: Make one folder for server and one for client

#### Implement Models, Controllers, Routes and Middlewares

:rocket: Script to seed dev database

:rocket: Implement Model, Routes and Controller for Users

:rocket: Implement Model, Routes and Controller for Trips

:rocket: Implement a `class APIFeatures` to filter by `params` Trips collections

:rocket: Handle Operational Error and Programming Error centrally using `AppError Class`

:rocket: Handle Unhandled rejections and Uncaught exceptions

:rocket: Handle security using different npm packages

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

# Nginx

# Database Modelling

https://sagarvasa.medium.com/5-ways-to-improve-mongodb-performance-130fb4734472

1. Each Tour documents has a guide property, which stores the guides from the Users Collection (1:N).

   **Embeddeing**: Suppose we embedd users (who are tour guides) in the guide and If users (who are tour guides) update their data, then we need to update each Tour documents

   **Child Referencing**: Suppose we embedd any change in users (who are tour guides) need not to update for each tours

2. A Tour can have many reviews (1:N)

   **Embeddeing**: Suppose we embedd reviews in Tour document it can grow infinitely. This might exhaust mongo bson limit

   **Parent Referencing**: Each review will store it tour id and user id. In this way we can save the infinite growth of review.
   Here Review is pointing to tours and users NOT vice versa

   **How can we populate reviews in Tours collection query?**:

   1. Query Review Collection each time we query Tours. Make two call on DB
   2. Virtual Populate: Stores all the reviews on Tours withour persisting on DB

# Commands

`docker-compose up -d` build the image if does not exist

`docker-compose down -v` removing the container

`docker-compose up -d --build` rebuild the image bcz dockerfile changed

# Learning

:high_brightness: `https://stackoverflow.com/questions/42938220/nodemon-not-restarting-after-typescript-change`

:high_brightness: If we use mongo atlas cluster we do not need to make a seperate container for mongo. Since a container essentially stores the database locally

:high_brightness: `Class APIFeatures<T,U>` tried to make it generic over `Query<>` and `queryParams` It did not work since it was failing to identify methods like find, findOne.

```
     const features = new APIFeatures<
       Query<ITrips[], ITrips, unknown>,
       tripsReqQuery
     >(Trips.find(), queryProps);
```

:high_brightness: Can declare extending types in `@types`

:high_brightness: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/nodemailer/nodemailer-tests.ts

:high_brightness: Pass the `DocType` in `mongoose.Schema<DocType>` to access the schema.methods properly

:high_brightness: Nested routes: When two resources are related together like `GET` `trip/tripid/review` Then we use nested routes in express and merge params to get the id from params like `app.use('/:tripId/review', reviewsRoutes)` merge params will automatically make the `tripId` equals `req.params.id`. Other wise we will need a middleWare function mergeTripId `app.use('/:tripId/review', mergeTripId, reviewsRoutes)`

I changed my method and make is generic over `Documents` and `queryParams` so it is detecting methods like find,findOne.

```
    const features = new APIFeatures<ITrips, tripsReqQuery>(
      Trips.find(),
      queryProps
    );
```

# Node JS Security Cheat sheet

https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html
