## React Boilerplate with

- [webpack 2](https://github.com/webpack/webpack)
- [react-hot-loader 3](https://github.com/gaearon/react-hot-loader/tree/next)
- [koa2](https://github.com/koajs/koa/tree/v2.x)
- [eslint](https://github.com/eslint/eslint)
- [jest](https://github.com/facebook/jest)


#### Pre-requisites

node v6.x
```
$ node -v
v6.3.1
```

npm v3.x
```
$ npm -v
3.10.6
```

#### Set up

```
git clone <repo url>
cd react-webpack2-koa2-rhl3-boilerplate
npm i
```

#### Start development in watch mode
```
npm run watch
```
open [http://localhost:3000](http://localhost:3000)

#### Tests
Run all tests and generate a coverage report under `./converage/lcov-report/index.html`
```
npm run test
```
#### Tests in watch mode
Watch for file changes and run only tests related to changed files
```
npm run watch:test
```

#### Prod build

This generates uglified assets under the `build` directory
```
npm run build
```
Test the generated files by
```
npm run serve
```
open [http://localhost:3000](http://localhost:3000)
