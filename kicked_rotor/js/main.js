require(['config'], function() {
  require(['jquery'], function($){
    // This is a simple graphic, so nothing to really do.
    // Still, we need jQuery for consistency with other graphics.

    var limiter = $(".graphics-environment").last().parent();
    var base_scope = $('html');
    if (limiter) {
      // Use the following variable to scope down jQuery selectors
      var base_scope = limiter;
      console.log('inside kicked rotor ' + base_scope.attr('id'));
    }
  });
});
