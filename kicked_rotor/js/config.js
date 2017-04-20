requirejs.config({
  // We probably won't use this, since our scripts are stored in a funny way
  baseUrl: '',

  // Map global scripts we may need to addresses/paths
  // TODO: include local fallbacks
  paths: {
    jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min'
  }
});

define(function(require) {

  var $ = require('jquery');

});
