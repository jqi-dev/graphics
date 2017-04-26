require(['config'], function() {
  require(['jquery'], function($){
    // These two lines show how to use nested dependencies. First, fetch and
    // load config.js. Then, once it's loaded, fetch and load jQuery. Then
    // enter this callback function.

    // Some graphics may not need any JavaScript libraries, but jQuery is
    // included here by way of example. Notice that the jQuery global object, $,
    // must be passed as an argument to this callback function.

    // Limit the scope of selectors so that there is no crosstalk in the Atlas
    // environment. You would use this with any subsequent selectors by calling
    // limiter.find([selector]).
    var limiter = $("#skeleton");


  });
});
