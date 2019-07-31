# Tatqile's Angular Template web 

## Summary

This project is the base template for Web apps and uses the MVP Clean Architecture implemented in Typescript. It's recommended that you read the [study references](#study-references) to have a better understanding about this project.


## Environment Setup

- This project uses __EditorConfig__ and `tslint` to maintain consistent coding style.
  - Please install [EditorConfig](http://editorconfig.org/) plugin for your Editor.
  - Usage of lint integration with your IDE is also highly suggested. See [Sublime](https://github.com/lavrton/SublimeLinter-contrib-tslint), [VSCode*](https://marketplace.visualstudio.com/items?itemName=eg2.tslint) or [Atom*](https://atom.io/packages/linter-tslint)

- This project uses Travis to run both `tslint` as well as [Danger](http://danger.systems/) tests
  - For further information, please refer to Taqtile's [unified danger setup](https://github.com/indigotech/danger)
  - Please ensure `$GITHUB_CI_USER_TOKEN` is properly configured on Travis dashboard.

  \* _Plugin not tested yet_

- Use the __Atom__ or __Sublime__ Editor.

- **Ensure you are using Node ${NODE_VERSION} specified in - [.nvmrc](.nvmrc#L1) and [package.json](package.json) files**
  - Run `nvm list`
  - If you don't have it, install ${NODE_VERSION} - `nvm install 8.3.0` - (tested `v8.3.0`)
  - Ensure you're using it - `nvm use 8.3.x` (`x` is the minor version, if you have installed `v8.3.0` you should run `nvm use 8.3.0` for instance)
  - You can set it as default version - `nvm alias default 8.3.0`
  - **PRO TIP:** you can configure your machine to automatically change the node version based on `.nvmrc` by following what is [described here](http://stackoverflow.com/a/39519460/2184357)
  - **PRO TIP2:** Unfortunately due to our external integrations it was not possible to keep ${NODE_VERSION} defined on a single file. Travis relies on  `.nvmrc` to determine which version to use, while Heroku relies on `package.json`. Please make an effort to keep those in sync.

- **Ensure you are using Yarn ${YARN_VERSION} specified in `package.json` file under the `engines` section**
  - Run ```yarn --version``` (tested `v0.19.1`)
  - If you have an older version, update Yarn
  - **TIP** you can install `yarn` by following one of the recipes [found here](https://yarnpkg.com/en/docs/install) - (tested using `cUrl`, `Homebrew ` and `npm install -g`)

__OR\*__

- **Ensure you are using Npm ${NPM_VERSION} specified in `package.json` file under the `engines` section**
  - Run `npm -v`
  - If you have an older version, update Npm - `npm install -g npm` - (tested `v3.10.3`)

**\*Note:** `Yarn` is prefered over `npm`. It provides [`yarn.lock`](https://yarnpkg.com/en/docs/yarn-lock) and [`yarn offline cache`](https://yarnpkg.com/blog/2016/11/24/offline-mirror/) which are powerful tools to ensure builds are consistently reproducible and shields the project against delisting of packages on NPM. If, for any reason, `Yarn` is not available, you can fallback to `npm` which should also provide a working dev environment. Keep in mind that `Yarn` is also used for new packages installation in order to guarantee `yarn.lock` and `./yarn-offline-cache` are always up to date.

- Install Node packages - `yarn` (or `npm install`)
  
- Make a copy of `sample.env` and rename it to `.env` - change values to fit your needs


## Running the App


### Using webpack-dev-server

In order to run the project using `webpack-dev-server`, run the following npm task:

```bash
$ npm run start
```

or

```bash
$ npm run server
```

The advantage of using `webpack-dev-server` is watch mode (recomplies and reloads the app page automatically).


### Using server-side rendering - Angular Universal

Angular Universal is the solution we use to render an Angular app in server side. This allow us to serve a rendered page making a programmer happy when asked about SEO :)

```bash
$ npm run start:server
```

The **environment** is selected based on configuration in `.env` file. To know wich ones are available, check `webpack.confg.js`.

However, there is a drawback. This mode does not allow automatic watch mode. If you want something similar, you can run another command in another terminal.

```bash
$ npm run build:watch
```

Your only job now is to refresh the page to see the changes (better then nothing...).



## Deploy

### Build
* `npm run build` to prepare a distributable bundle available in `dist` folder.

The **environment** is selected based on configuration in `.env` file. To know wich ones are available, check `webpack.confg.js`.

### Heroku

You can deploy manually by pushing the source code to heroku or you can use a npm shortcut:

```bash
$ npm run deploy:heroku
```

- **Please be aware that this shortcut checks out the develop branch at the end of the deploy**

- Ensure you have access to the heroku app you want to deploy to.

**!!! Warning !!!**
1. Ensure you have set the following variables in heroku's env
  - `NPM_CONFIG_PRODUCTION` equal `false`
  - `ENV` equal `production`
  - and any other environment variable needed to run this app
2. Add a new remote to in your local repo pointing it to heroku's git and naming it as `heroku` - ```git remote add heroku https://git.heroku.com/angular-template.git``` (replace the heroku url with the one your heroku app uses - you can find it under Heroku's App `Settings` - `Heroku Git URL`)
3. Login to heroku - ```heroku login```
4. Run deploy command - ```npm run deploy:heroku```


## Study References

### Typescript

#### Basics

- [Typescript tutorial](http://www.typescriptlang.org/docs/tutorial.html)

#### Advanced topics

- [Module resolution](http://www.typescriptlang.org/docs/handbook/module-resolution.html)
- [Decorators](http://www.typescriptlang.org/docs/handbook/decorators.html)
- [A very nice explanation regarding decorators](http://blog.wolksoftware.com/decorators-reflection-javascript-typescript)
- [Blog with several posts (Typescript and Angular as well)](http://blog.thoughtram.io/all/)


### Pug

- [Pug tutorial](https://pugjs.org/api/getting-started.html)


### Stylus

- [Stylus homepage](http://stylus-lang.com/)
- [Code conventions](https://github.com/indigotech/angular-template/tree/master/docs/code-conventions.md)


### Angular

#### Start pack

- [Official Angular tutorial](https://angular.io/docs/ts/latest/tutorial/)
- [Tutorial using HackerNews](http://houssein.me/angular2-hacker-news) - a very nice alternative
- [Egghead Angular course](https://egghead.io/courses/angular-2-fundamentals)
- [Angular style guide](https://angular.io/docs/ts/latest/guide/style-guide.html)

#### Universal - Server-side rendering
- [Angular Universal stater kit](https://github.com/angular/universal-starter)
- [Angular Universal tutorial](https://scotch.io/tutorials/server-side-rendering-in-angular-2-with-angular-universal)

#### FE

- [Forms explained](http://blog.ng-book.com/the-ultimate-guide-to-forms-in-angular-2/)

#### Advance

- [Angular's Dependency Injection system](https://angular.io/docs/ts/latest/guide/dependency-injection.html)
- [AoT](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html)
- [Angular's module system in deep](https://docs.google.com/document/u/1/d/1isijHlib4fnukj-UxX5X1eWdUar6UkiGKPDFlOuNy1U/pub)

### Webpack

- [Webpack homepage](https://webpack.github.io/)
- [Webpack tricks](https://github.com/rstacruz/webpack-tricks)

### Clean Architecture

- [Clean Architecture Specification](https://blog.8thlight.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Google Samples - MVP Clean](https://github.com/googlesamples/android-architecture/tree/todo-mvp-clean)
- [Taqtile Android Template](https://github.com/indigotech/template-android)
- [Clean Architecture and Design - Robert C. Martin](https://youtu.be/Nsjsiz2A9mg)
