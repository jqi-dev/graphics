requirejs.config({
  // Don't worry about setting baseUrl
  baseUrl: '',

  // The paths list contains all the JavaScript libraries the graphic might need
  // to use. jQuery is included here as an example.
  // TODO: include local fallbacks
  paths: {
    jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min'
  }
});
