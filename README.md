<h1 align="center">
  <img height="200" width="200" src="https://github.com/pct-org/getting-started/blob/master/.github/logo.png" alt="logo" />
  <br />
  Native App
</h1>

<div align="center">
  <a target="_blank" href="https://gitter.im/pct-org/Lobby">
    <img src="https://badges.gitter.im/popcorn-time-desktop.svg" alt="Gitter" />
  </a>
  <a target="_blank" href="https://david-dm.org/pct-org/native-app" title="dependencies status">
    <img src="https://david-dm.org/pct-org/native-app/status.svg" />
  </a>
  <a target="_blank" href="https://david-dm.org/pct-org/native-app?type=dev" title="devDependencies status">
    <img src="https://david-dm.org/pct-org/native-app/dev-status.svg" />
  </a>
    <a target="_blank" href="https://github.com/pct-org/native-app/pulls">
      <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" />
    </a>
  <a target="_blank" href="https://travis-ci.com/github/pct-org/native-app">
     <img src="https://travis-ci.com/pct-org/native-app.svg?branch=develop" alt="PRs Welcome" />
  </a>
</div>

---

## Projects

Popcorn Time consists of several projects, each doing it's own part.

| Project                      | Description |
| ---------------------------- | -------------------------------------------------------- |
| [`@pct-org/getting-started`] | Explains how to get started with this setup              |
| [`@pct-org/graphql-api`]     | Serves the data to the clients from the MongoDB database |
| [`@pct-org/scraper`]         | Scrapes everything and saves it to MongoDB database      |
| [`@pct-org/mongo-models`]    | Models used for MongoDB and GraphQL object types         |
| [`@pct-org/native-app`]      | React Native App                                         |
| [`@pct-org/updater`]         | Updater that automatically updates the projects          |

## Installation

```bash
# Install dependencies
$ yarn
```

## Running the app

First start your emulator then run the following command
```bash
$ yarn start:android
```

## Screenshots

> // TODO

## Contributing:

Please see the [contributing guide].

## Issues

File a bug against [pct-org/getting-started prefixed with \[native-app\]](https://github.com/pct-org/getting-started/issues/new?title=[native-app]%20).

## [License](./LICENSE)

This project is [MIT licensed](./LICENSE).

[contributing guide]: ./CONTRIBUTING.md
[`@pct-org/graphql-api`]: https://github.com/pct-org/graphql-api
[`@pct-org/getting-started`]: https://github.com/pct-org/getting-started
[`@pct-org/mongo-models`]: https://github.com/pct-org/mongo-models
[`@pct-org/native-app`]: https://github.com/pct-org/native-app
[`@pct-org/scraper`]: https://github.com/pct-org/scraper
[`@pct-org/updater`]: https://github.com/pct-org/updater
