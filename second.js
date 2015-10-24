var selectedAlbum ="";
var selectedPic = "";
var currPhotos ="";
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


$('.photo-album').on('click', function(event) {
  event.preventDefault();
  //var clickedSection = "." + $(this).attr('rel');
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
    //var clickedSection = "." + $(this).attr('rel');
    //selectedAlbum = $(this).attr("rel");
    selectedPic = $(this).attr("id");
    $("#single_photo").addClass('activeSection');
    $("#single_album").removeClass('activeSection');
    var singlePicHTML = "<h1>" + currPhotos[selectedPic].name + "</h1><a href='' rel= '" + currPhotos[selectedPic].name +"'>Back to " + selectedAlbum + "</a><img src='" + currPhotos[selectedPic].url + "'>";

    $('#single_picture').html(singlePicHTML);


    $('#single_picture a').on('click', function(event){
      event.preventDefault();
      $("#single_photo").removeClass('activeSection');
      $("#single_album").addClass('activeSection');

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

});



});
