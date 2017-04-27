// Define registers the asset with RequireJS so that you can use it in other
// definitions. In particular, we require it in the asset's own main.js file.
define(function(require) {
  // Some graphics may not need any JavaScript libraries, but jQuery is
  // included here by way of example.
  var $ = require('jquery');

  // Create an object to return
  var skeleton = {};

  skeleton.init = function() {
    // Limit the scope of selectors so that there is no crosstalk in the Atlas
    // environment. You would use this with any subsequent selectors by calling
    // limiter.find([selector]).
    var limiter = $("#skeleton");

    // Include graphics code here.

  }

  // Return the object
  return skeleton;

});
