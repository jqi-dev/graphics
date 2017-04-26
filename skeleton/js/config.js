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

// Define registers the asset with RequireJS so that you can use it in other
// definitions. In particular, we require it in the asset's own main.js file.
define(function(require) {

  var $ = require('jquery');

});
