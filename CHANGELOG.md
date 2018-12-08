# CHANGELOG

## [Unreleased]
### Add
- `css-modules` support

## [0.0.3] - 2018-12-08
### Added
- `Automocking` dependencies in tests
- Apollo `RetryLink` allowing requests to be re-send using circuit breaker pattern
- `CircularDependencyPlugin` to find out circular dependencies better then `eslint`
- Dynamic page loading using `react-loadable`
- Dynamic translation loading
- Dynamic page title translation
- `Dynamic import` support in `Jest` tests
- `Eslint` support for workers
- `Eslint` rules for native functions, `lodash`, `promises`, 
function order in classes and `react` components, `Jest` and a few native things
- Graphql related hocs `connect` and `connectQuery`
- `HMR` in the translations
- Preparation hocs `loadable` and `prepare`
- Polyfill using`@babel/polyfill` in tests, sources and workers
- Redirects to the `404` page
- `SASS` variables and defaults
- Usage of the `graphql-tag` in `Jest` tests
- 4 example pages, layout and 2 example helpers and tests for them

### Changed
- Allow configurations to split chunks correctly with an eye on `HMR` and `long-tern caching`
- `Babel` migration from `6.x.x` to `7.x.x`
- `Controllers` become something like `helpers` making an accent on `functional programming`
- `Esdoc` migration from `0.x.x` to `1.x.x`
- `Immutable` migration from `3.x.x` to `4.x.x` to make it more familiar with native realization
- Make extensions except `js`-like to be explicitly declared to improve their readability
- Switch from `npm` to `yarn` tool
- Switch from `UglifyJsPlugin` to `Terser` due to better support of the modern features
- Change `.browserslistrc` to eliminate `dead browsers`

### Fixed
- Fix `.browserslistrc` name
- Fix conversion from `CRLF` to `LF` for the whole project
- Fix module roots and, moreover, build paths

## [0.0.2] - 2018-03-28
### Added
- `Testing` support using `Cucumber` & `Gemini` & `Selenium`
- `babel` support for `Gemini`
- `.gif` file extension support for `ImageminPlugin` on the build step
- Dependencies order on the build step

### Changed
- `UglifyJsPlugin` behaviour for release candidate (rc) `webpack` config
- Project root paths detection for `.babelrc`
- Build project dependencies optimizations
- `react-hot-loader` 4.x.x version usage instead of 3.x.x

### Removed
- `stylelint` css-modules configuration

## [0.0.1] - 2018-02-09
### Added
- `Hot module replacement` (HMR) for the files with `.css`, `.sass`, `.js`, `.jsx` extensions
- `Esdoc` powered `documentation`
- `Testing` support using `Jest` & `enzyme`
- `Style linting` support using `styleling`
- `Code linting` support using `eslint`
- A bit `faster modules import` using `webpack.optimize.OccurrenceOrderPlugin` 
in *production* build configurations
 
### Changed
- Project folding structure
- `Browserlist config` moved to separate file and would be included by `webpack`

### Removed
- `css-modules` using `babel-plugin-react-css-modules`

## [0.0.0] - 2017-12-05
`project-home project` has been initialized
