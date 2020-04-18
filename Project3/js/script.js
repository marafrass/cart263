"use strict";

/********************************************************************

Title of Project
by Martin Hanses

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

Audio ripped from Age of Empires 2 and Civilization III,
music from Civilization VI

https://www.sounds-resource.com/pc_computer/ageofempiresiiexpansions/sound/32974/
https://www.sounds-resource.com/pc_computer/sidmeierscivilizationiii/
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


  //Generate map!
  createMap();
  assignWater();
  assignLand();
  //Generate features on map!
  assignFeatures("Mountains", mountainRate, "url(assets/images/mountain.png)")
  assignFeatures("Forest", forestRate, "url(assets/images/forest.png)")
  assignFeatures("Farmlands", farmRate, "url(assets/images/farm.png)")
  assignSeaFeatures("Fish", fishRate, "url(assets/images/fish.png)")
  assignSeaFeatures("Oil", oilRate, "url(assets/images/oil.png)")
  //Set up points!
  updatePoints();
  //Open splash popup!
  introPopup();
}

//setupControls()
//
//This function sets up all interactability with the map after the
//first city has been placed - before that, you can only place your first
//city! (This function also starts playing music)
function setUpControls() {
  //Start playing music here
  playMusic();

  //Set up mouse hover effect
  $(".tile")
    .mouseover(function() {
      currentTileID = $(this).attr("id");
      //set the border color to white
      $(this).css("border-radius", "20px");

      //set information in tile box to be that of the currently hovered tile
      //IF TILE HAS NO CITY,
      //show terrain, feature and position
      if (($(this).data("info").cityName) === "None") {
        $("#tileinfotext")
          .text(($(this).data("info").terrain) + ", " +
            $(this).data("info").feature + ", " +
            $(this).data("info").y + "-" +
            $(this).data("info").x
          )
      } else {
        //IF TILE HAS CITY
        //show city name and position
        $("#tileinfotext")
          .text($(this).data("info").cityName + " (City) " +
            $(this).data("info").y + "-" +
            $(this).data("info").x)
      }

    })
    //remove border when
    //mouse off tile
    .mouseout(function() {
      $(this).css("border-radius", "4px");
    });

  //set up function for when tile is clicked
  $(".tile")
    .click(function() {
      clickedTile = $(this).attr("id");
      //after city has been placed - on consecutive clicks, it's business
      // as usual and we open the build menu
      if (firstCityPlaced === true) {
        buildMenu();

        //in case the clicked tile isn't a land tile, show error
      } else if ((landTilesIDs.includes(`${clickedTile}`)) === false) {
        displayError("Can't place a City here!")
        //if it IS a land tile, we place our first city!
      } else {
        buildCity();
        //set first city placed to be true!
        firstCityPlaced = true;
      }
    });

  //set up hover on/off on the tutorial button on the lower right side,
  //as well as opening the tutorial whenever clicked
  $("#tutorialpanel")
    //when clicked, open tutorial and play cool 3D sound
    .click(function() {
      sfxPopup3.play();
      $("#tutorial").dialog("close");
      setupTutorial();
    })
    //on hover, make button yellow
    .mouseover(function() {
      sfxHover.play();
      $(this).css("background-color", "yellow");
    })
    //on hover off set to normal again
    .mouseout(function() {
      $(this).css("background-color", "#eddcab");
    })

  //Start playing music here
  playMusic();

};


//display()
//
//Basic function that changes the information text in the UI
function display(text) {
  $("#infotext").text(text)

}

//displayError()
//
//Essentially the same as display() but also plays a sound to
//indicate an error has been made
function displayError(text) {
  sfxSelect2.play();
  $("#infotext").text(text)

}
