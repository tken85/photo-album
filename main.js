var selectedAlbum ="";
var selectedPic = "";

$(document).ready(function(){


//create home page
var albumTemplate = _.template($('#albumTmpl').html());
var albumHTML = "";

_.each(albums, function(currVal, idx, arr){
  albumHTML += albumTemplate(currVal);

  /*albumHTML += "<article class='photo-album'>"
  + "<img src='" + currVal.photo1
  + "'>"
  + "<h3>" + currVal.name + "</h3>"
  + "</article>";*/


});

$('#home').html(albumHTML);


//create side bar

var navHTML ="";

_.each(albums, function(currVal, idx, arr){

  navHTML += "<a href='' rel='"+ currVal.name +"'>"
    +currVal.name
    +"</a>";


});

var photoHTML ="";



$('aside').html(navHTML);


//click functionality home

$('.photo-album').on('click', function(event) {
  event.preventDefault();
  //var clickedSection = "." + $(this).attr('rel');
  $('#single_album').addClass('activeSection');
  $("#start").removeClass('activeSection');
  selectedAlbum = $(this).attr("id");

  //try iterating this on the array of photos. ----------------------------------
  _.each(albums, function(currVal){

    if(currVal.name === selectedAlbum){
      $('#photos').html("<h1>" + currVal.name+ "</h1><article id='photo1' class='pic' rel='"+currVal.name+"'><img src='" + currVal.photos.photo1 + "'><h3>" + currVal.photos.photo1_name+ "</h3></article><article id='photo2' class='pic' rel='"+currVal.name+"'><img src='" + currVal.photos.photo2 + "'><h3>" + currVal.photos.photo2_name + "</h3></article><article id='photo3' class='pic' rel='"+currVal.name+"'><img src='" + currVal.photos.photo3 + "'><h3>" + currVal.photos.photo3_name+ "</h3></article>");
    }

  });

  $('.pic').on('click', function(event) {
    event.preventDefault();
    //var clickedSection = "." + $(this).attr('rel');
    //selectedAlbum = $(this).attr("rel");
    selectedPic = $(this).attr("id");
    $("#single_photo").addClass('activeSection');
    $("#single_album").removeClass('activeSection');

    _.each(albums, function(currVal){

      if(currVal.name === selectedAlbum){
        $('#single_picture').html("<h1>"+currVal.name+"</h1><a href='' rel='"+currVal.name+"'>Back to "+currVal.name +"</a><img src='" + currVal.photos[selectedPic] + "'>");
      }

    });

    $('#single_picture a').on('click', function(event){
      event.preventDefault();
      $("#single_photo").removeClass('activeSection');
      $("#single_album").addClass('activeSection');

      _.each(albums, function(currVal){

        if(currVal.name === selectedAlbum){
          $('#photos').html("<h1>" + currVal.name+ "</h1><article id='photo1' class='pic' rel='"+currVal.name+"'><img src='" + currVal.photos.photo1 + "'><h3>" + currVal.photos.photo1_name+ "</h3></article><article id='photo2' class='pic' rel='"+currVal.name+"'><img src='" + currVal.photos.photo2 + "'><h3>" + currVal.photos.photo2_name + "</h3></article><article id='photo3' class='pic' rel='"+currVal.name+"'><img src='" + currVal.photos.photo3 + "'><h3>" + currVal.photos.photo3_name+ "</h3></article>");
        }
      });



    });

  });


});
//click functionality nav

  $('aside a').on('click', function(event) {
    event.preventDefault();
    var clickedSection = "." + $(this).attr('rel');
    selectedAlbum = $(this).attr("rel");
    _.each(albums, function(currVal){

      if(currVal.name === selectedAlbum){
        $('#photos').html("<h1>" + currVal.name + "</h1><article id='photo1' class='pic' rel='"+ currVal.name+ "'><img src='" + currVal.photos.photo1 + "'><h3>" + currVal.photos.photo1_name+ "</h3></article><article id='photo2' class='pic' rel='" +currVal.name+ "'><img src='" + currVal.photos.photo2 + "'><h3>" + currVal.photos.photo2_name + "</h3></article><article id='photo3' class='pic' rel='"+currVal.name+"'><img src='" + currVal.photos.photo3 + "'><h3>" + currVal.photos.photo3_name+ "</h3></article>");
      }

    });


});

// pic clicking










});
