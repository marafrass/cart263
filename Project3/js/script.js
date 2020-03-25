"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

$(document).ready(setup);


function setup() {

  createMap();
  assignGrass();
  setUpControls();

}

function setUpControls() {


  //Set up mouse hover effect
  $(".tile")
    .mouseover(function() {
      $(this).css("border-color", "white");
    })
    .mouseout(function() {
      $(this).css("border-color", "black");
    });
  $(".tile")
    .click(function() {
      let currentTileID = $(this).attr("id");

      if ((grassTilesIDs.includes(`#${currentTileID}`)) === true) {
        $(this).css("background-image", "url(assets/images/house.png)");
        console.log(`City built on ${currentTileID}!`)
      } else {
        console.error("Can't build here!")
      }
    });

};
