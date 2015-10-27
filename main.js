//this is the initial non-refactored code

var selectedAlbum ="";
var selectedPic = "";
var currPhotos ="";
var currPic ="";
var previousPic = "";
var nextPic = "";

$(document).ready(function(){

var templating = function(tmpl, $el, data){
  var template =_.template($(tmpl).html());
  var addHTML ="";

  _.each(data, function(currVal, idx, arr){
    addHTML += template(currVal);
  });

  $el.html(addHTML);

};

//create home page
templating('#albumTmpl', $('#home'), albums);

// create nav bar
templating('#navTmpl', $('aside'), albums);

//make single picture

$('#single_picture').html("<section><h1></h1><a href=''> Back to " + selectedAlbum + "</a></section><article id='previous'>Previous</article><article id='current'><img src='" + currPic.url + "'></article><article id='next'>Next</article>");



//create action for clicking on a picture in album view

var picClick = function(){
  $('.pic').on('click', function(event) {
    event.preventDefault();
    selectedPic = parseInt($(this).attr("id"));
    $("#single_photo").addClass('activeSection');
    $("#single_album").removeClass('activeSection');
    // set current, previous, and next pics. conditional on position in array
    currPic = currPhotos[selectedPic];
    previousPic = currPhotos[selectedPic -1];
    nextPic = currPhotos[selectedPic+1];
    if(selectedPic === 0){
      previousPic = currPhotos[currPhotos.length -1];
    }
    else if (selectedPic === (currPhotos.length -1)){
      nextPic = currPhotos[0];
    }

    $('#current').html("<img src='" + currPic.url +"'>");
    $('#single_picture h1').html(currPic.name);
    $('#single_picture a').html("Back to " + selectedAlbum);
    $('#single_picture a').on('click', function(event){
      event.preventDefault();
      $("#single_photo").removeClass('activeSection');
      $("#single_album").addClass('activeSection');

    });
  });

};

// Click functionality for photo album on home page bringing you to the single album display

var loadAlbum = function(selAlbum){
  event.preventDefault();
  $('#single_album').addClass('activeSection');
  $("#start").removeClass('activeSection');

  currPhotos = albums.filter(function(currVal){
    return currVal.name === selectedAlbum;
  })[0].photos;

  var photosHTML = "<h1>" + selectedAlbum + "</h1>";

  _.each(currPhotos, function(currVal, idx, arr){

    photosHTML += "<article id='"+ idx + "' class ='pic' rel ='" + selectedAlbum + "'><img src ='" + currVal.url+"'><h3>" + currVal.name+ "</h3></article>";


  });

  $('#photos').html(photosHTML);

  // Setting click event to bring you to single picture viewing

  picClick();

};

$('.photo-album, aside a').on('click', function(event) {
  selectedAlbum = $(this).attr("rel");
  loadAlbum(selectedAlbum);

  });


$('#previous').on('click', function(event){
  event.preventDefault();
  $('#current').html("<img src='" + previousPic.url+"'>");
  $('#single_picture h1').html(previousPic.name);
  currPic = previousPic;
  if(selectedPic === 0){
    selectedPic = (currPhotos.length - 1);
  }
  else{
    selectedPic -= 1;
  }
  previousPic = currPhotos[selectedPic -1];
  nextPic = currPhotos[selectedPic+1];
  if(selectedPic === 0){
    previousPic = currPhotos[currPhotos.length -1];
  }
  else if (selectedPic === (currPhotos.length -1)){
    nextPic = currPhotos[0];
  }
});

$('#next').on('click', function(event){
  event.preventDefault();
  $('#current').html("<img src='" + nextPic.url+"'>");
  $('#single_picture h1').html(nextPic.name);
  currPic = nextPic;
  if(selectedPic === (currPhotos.length -1)){
    selectedPic = 0;
  }
  else{
    selectedPic += 1;
  }
  previousPic = currPhotos[selectedPic -1];
  nextPic = currPhotos[selectedPic+1];
  if(selectedPic === 0){
    previousPic = currPhotos[currPhotos.length -1];
  }
  else if (selectedPic === (currPhotos.length -1)){
    nextPic = currPhotos[0];
  }
});

});
