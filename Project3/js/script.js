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
let firstCityPlaced = false;

function setup() {

  createMap();
  assignWater();
  assignLand();
  assignFeatures("Mountains", mountainRate, "url(assets/images/mountain.png)")
  assignFeatures("Forest", forestRate, "url(assets/images/forest.png)")
  assignFeatures("Farmlands", farmRate, "url(assets/images/farm.png)")
  assignSeaFeatures("Fish", fishRate, "url(assets/images/fish.png)")
  assignSeaFeatures("Oil", oilRate, "url(assets/images/oil.png)")

  updatePoints();

  introPopup();
}


function setUpControls() {
  //Set up mouse hover effect
  $(".tile")
    .mouseover(function() {
      currentTileID = $(this).attr("id");
      //set the border color to white
      $(this).css("border-radius", "20px");

      let tileTerrain = $(this).data("info").terrain;

      if (($(this).data("info").cityName) === "None") {
        $("#tileinfotext")
          .text(tileTerrain + ", " +
            $(this).data("info").feature + ", " +
            $(this).data("info").y + "-" +
            $(this).data("info").x 
          )
      } else {
        $("#tileinfotext")
          .text($(this).data("info").cityName + " (City) " +
            $(this).data("info").y + "-" +
            $(this).data("info").x)
      }

    })
    .mouseout(function() {
      $(this).css("border-radius", "4px");
    });

  $(".tile")
    .click(function() {
        //for consecutive clicks, it's business as usual and we open the build menu
      if (firstCityPlaced === true) {
        clickedTile = $(this).attr("id");
        buildMenu();

        //for the very first click, we place out first city!
      } else {
        clickedTile = $(this).attr("id");
        buildCity();
        firstCityPlaced = true;
      }
    });


};



function display(text) {

  $("#infotext").text(text)

}

function introPopup() {

  return $("<div class='fixed-dialog' title='Hello!'><p>Welcome to divworld!</p></div>").dialog({
    height: 650,
    width: 400,
    position: [],
    modal: true,
    dialogClass: "noclose",

    //set buttons for the responses
    buttons: {
      Start: function() {
        setUpControls();
        $(this).dialog("close");
      },
      Regenerate: function() {
        $(this).dialog("close");
        location.reload();


      }

    }

  })


}
