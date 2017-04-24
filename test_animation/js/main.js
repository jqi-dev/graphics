require(['config'], function() {
  require(['jquery', 'greensock'], function($){

    // Limit the scope of selectors so that there is no crosstalk in the Atlas
    // environment.
    var limiter = $("#test-animation");

    // Set jQuery selectors for elements to manipulate
    var square = limiter.find("#test-square");
    var pause_button = limiter.find("#pause");

    // Create a new Timeline object
    var tl = new TimelineMax({repeat:-1});

    tl.to(square, 2, {scale:2});

    pause_button.on('click', function(event) {
      tl.paused(!tl.paused());
      this.innerHTML = tl.paused() ? "play" : "pause";
    });
  });
});
