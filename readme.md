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

:rocket: Implement Model, Routes and Controller for Reviews

#### Setup React boilerplate.

# DevOps

### :whale: Dockerize development

:rocket: Run baseline application

:rocket: Dockerize tours server

:rocket: Set up docker compose

:rocket: Enable hot reloading by mounting in src

### :whale: Dockerize production

:rocket: Break out separate docker compose files

:rocket: Move DB to Atlas

:rocket: Update client Dockerfile to build production version

# Nginx

# Database Modelling

1. https://sagarvasa.medium.com/5-ways-to-improve-mongodb-performance-130fb4734472

2. Each Tour documents has a guide property, which stores the guides from the Users Collection (1:N).

   **Embeddeing**: Suppose we embedd users (who are tour guides) in the guide and If users (who are tour guides) update their data, then we need to update each Tour documents

   **Child Referencing**: Suppose we embedd any change in users (who are tour guides) need not to update for each tours

3. A Tour can have many reviews (1:N)

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

:high_brightness: `CHOKIDAR_USEPOLLING=true` worked for hot realoading react app

:high_brightness: If we use mongo atlas cluster we do not need to make a seperate container for mongo. Since a container essentially stores the database locally

:high_brightness: `Class APIFeatures<T,U>` tried to make it generic over `Query<>` and `queryParams` It did not work since it was failing to identify methods like find, findOne.

```
     const features = new APIFeatures<
       Query<ITrips[], ITrips, unknown>,
       tripsReqQuery
     >(Trips.find(), queryProps);
```

I changed my method and make is generic over `Documents` and `queryParams` so it is detecting methods like find,findOne.

```
    const features = new APIFeatures<ITrips, tripsReqQuery>(
      Trips.find(),
      queryProps
    );
```

:high_brightness: Can declare extending types in `@types`

:high_brightness: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/nodemailer/nodemailer-tests.ts

:high_brightness: Pass the `DocType` in `mongoose.Schema<DocType>` to access the schema.methods properly

:high_brightness: Indexes can improve read performance by reducing the number of document it scans. Do not set index blindly, each index use resouces, each index is updated when collection updates, if a collection regularly updates then index would not be much beneficial. Choose to create index using access pattern of application

:high_brightness: Nested routes: When two resources are related together like `GET` `trip/tripid/review` Then we use nested routes in express and merge params to get the id from params like `app.use('/:tripId/review', reviewsRoutes)` merge params will automatically make the `tripId` equals `req.params.id`. Other wise we will need a middleWare function mergeTripId `app.use('/:tripId/review', mergeTripId, reviewsRoutes)`

:high_brightness: https://stackoverflow.com/questions/50369779/cookie-not-being-set-in-browser. Use proxy in react app to set the same origin or cors origin and credential policy

:high_brightness: `disptach(loginUser('email', 'password'));` to dispatch an action/async action we always need to pass in dispatch. What id we can directly call our actions like `loginUser('email','password')`. bindActionCreator action wrapped in dispatch call

:high_brightness: https://stackoverflow.com/questions/43002444/make-axios-send-cookies-in-its-requests-automatically

:high_brightness:
If suppose the user has ratings average 4.5, he agains slides the ratings to 3.5 and then back to 4.5. Make sure it does make any api call. If the ratingsStartValue is Equal to ratingsEndValue then only call below function

Solution 1: JSON.stringify(deps), it then uses compare by values instead of reference.
Solution 2: useRef,
Advice: useAPI should not care about checking previous props and next props. It should only care about calling api. So I moved all this logic to `FilterTrips.tsx`

# Node JS Security Cheat sheet

https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html

# Todo

1. handleFactory fails if req.body has some invalid parameters
   If ratingsAverage and ratingQuantity is set via patch is not correct.
   Role can be set too

This customisation will change handler factory (bug confirmed by mongoose community)

2. Remove password hash field from reponse
3. Add to wishlist trip
4.
5. Remove no api call bug, when filtered by difficulty
