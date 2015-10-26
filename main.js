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


$('.photo-album').on('click', function(event) {
  event.preventDefault();
  $('#single_album').addClass('activeSection');
  $("#start").removeClass('activeSection');
  selectedAlbum = $(this).attr("id");

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
    // set current, previous, and next pics
    currPic = currPhotos[selectedPic];
    previousPic = currPhotos[selectedPic -1];
    nextPic = currPhotos[selectedPic+1];
    if(selectedPic === 0){
      previousPic = currPhotos[currPhotos.length -1];
    }
    else if (selectedPic === (currPhotos.length -1)){
      nextPic = currPhotos[0];
    }
    //set HTML
    //var singlePicHTML = "<h1>" + currPic.name + "</h1><a href='' rel= '" + currPic.name +"'>Back to " + selectedAlbum + "</a><article id='previous'>Previous</article><article id='current'><img src='" + currPic.url + "'></article><article id='next'>Next</article>";

    //$('#single_picture').html(singlePicHTML);
    $('#current').html("<img src='" + currPic.url +"'>");
    $('#single_picture h1').html(currPic.name);
    $('#single_picture a').html("Back to " + selectedAlbum);
    $('#single_picture a').on('click', function(event){
      event.preventDefault();
      $("#single_photo").removeClass('activeSection');
      $("#single_album").addClass('activeSection');

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
});

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
    //put in HTML
    //var singlePicHTML = "<h1>" + currPic.name + "</h1><a href='' rel= '" + currPic.name +"'>Back to " + selectedAlbum + "</a><img src='" + currPic.url + "'>";

    //$('#single_picture').html(singlePicHTML);
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



});
