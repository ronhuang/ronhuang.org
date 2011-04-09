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






















