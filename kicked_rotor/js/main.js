require(['config'], function() {
  require(['jquery'], function($){
    // This is a simple graphic, so nothing to really do.
    // Still, we need jQuery for consistency with other graphics.

    // Limit the scope of selectors so that there is no crosstalk in the Atlas
    // environment.
    var limiter = $("#kicked-rotor");


  });
});
