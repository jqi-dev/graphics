require(['config'], function() {
  require(['jquery', 'greensock'], function($){

    var tl = new TimelineMax({repeat:-1});

    tl.to("#animation-test", 2, {scale:2});

    $("#pause").on('click', function(event) {
      tl.paused(!tl.paused());
      this.innerHTML = tl.paused() ? "play" : "pause";
    });
  });
});

// var MODULE = (function () {
//
//   var m = {}
//
//   // put everything inside of this function
//   m.init = function () {
//
//     var tl = new TimelineMax({repeat:-1});
//
//     tl.to('#' + limiter +" #animation-test", 2, {scale:2});
//
//     $('#' + limiter +' #pause').on('click', function(event) {
//       tl.paused(!tl.paused());
//       this.innerHTML = tl.paused() ? "play" : "pause";
//     });
//   };
//
//   return m;
//
// }());
//
// MODULE.init();
