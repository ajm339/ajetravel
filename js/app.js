// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation().ready(function(){

  var nav_bar_height = $('.navigation_bar').height();
  var $previous_navigation_selection = $('li.nav.selected');

  $('.nav').on('click', function(){
    var $destination = $(this).find('a').attr('href');

    var $this_dom = $(".nav[data-navigation='" + $destination + "']");
    $previous_navigation_selection.toggleClass('selected');
    $this_dom.toggleClass('selected');
    $previous_navigation_selection = $this_dom;

    var $dom_object = $("div.block[data-destination='" + $destination + "']");
    var coordinates = $dom_object.offset();
    var location = coordinates.top - nav_bar_height + 2;
    if(location<0){
      location = 0;
    }

    $('body').animate({"scrollTop": location}, "slow");

    });
});