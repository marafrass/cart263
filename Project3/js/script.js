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

let dataInUse;

function setup() {

  /*********************************************************************/
/////JSON LOADING
  $.getJSON("data/data.json")
    .done(dataLoaded)
    .fail(dataError)

  //dataLoaded()
  //
  //sets the loaded data to a variable
  function dataLoaded(data) {
    dataInUse = data;
  }

  //dataError()
  //
  //Displays error message wif the JSON doesnt load
  function dataError(request, textStatus, error) {
    console.error(error);
  }
/////JSON LOADING DONE
/*********************************************************************/


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
      clickedTile = $(this).attr("id");
      //for consecutive clicks, it's business as usual and we open the build menu
      if (firstCityPlaced === true) {

        buildMenu();

        //for the very first click, we place out first city!
      } else if ((landTilesIDs.includes(`${clickedTile}`)) === false) {
        display("Can't place a City here!")

      } else {
        buildCity();
        firstCityPlaced = true;
      }
    });


  $("#tutorialpanel")
    .click(function() {
      sfxPopup3.play();
      $("#tutorial").dialog("close");
      setupTutorial();
    })
    .mouseover(function() {
      sfxHover.play();
      $(this).css("background-color", "yellow");
    })
    .mouseout(function() {
      $(this).css("background-color", "#eddcab");
    })



};



function display(text) {
  $("#infotext").text(text)

}
function displayError(text) {
  sfxSelect2.play();
  $("#infotext").text(text)

}
