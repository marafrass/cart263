"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

$(document).ready(setup);

let currentTileID;
let response;


function setup() {

  createMap();
  assignGrass();
  setUpControls();

}

function setUpControls() {


  //Set up mouse hover effect
  $(".tile")
    .mouseover(function() {
        currentTileID = $(this).attr("id");

      $(this).css("border-color", "white");

      let tileTerrain = checkTile();

      $("#tileinfotext")
      .text($(this).data("info").terrain + ", " +
      $(this).data("info").type  + ", " +
      $(this).data("info").id);
    })
    .mouseout(function() {
      $(this).css("border-color", "black");
    });

  $(".tile")
    .click(buildMenu);

};



function createDialog(title, text, responseOne, responseTwo) {

  //create the HTML for the dialog using the set parameters
  return $("<div class='dialog' title='" + title + "'><p>" + text + "</p></div>")
    //Set dimensions of the dialog
    .dialog({
      height: 400,
      width: 300,
      modal: true,
      //set buttons for the responses
      buttons: {
        //Response one
        Yes: function() {
          $(this).dialog("close");
          buildCity();
        },
        //Response two
        No: function() {
          $(this).dialog("close");
          response = false;
          return response;

        }
      }
    });

}


function checkTile(){
  if(grassTilesIDs.includes(`#${currentTileID}`)){
  return "Land tile";
} else {
  return "Water Tile "
}


}
