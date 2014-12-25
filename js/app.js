// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation().ready(function(){

  var nav_bar_height = $('.navigation_bar').height();
  var $previous_navigation_selection = $('li.nav.selected');

  $('.nav').on('click', function(){
    var $this_dom = $(this);
    $previous_navigation_selection.toggleClass('selected');
    $this_dom.toggleClass('selected');
    $previous_navigation_selection = $this_dom;

    var $destination = $(this).find('a').attr('href');
    var $dom_object = $("div.block[data-navigation='" + $destination + "']");
    var coordinates = $dom_object.offset();
    var location = coordinates.top - nav_bar_height + 2;
    if(location<0){
      location = 0;
    }

    $('body').animate({"scrollTop": location}, "slow");

    
    });
});