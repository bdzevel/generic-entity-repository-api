# Generic Entity Repository API Server

Generic Entity Repository API server

## Stack

* [Node.js](https://nodejs.org) as a web server to serve the front end
* [MongoDB](https://www.mongodb.com/) as the database
* [Grunt](https://gruntjs.com/) as a task runner, for automation and helpful scripts
    * (I may switch to [Gulp](http://gulpjs.com/) for this at some point)
* [ESLint](http://eslint.org/) for JS linting (enforced on pre-commit hook)
    * [Airbnb JavaScript style guide](https://github.com/airbnb/javascript) used as a base and lightly modified

## Development

### IDE/Environment

I use [Visual Studio Code](https://code.visualstudio.com/) with the following extensions:

* ESLint (Dirk Baeumer)
* npm Intellisense (Christian Kohler)
* Search node_modules (Jason Nutter)
* stylelint (Shinnosuke Watanabe)

### Dependencies

Node.js and NPM.
MongoDB with a database named as you like (make sure to update the .env file).
Package dependencies are mainly managed by npm.
You can choose to install the `grunt` command globally for yourself:
```
npm install -g grunt-cli
```
You can choose to install the `migrate-mongo` command globally for yourself:
```
npm install -g migrate-mongo
```

### Workflow

1. Setup
    1. Install dependencies
    ```
    npm install
    ```
    2. Create a MongoDB database
    3. Copy `.dev.example.env` to `.env` and modify it as needed (namely, DB connection)

2. Code
    1. `bootstrap/` contains bootstrap code for app initialization/startup
    2. `controllers/` contains the controllers, which handle requests/responses
        1. They will typically call out to services to do any real work
    3. `resources/` contains files that host constants
    4. `data/` contains database schemas and migrations
    5. `routes/` contain the definition of the express routes, which route requests to controllers
    6. `services/` contain all the services which host all business logic
    7. At the root you will find all config files
    8. Use `migrate-mongo create <name>` to generate a migration (in `data/migrations` folder).

3. Lint

   Note that linting is enforced on a pre-commit hook using [husky](https://github.com/typicode/husky) but it's good to know that you're square before trying to commit

4. Run
    1. Run MongoDB
    ```
    mongod
    ```
    2. Run the DB migrations to initialize the database
    ```
    migrate-mongo up
    ```
    3. Run the application
    ```
    npm start
    ```

   By default this will start on port 3000
