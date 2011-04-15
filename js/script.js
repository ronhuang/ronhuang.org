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
$(document).ready(
  function () {
    if ($("#twable")) {
      $("#twable").tablesorter( {sortList: [[0,0]]} );
    }
  }
);




















