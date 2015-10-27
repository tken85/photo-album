
//original code can be found in main.js

//immediately invoked function to prevent user access to variables/functions in the console
(function() {
  'use strict';

//delcaration of variables available to our photoAlbum object. Would it be better to put these as key value pairs in the object and call them as photoAlbum.variableName?

var selectedAlbum ="";
var selectedPic = "";
var currPhotos ="";
var currPic ="";
var previousPic = "";
var nextPic = "";


$(document).ready(function(){
  photoAlbum.init();
});

var photoAlbum = {
  init : function(){
    this.initStyling();
    this.initEvents();
  },
  initEvents : function(){
    // Display single album and give single album click functionality
    $('.photo-album, aside a').on('click', function(event) {
      event.preventDefault();
      selectedAlbum = $(this).attr("rel");
      photoAlbum.loadSingleAlbum(selectedAlbum);
      //picClick is included so that all generated elements have the ability
      photoAlbum.picClick();
      });
    //Click functionality to view previous picture
    $('#previous').on('click', function(event){
        event.preventDefault();
        photoAlbum.viewPrevious();
      });
    //click functionality to view next picture
      $('#next').on('click', function(event){
        event.preventDefault();
        photoAlbum.viewNext();
      });

  },
  initStyling : function(){
    photoAlbum.loadAllAlbums();
    photoAlbum.loadNav();
    photoAlbum.loadSinglePic();
  },
  // call a template for use
  templating : function(tmpl, $el, data){
    var template =_.template($(tmpl).html());
    var addHTML ="";

    _.each(data, function(currVal, idx, arr){
      addHTML += template(currVal);
    });

    $el.html(addHTML);

  },
  // use the template to show all albums at once on the home page
  loadAllAlbums : function(){
    photoAlbum.templating('#albumTmpl', $('#home'), albums);
  },
  // use the nav template to show the side bar in single album view
  loadNav : function(){
    photoAlbum.templating('#navTmpl', $('aside'), albums);
  },
  // create an initial instance of a single picture
  loadSinglePic : function(){
    $('#single_picture').html("<section><h1></h1><a href=''> Back to " + selectedAlbum + "</a></section><article id='previous'>Previous</article><article id='current'><img src='" + currPic.url + "'></article><article id='next'>Next</article>");
  },
  // function for going to single picture view
  picClick : function(){
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
  },
  loadSingleAlbum : function(selAlbum){
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

  },
    viewPrevious : function(){
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
    },
    viewNext : function(){
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
    },

};

}());
