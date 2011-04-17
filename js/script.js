/* Author: Ron Huang

 */

/* Copied from http://lessframework.com/ */
/* Support touched class. */
$(document).ready(
  function() {
    $("li a").bind('touchstart',function() {
      $(this).addClass('touched');
    });
    $("li a").bind('touchend',function() {
      $(this).removeClass('touched');
    });
    $("li a").bind('touchcancel',function() {
      $(this).removeClass('touched');
    });
  }
);


/* For 'Twitter user names with less than two characters' */
$(document).ready(function () {
  if ($("#twable").length === 0) {
    return;
  }

  $("#twable").dataTable({
    sPaginationType: "full_numbers"
  });
});


/* For Facebook Comments resize */
$(document).ready(function () {
  if ($('.comment #fb-root').length === 0) {
    return;
  }

  var timeout = function () {
    var frm = $('.comment .fb_iframe_widget iframe');
    if (frm.length !== 0) {
      frm.width($('article section').width());
    } else {
      setTimeout(function () { timeout(); }, 500);
    }
  };

  timeout();
});

$(window).resize(function () {
  if ($('.comment .fb_iframe_widget iframe').length === 0) {
    return;
  }

  if ($('.comment .fb_iframe_widget iframe').width() != $('article section').width()) {
    $('.comment .fb_iframe_widget iframe').width($('article section').width());
  }
});
