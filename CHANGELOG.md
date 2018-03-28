# CHANGELOG

## [Unreleased]
### Add
- `css-modules` support

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
- `ESdoc` powered `documentation`
- `Testing` support using `Jest` & `enzyme`
- `Style linting` support using `styleling`
- `Code linting` support using `esling`
- A bit `faster modules import` using `webpack.optimize.OccurrenceOrderPlugin` in *production* build configurations
 
### Changed
- Project folding structure
- `Browserlist config` moved to separate file and would be included by `webpack`

### Removed
- `css-modules` using `babel-plugin-react-css-modules`

## [0.0.0] - 2017-12-05
`project-home project` has been initialized
