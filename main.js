var selectedAlbum ="";
var selectedPic = "";
var currPhotos ="";
var currPic ="";
var previousPic = "";
var nextPic = "";

$(document).ready(function(){


//create home page
var albumTemplate = _.template($('#albumTmpl').html());
var albumHTML = "";

_.each(albums, function(currVal, idx, arr){
  albumHTML += albumTemplate(currVal);

});

$('#home').html(albumHTML);

//Making Nav Menu

var navTemplate = _.template($('#navTmpl').html());
var navHTML ="";

_.each(albums, function(currVal, idx, arr){

  navHTML += navTemplate(currVal);

});


$('aside').html(navHTML);

//make single picture

$('#single_picture').html("<section><h1></h1><a href=''> Back to " + selectedAlbum + "</a></section><article id='previous'>Previous</article><article id='current'><img src='" + currPic.url + "'></article><article id='next'>Next</article>");

// Click functionality for photo album on home page bringing you to the single album display

$('.photo-album').on('click', function(event) {
  event.preventDefault();
  $('#single_album').addClass('activeSection');
  $("#start").removeClass('activeSection');
  selectedAlbum = $(this).attr("rel");

  currPhotos = albums.filter(function(currVal){
    return currVal.name === selectedAlbum;
  })[0].photos;

  var photosHTML = "<h1>" + selectedAlbum + "</h1>";

  _.each(currPhotos, function(currVal, idx, arr){

    photosHTML += "<article id='"+ idx + "' class ='pic' rel ='" + selectedAlbum + "'><img src ='" + currVal.url+"'><h3>" + currVal.name+ "</h3></article>";


  });

  $('#photos').html(photosHTML);

// Setting click event to bring you to single picture viewing
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


//Click to see previous picture in album


//click to see next picture in album



  });


//Click functionality for changing album displayed in single album view

$('aside a').on('click', function(event) {
  event.preventDefault();
  var clickedSection = "." + $(this).attr('rel');
  selectedAlbum = $(this).attr("rel");

  currPhotos = albums.filter(function(currVal){
    return currVal.name === selectedAlbum;
  })[0].photos;

  var photosHTML = "<h1>" + selectedAlbum + "</h1>";

  _.each(currPhotos, function(currVal, idx, arr){

    photosHTML += "<article id='"+ idx + "' class ='pic' rel ='" + selectedAlbum + "'><img src ='" + currVal.url+"'><h3>" + currVal.name+ "</h3></article>";

  });

  $('#photos').html(photosHTML);

  $('.pic').on('click', function(event) {
    event.preventDefault();
    selectedPic = parseInt($(this).attr("id"));
    $("#single_photo").addClass('activeSection');
    $("#single_album").removeClass('activeSection');
    // Set current, previous, and next pics
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
