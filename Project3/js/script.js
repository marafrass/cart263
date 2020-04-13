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
      //set the border color to white
      $(this).css("border-color", "white");

      let tileTerrain = checkTile();

      if(($(this).css('background-color'))=== 'green'){
        $(this).data("info").terrain = "Land";
      }

      $("#tileinfotext")
      .text(tileTerrain + ", " +
      $(this).data("info").building + ", " +
      $(this).data("info").x + "-" +
      $(this).data("info").y)



    })
    .mouseout(function() {
      $(this).css("border-color", "black");
    });

  $(".tile")
    .click(function(){

      clickedTile = $(this).attr("id");
      buildMenu();
    });

};


function checkTile(){
  if(grassTilesIDs.includes(`${currentTileID}`)){
  return "Land";
} else {
  return "Water"
}


}
