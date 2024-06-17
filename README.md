<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

A movie API built with the [Nest](https://github.com/nestjs/nest) framework using TypeScript, PostgreSQL, and TypeORM. This API allows you to manage movies and genres.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
### API Endpoints

## Genre Endpoints

- Add Genre
  - URL: `POST /genre/addGenre`
  - Body:
  {
  "name": "Action"
  }

  - List Genres
    - URL: `GET /genre`
  
  - Delete Genre
    - URL: `DELETE /genre/:name`
    - Params:
      - `name` - Genre name
  
  ### Movie Endpoints

  - Add Movie
    - URL: `POST /movies/addMovie`
    - Body:
          {
            "title": "Inception",
            "description": "A mind-bending thriller",
            "release_date": "2010-07-16",
            "genre": ["Action", "Sci-Fi"]
          }

  - List Movies
    - URL: `GET /movies`
    - Query Params:
      - `page` (default: 1)
      - `limit` (default: 10)

  - Get Movie by ID
    - URL: `GET /movies:id`
    - Params:
      - `id` - Movie ID

  - Update Movie 
    - URL: `PATch /movies/:id`
    - Params:
      - `id` - Movie ID
    Body:
      {
        "title": "Updated Title",
        "description": "Updated description",
        "release_date": "2020-01-01",
        "genre": ["Drama"]
      }

  - Delete Movie
    - URL: `DELETE /movies/:title`
    - Params:
      - `title` - Movie title

  - Search Movies
    - URL: `GET /movies/search`
    - Query Params:
      - `title` - Movie title
      - `genre` - Genre name

## Database 

This project uses PostgreSQL. Ensure you have PostgreSQL installed and running. The default configuration uses the following credentials:

- Host: localhost
- Port: 5432
- Username: postgres
- Password: Renovatio0!
- Database: movie_api

To configure the database, modify the TypeOrmModule options in app.module.ts:

TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Renovatio0!',
  database: 'movie_api',
  entities: entities,
  synchronize: true,
  logging: true,
})

## Support
This project is an open source initiative licensed under the MIT license. If you'd like to support its development, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
