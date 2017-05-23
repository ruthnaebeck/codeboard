# Code Board

A web app that uses audio to help developers prepare for technical interviews. Code Board allows you to replicate the experience of listening to the question and hints while you try to code, so you’ll be confident and comfortable in that environment when you go through interviews. With both a code editor and a virtual whiteboard, Code Board also helps you practice diagramming the problem. It’s your own personal mock interviewer, available to help you practice anytime, anywhere.

Code Board is deployed on [www.CodeBoard.tech](www.CodeBoard.tech).

## Demo

![CodeBoard](/readme/demo.gif?raw=true "App Demo")

## Presentation

[![Grace Hopper Presentation](/readme/presentation.png)](https://youtu.be/gg69CkBtZwo)

## Getting Started for Developers

To install Code Board on your local machine:

```sh
fork the repo
git clone
```

### Prerequisites

```node >= 6.7.0```

## 1. How to install

After you have a repo on your machine:

```sh
npm install
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

## Built With

* React
* Redux
* Node
* Express
* PostgreSQL
* Sequelize
* Passport
* Mocha
* Chai
* React ACE Editor
* Web Speech API
* Material UI
* Bootstrap

## Authors

* **Cigdem Aybar** - [https://github.com/cigdemaybar](https://github.com/cigdemaybar)
* **Rachel Cohen** - [https://github.com/rachelfreya](https://github.com/rachelfreya)
* **Fanny Jiang** - [https://github.com/fanny-jiang](https://github.com/fanny-jiang)
* **Ruth Naebeck** - [https://github.com/ruthnaebeck](https://github.com/ruthnaebeck)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgements

* **Tom Kelly** - Instructor - [https://github.com/tmkelly28](https://github.com/tmkelly28)
* **Ashi Mysore** - Instructor - [https://github.com/queerviolet](https://github.com/queerviolet)
* **Jenny Lee** - Teaching Fellow - [https://github.com/jeunlee](https://github.com/jeunlee)
