"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

$(document).ready(setup);

let currentTileID;
let clickedTile;

function setup() {

  createMap();
  assignWater();
  assignLand();
  assignFeatures("Mountains", mountainRate, "url(assets/images/mountain.png)")
  assignFeatures("Forest", forestRate, "url(assets/images/forest.png)")
  assignFeatures("Farmlands", farmRate, "url(assets/images/farm.png)")
  assignSeaFeatures("Fish", fishRate, "url(assets/images/fish.png)")
  setUpControls();
  updatePoints();
}


function setUpControls() {
  //Set up mouse hover effect
  $(".tile")
    .mouseover(function() {
      currentTileID = $(this).attr("id");
      //set the border color to white
      $(this).css("border-color", "white");

      let tileTerrain = $(this).data("info").terrain;

      if (($(this).data("info").cityName) === "None") {
        $("#tileinfotext")
          .text(tileTerrain + ", " +
            $(this).data("info").feature + ", " +
            $(this).data("info").y + "-" +
            $(this).data("info").x)
      } else {
        $("#tileinfotext")
          .text($(this).data("info").cityName + " (City) " +
            $(this).data("info").y + "-" +
            $(this).data("info").x)
      }

    })
    .mouseout(function() {
      $(this).css("border-color", "black");
    });

  $(".tile")
    .click(function() {

      clickedTile = $(this).attr("id");
      buildMenu();
    });


};



function display(text) {

  $("#infotext").text(text)

}
