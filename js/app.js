// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

  //class variables
  var nav_bar_height = $('.navigation_bar').height();
  var $previous_navigation_selection = $('li.nav.selected');

  //clicking on navigation to scroll on page
  $('.nav').on('click', function(){
    var $destination = $(this).find('a').attr('href');
    var data_hash = {};
    data_hash['current_dom'] = $(".nav[data-navigation='" + $destination + "']");
    data_hash['previous_dom'] = $previous_navigation_selection;
    toggleNavigation(data_hash);
    
    $previous_navigation_selection = data_hash['current_dom'];

    var $destination_dom = $("div.block[data-destination='" + $destination + "']");
    var coordinates = $destination_dom.offset();
    var location = coordinates.top - nav_bar_height + 5;
    if(location<0){
      location = 0;
    }
    $('body').animate({"scrollTop": location}, "slow");

  });

  //class variables for scrolling
  var direct_index = [];
  var inverted_index = {};
  var elements = document.getElementsByClassName("block");
  for(i = 0; i<elements.length; i++){ 
    direct_index[i] = {destination: elements[i].dataset.destination, offset:elements[i].offsetTop};
    inverted_index[elements[i].dataset.destination] = i;
  }

  var current_offset;
  var current_marker;
  var previous_rank;
  var previous_offset;

  //switch navigation highlight on scroll event
  $(window).on('scroll', function(){
    current_offset = $('.navigation_bar').offset().top;
    var data_hash = {};
    // $previous_dom = $('li.nav.selected')[0];
    // data_hash['previous_dom'] = $('li.nav.selected');
    // console.log('highlighted: ' + $previous_dom);
    var previous_dom_name = $('li.nav.selected').data('navigation');
    // console.log("data_hash previous_dom: " + data_hash['previous_dom']);
    // console.log('previous_dom_name: ' + previous_dom_name);
    previous_rank = inverted_index[previous_dom_name];
    // console.log('previous_rank: ' + previous_rank);
    previous_offset = direct_index[previous_rank].offset;

    if((current_offset < previous_offset-100) && (previous_rank > 0)){
      console.log('if less');
      previous_rank -= 1;
      var current_dom_name = direct_index[previous_rank].destination;
      // data_hash['current_dom'] = $(".nav[data-navigation='" + current_dom_name + "']");
      $('li.nav.selected').toggleClass('selected');
      $(".nav[data-navigation='" + current_dom_name + "']").toggleClass('selected');
      // toggleNavigation(data_hash);
      // data_hash['previous_dom'] = data_hash['current_dom'];
    } else if((previous_rank < direct_index.length-1)&&(current_offset >= direct_index[previous_rank+1].offset)){
      console.log('if greater');
      previous_rank += 1;
      var current_dom_name = direct_index[previous_rank].destination;
      // data_hash['current_dom'] = $(".nav[data-navigation='" + current_dom_name + "']").toggleClass('selected');
      // toggleNavigation(data_hash);
      // data_hash['previous_dom'] = data_hash['current_dom'];
      $('li.nav.selected').toggleClass('selected');
      $(".nav[data-navigation='" + current_dom_name + "']").toggleClass('selected');
    }
  });

  function toggleNavigation(data_hash){
    console.log('data_hash: ' + data_hash);
    $previous_dom = data_hash['previous_dom'];
    $current_dom = data_hash['current_dom'];
    $previous_dom.toggleClass('selected');
    $current_dom.toggleClass('selected');
  }

