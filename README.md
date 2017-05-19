# Code Board

A web app that uses audio to help developers prepare for technical interviews. Code Board allows you to replicate the experience of listening to the question and hints while you try to code, so you’ll be confident and comfortable in that environment when you go through interviews. With both a code editor and a virtual whiteboard, Code Board also helps you practice diagramming the problem. It’s your own personal mock interviewer, available to help you practice anytime, anywhere.

## Getting Started

Code Board is deployed on [www.CodeBoard.tech](www.CodeBoard.tech).

To install Code Board on your local machine:

### Prerequisites

* ```node >= 6.7.0```

## 1. How to install

After you have a repo on your machine:

```sh
npm install
npm install -g bower     // if you don\'t have bower installed globally already
bower install
```

## 2. Start!

Short and sweet:

```sh
npm run dev
```

The `dev` script sets `NODE_ENV` to "development", runs the build script in watch mode, and
starts the server with `nodemon`. Build vs server logs are separated by a prefix. If you prefer
to run the server and build processes separately, you can instead do:

```sh
npm run start-dev
```

```sh
npm run build-dev
```

In two separate terminals. The vanilla `npm start` is for production — you won't use it in development!

## Contents

`/app` has the React/Redux setup. `main.jsx` is the entry point.

`/db` has the Sequelize models and database setup. It'll create the database for you if it doesn't exist,
assuming you're using postgres.

`/server` has the Express server and routes. `start.js` is the entry point.

`/bin` has scripts. (Right now it has *one* script that creates a useful symlink.)

## Conventions

`require` and `module.exports` in `.js` files.

`import` and `export` in `.jsx` files, unless `require` makes for cleaner code.

Two spaces, no semi-colons, and trailing commas where possible

## Quick Heroku deployment

1. Set up the [Heroku command line tools](https://devcenter.heroku.com/articles/heroku-cli) and install [Yarn](https://yarnpkg.com/en/) if you haven't already (`npm install -g yarn`)
2. `heroku login`
3. Add a git remote for heroku:
  - **If you're creating a new app...**
    1. `heroku create` or `heroku create your-app-name` if you have a name in mind.
    2. `heroku addons:create heroku-postgresql:hobby-dev` to add postgres
    3. `npm run deploy-heroku`. This will create a new branch and compile and commit your frontend JS to it, then push that branch to Heroku.
    4. `heroku run npm run seed` to seed the database

  - **If you already have a Heroku app...**
    1.  `heroku git:remote your-app-name` You'll need to be a collaborator on the app.

Afterwards,
  - *To deploy:* `npm run deploy-heroku`
  - *To re-seed:* `heroku run npm run seed`

## Built With

* React
* Redux
* Node
* Express
* PostgreSQL
* Mocha
* Chai
* React ACE Editor
* Material UI
* Web Speech API
* Heroku

## Authors

* **Cigdem Aybar** - [](https://github.com/cigdemaybar)
* **Rachel Cohen** - [](https://github.com/rachelfreya)
* **Fanny Jiang** - [](https://github.com/fanny-jiang)
* **Ruth Naebeck** - [](https://github.com/ruthnaebeck)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* **Tom Kelly** - Instructor - [](https://github.com/tmkelly28)
* **Ashi Mysore** - Instructor - [](https://github.com/queerviolet)
* **Jenny Lee** - Teaching Fellow - [](https://github.com/jeunlee)