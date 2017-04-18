var limiter = $(".graphics-environment").last().parent().attr("id");

var MODULE = (function() {

  var m ={};

  m.init = function () {

  var linebound_height = $('#' + limiter + ' .linebounds').height()
  var slider_value = 0;
  var mask_tween = 0.5;
  var band_tween = 0;
  var gap_tween = 1;

  var mask_values = {
    insulator: 0.5,
    semiconductor: 0.46,
    semimetal: 0.48,
    conductor: 0.75
  }

  var band_values = {
    insulator: 0,
    semiconductor: 0.5,
    semimetal: 0.86,
    conductor: 0
  }

  var gap_values = {
    insulator: 1,
    semiconductor: 1,
    semimetal: 0,
    conductor: 1
  }

  // Initial state - insulator text and band

  TweenMax.set('#' + limiter + ' #band_mask', {y: -mask_tween * (linebound_height), ease: Power1.easeInOut})

  // rescale when the window is resized

  $( window ).resize(function() {

    linebound_height = $('#' + limiter + ' .linebounds').height()
    TweenMax.set('#' + limiter + ' #band_mask', {y: -mask_tween * (linebound_height), ease: Power1.easeInOut})
    TweenMax.set(['#' + limiter + ' #bluepath', '#' + limiter + ' #blue_behind', '#' + limiter + ' #band_label'], {y: band_tween * (linebound_height)/6, ease: Power1.easeInOut})
    TweenMax.set('#' + limiter + ' #gap_label', {y: band_tween * (linebound_height)/12, ease: Power1.easeInOut})
    TweenMax.set('#' + limiter + ' #gap_label', {opacity: gap_tween})

  });


  // Button toggle

  var buttons = $('#' + limiter + ' button').on('click', function (e) {

      var $this = $(this),
          el = buttons.not(this),
          button_id = this.id;

      $this.removeClass('disabled');
      $this.addClass('selected');
      el.addClass('disabled');

      var captions = $('#' + limiter + ' .caption-text');

      $('#' + limiter + ' .caption-text').each(function() {
        if (this.id == button_id + "-label") {
          $(this).css('opacity', '1');
        }
        else {
          $(this).css('opacity', '0');
        }
      });

      mask_tween = mask_values[button_id.toString()]
      band_tween = band_values[button_id.toString()]
      gap_tween = gap_values[button_id.toString()]

      TweenMax.to('#' + limiter + ' #band_mask', 1, {y: -(mask_tween) * (linebound_height), ease: Power1.easeInOut})
      TweenMax.to(['#' + limiter + ' #bluepath', '#' + limiter + ' #blue_behind', '#' + limiter + ' #band_label'], 1, {y: band_tween * (linebound_height)/6, ease: Power1.easeInOut})
      TweenMax.to('#' + limiter + ' #gap_label', 1, {y: band_tween * (linebound_height)/12, ease: Power1.easeInOut})
      TweenMax.to('#' + limiter + ' #gap_label', 1, {opacity: gap_tween})

  });

  } // m.init() close

  return m;

}()); // MODULE close

MODULE.init()
