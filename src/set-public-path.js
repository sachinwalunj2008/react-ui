// setting webpack's public path on-the-fly is necessary to ensure that webpack looks at the correct URL when trying to download split chunks / code splits.
// see https://webpack.js.org/guides/public-path/#on-the-fly
// this file MUST be the first import in the first file of your app in order for things to work
if (window.System) {
  const urlArray = window.System.resolve('@patterninc/react-ui').split('/')
  // eslint-disable-next-line no-undef
  __webpack_public_path__ =
    urlArray.slice(0, urlArray.length - 1).join('/') + '/'
}
