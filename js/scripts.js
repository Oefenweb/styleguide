$(document).ready(function() {

  buildStickyMenu();

  scrollActions();

  // initiating smooth scroll plugin
  $('a[href^="#"]').smoothScroll({
    afterScroll: function() {
      window.location.hash = $(this).attr('href');
    },
  });

});


// perform scrollactions on dom-events
$(window).scroll(function() { scrollActions(); });
$(window).resize(function() { scrollActions(); });
$(document).bind("scrollstart", function() { scrollActions(); });
$(document).bind("scrollstop", function() { scrollActions(); });


// Build sticky menu from headers in content
function buildStickyMenu() {
  var menuHeaders = $('#content h2, #content h3');
  if (menuHeaders.length) {
    $('#sticky-menu').addClass('hasContent');
  }

  $parent = '';
  menuHeaders.each(function() {

    // create text & slug from h2 titles
    $text = $(this).text();
    $slug = $text.replace(/\W/g, '').toLowerCase();

    if ($slug.length > 1) {

      // set h2 as $parent class
      if ($(this).is('h2')) { $parent = $slug }

      // set $id
      $id = ($(this).is('h3')) ? $parent + '_' + $slug : $slug;

      // create anchor and anchor link
      $(this).attr('id', $id);
      $(this).prepend('<a href="#' + $id + '" class="title-link"><i class="ss-icon ss-gridlines icon-05x"></i></a>');

      // secondary class if h3
      $secondary = ($(this).is('h3')) ? ' class="secondary"' : '';

      // add styled menu list item
      $('#sticky-menu').append('<li' + $secondary + '><a href=#' + $id + '>' + $text + '</a></li>');

    }

  });
}


function scrollActions() {

  // initiate sticky menu
  if ($(window).width() > 768 && $('#sticky-menu').length > 0 && $('#content').length > 0) {
    $("#sticky-menu").stick_in_parent({
      parent: "#content",
      bottoming: true,
      recalc_every: 1
    });
  } else {
    $("#sticky-menu").trigger("sticky_kit:detach");
  }

}