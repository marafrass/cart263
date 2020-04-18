/////////////////////////////////////////////////////////////////////
// BUILDING FUNCTIONS
//
// These functions dictate what happens whenever a particular building
// is built!
// Additionally has the code for checking adjacent tiles and other
// general functions related to building
//
/////////////////////////////////////////////////////////////////////


//buildMenu()
//
//Spawn in the dialog box for selecting what the player wants to build
function buildMenu() {

  //Lots of checks to see what is on the clicked tile!

  //test if there is a building on the selected tile and stops player if true
  if (buildings.includes($(`#${clickedTile}`).data("info").feature) === true) {
    displayError("This tile already has a building!")

  } else if ($(`#${clickedTile}`).data("info").cityRange === false) {
    //if the tile is out of range for a city, stop player from building
    displayError("You're too far away from any city!");

    //if there is no building here, check if the selected tile is a ocean tile
  } else if ($(`#${clickedTile}`).data("info").feature === "Ocean") {
    //if it is, stop player from building
    displayError("Can't build on " + ($(`#${clickedTile}`).data("info").feature) + "!");

    //Check if the selected tile is a land tile
  } else if ((landTilesIDs.includes(`${clickedTile}`)) === true) {
    //if so, create land dialog with relevant info and title
    display("Select your build!")
    sfxPopup2.play();
    landDialog("Land Tile:", "What do you want to build on this tile?");

    //if the selected tile has no building nor ocean tile, and doesnt appear in land tiles array,
    // check if it is a Shallows tile
  } else if ($(`#${clickedTile}`).data("info").feature === "Shallows") {
    sfxPopup2.play();
    display("Select your build!")
    seaDialog("Sea Tile:", "What do you want to build on this tile?");
  }
};

/////////////////////////////////////////////////////////////////////
//
// All functions are written like buildCity()
// refer to this for comments!
//
/////////////////////////////////////////////////////////////////////


//buildCity()
//
//For building cities on the map
function buildCity() {
  //first check if player has enough production points
  if (productionPoints >= cityCost && housingPoints >= (cityCost - 5)) {
    //if so, have the player name the city and detract and add the appropriate points

    productionPoints -= cityCost;
    housingPoints -= (cityCost - 5);
    //set the tile to contain the appropriate information
    $(`#${clickedTile}`).css("background-image", "url(assets/images/house.png)");
    $(`#${clickedTile}`).data("info").feature = "City";
    display("City built!")
    //give points for building the city
    productionPoints += 3;
    housingPoints += 3;
    //update points
    updatePoints();
    checkSurroundingTilesFor("Houses");
    //Set the tiles in range of the city to be buildable, based on the radius variable
    setInRange();
    //name the city
    nameCity();
    //increase the cost of future cities
    cityCost += 2;


  } else {
    //If not enough points, show error
    displayError(`Not enough points! Need ${cityCost} PP and ${cityCost-5} HP!`)
  }

}

/////////////////////////////////////////////////////////////////////
//buildHouses()
//
//Function for building house
function buildHouses() {
  //check if enough points
  if (productionPoints >= houseCost) {

    productionPoints -= houseCost;

    $(`#${clickedTile}`).css("background-image", "url(assets/images/houses.png)");
    $(`#${clickedTile}`).data("info").feature = "Houses";

    let addedTotal = checkSurroundingTilesFor("City");
    addedTotal += checkSurroundingTilesFor("Park");
    housingPoints += (addedTotal + 1);
    sfxHouse.play();

    display(`Houses built - earned ${addedTotal+1} Housing Points!`)
    updatePoints();
  } else {
    displayError(`Not enough production points! Need ${houseCost}!`)
  }

}

/////////////////////////////////////////////////////////////////////
//buildCamp()
//
function buildCamp() {

  if (housingPoints >= campCost) {

    if (checkSurroundingTilesFor("Camp") < 1) {

      housingPoints -= campCost;

      $(`#${clickedTile}`).css("background-image", "url(assets/images/camp.png)");
      $(`#${clickedTile}`).data("info").feature = "Camp";

      let addedPoints = checkSurroundingTilesFor("Forest");
      productionPoints += addedPoints;
      sfxCamp.play();
      display(`Camp built - Earned ${addedPoints} Production Points!`)

      console.log(`Camp built on ${clickedTile}!`)
      updatePoints();
    } else {
      displayError("Can't build a Camp so close to another!")
    }
  } else {
    displayError(`Not enough housing points! Need ${campCost}!`)
  }

}

/////////////////////////////////////////////////////////////////////
//buildFactory()
//
function buildFactory() {

  if (housingPoints >= factoryCost) {

    housingPoints -= factoryCost;
    productionPoints += factoryCost;
    sfxFactory.play();

    display("Factory built!")
    $(`#${clickedTile}`).css("background-image", "url(assets/images/factory.png)");
    $(`#${clickedTile}`).data("info").feature = "Factory";

    updatePoints();
  } else {
    displayError(`Not enough housing points! Need ${factoryCost}!`)
  }
}

/////////////////////////////////////////////////////////////////////
//buildFarm()
//
function buildFarm() {

  if (housingPoints >= farmCost) {

    if (checkSurroundingTilesFor("Farm") < 1) {

      let addedPoints = checkSurroundingTilesFor("Farmlands")
      housingPoints -= farmCost;
      productionPoints += addedPoints;
      sfxFarm.play();

      display(`Farm built - earned ${addedPoints} Production Points!`)
      $(`#${clickedTile}`).css("background-image", "url(assets/images/farmhouse.png)");
      $(`#${clickedTile}`).data("info").feature = "Farm";

      console.log(`Farm built on ${clickedTile}!`)
      updatePoints();
    } else {
      displayError("Can't build a Farm so close to another!")
    }
  } else {
    displayError(`Not enough housing points! Need ${farmCost}!`)
  }
}

/////////////////////////////////////////////////////////////////////
//buildPark()
//
function buildPark() {

  if (productionPoints >= parkCost) {

    if (checkSurroundingTilesFor("Park") < 1) {

      $(`#${clickedTile}`).css("background-image", "url(assets/images/park.png)");
      $(`#${clickedTile}`).data("info").feature = "Park";

      productionPoints -= parkCost;
      sfxPark.play();
      display(`Park built! How nice!`)
      updatePoints();
    } else {
      displayError("Can't build a Park so close to another!")
    }
  } else {
    displayError(`Not enough housing points! Need ${farmCost}!`)
  }
}

/////////////////////////////////////////////////////////////////////
//buildMine()
//
function buildMine() {

  if (housingPoints >= mineCost) {

    if (checkSurroundingTilesFor("Mine") < 1) {

      $(`#${clickedTile}`).css("background-image", "url(assets/images/mine.png)");
      $(`#${clickedTile}`).data("info").feature = "Mine";

      let addedPoints = (checkSurroundingTilesFor("Mountains") * 2);
      productionPoints += addedPoints;
      housingPoints -= mineCost;
      sfxMine.play();
      display(`Mine built - Earned ${addedPoints} Production Points!`)

      updatePoints();

    } else {
      displayError("Can't build a Mine so close to another!")
    }
  } else {
    displayError(`Not enough housing points! Need ${mineCost}!`)
  }
}


//////////////////////////////////////////////////////////////////////////////////////
////////////////////           SEA BUILDINGS BELOW            ////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////
//buildFishery()
//
function buildFishery() {

  if (checkSurroundingTilesFor("Fishery") < 1) {

    if (housingPoints >= fisheryCost) {

      $(`#${clickedTile}`).css("background-image", "url(assets/images/fishery.png)");
      $(`#${clickedTile}`).data("info").feature = "Fishery";

      let addedPoints = (checkSurroundingTilesFor("Fish")) * 2;
      productionPoints += addedPoints;
      housingPoints -= fisheryCost;
      sfxFishery.play();

      display(`Fishery built - Earned ${addedPoints} Production Points!`)

      updatePoints();

    } else {
      displayError(`Not enough housing points! Need ${fisheryCost}!`)
    }
  } else {
    displayError("Can't build a Fishery so close to another!")
  }
}

/////////////////////////////////////////////////////////////////////
//buildOilRig()
//
function buildOilRig() {

  if (housingPoints >= oilrigCost) {

    if (checkSurroundingTilesFor("Oil Rig") < 1) {

      $(`#${clickedTile}`).css("background-image", "url(assets/images/refinery.png)");
      $(`#${clickedTile}`).data("info").feature = "Oil Rig";
      let addedPoints = (checkSurroundingTilesFor("Oil")) * 5;
      productionPoints += addedPoints;
      housingPoints -= oilrigCost;
      sfxOilrig.play();

      display(`Oil Rig built - Earned ${addedPoints} Production Points! Great job pushing fossil fuels, asshole!`)

      updatePoints();
    } else {
      displayError("Can't build a Oil Rig so close to another!")
    }
  } else {
    displayError(`Not enough housing points! Need ${oilrigCost}!`)

  }

}

/////////////////////////////////////////////////////////////////////
//buildHarbor()
//
function buildHarbor() {

  if (housingPoints >= harborCost) {

    if (checkSurroundingTilesFor("City") >= 1) {
      $(`#${clickedTile}`).css("background-image", "url(assets/images/harbor.png)");
      $(`#${clickedTile}`).data("info").feature = "Harbor";

      let addedPoints = checkSurroundingTilesFor("Shallows") * 1;
      productionPoints += addedPoints;
      housingPoints -= harborCost;
      sfxHarbor.play();

      display(`Harbor built - Earned ${addedPoints} Production Points!`)
      updatePoints();

    } else {
      displayError("Can't place a harbor here - needs an adjacent City!")

    }
  } else {
    displayError(`Not enough housing points! Need ${harborCost}!`)
  }


}

/////////////////////////////////////////////////////////////////////
//buildLighthouse()
//
function buildLighthouse() {

  if (housingPoints >= lighthouseCost) {

    if (checkSurroundingTilesFor("Grasslands") >= 2) {
      $(`#${clickedTile}`).css("background-image", "url(assets/images/lighthouse.png)");
      $(`#${clickedTile}`).data("info").feature = "Lighthouse";

      let addedPoints = checkSurroundingTilesFor("Ocean") * 3;
      productionPoints += addedPoints;
      housingPoints -= lighthouseCost;
      sfxLighthouse.play();

      display(`Lighthouse built - Earned ${addedPoints} Production Points!`)

      updatePoints();
    } else {
      displayError("Can't place a lighthouse here - needs at least two tiles of grasslands!")
    }
  } else {
    displayError(`Not enough housing points! Need ${lighthouseCost}!`)
  }

}


//////////////////////////////////////////////////////////////////////////////////////
////////////////////         **GENERAL FUNCTIONS**            ////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////




//updatePoints()
//
//Updates the points displayed in the UI
function updatePoints() {
  $("#housing").text(`Housing Points: ${housingPoints}`);
  $("#production").text(`Production Points: ${productionPoints}`);
}


//checkSurroundingTilesFor()
///
// This function checks surrounding tiles for the parameter (feature) given
// and was an absolute bitch to write but I'm proud I did.
function checkSurroundingTilesFor(searchedFeature) {
  //Set temporary variables for the x and y
  let tileX = $(`#${clickedTile}`).data("info").x;
  let tileY = $(`#${clickedTile}`).data("info").y;
  //Set all other temporary variables
  let result = 0;
  let searchY = tileY - 1;
  let searchX = tileX - 1;
  //cycle through tiles vertically *3
  for (let y = 0; y < 3; y++) {
    //cycle through tiles horisontally  *3
    for (let i = 0; i < 3; i++) {
      //ignore the tile if it is off the map
      if ((allTilesIDs.includes(`${searchY}-${searchX}`)) === false) {} else {
        //Add one to the result value if the parameter feature was found in this tile
        if ($(`#${searchY}-${searchX}`).data("info").feature === searchedFeature) {
          result += 1;
        };
        searchX += 1;
      }
    }
    searchX = tileX - 1;
    searchY += 1;
  }
  //return the found amount
  return result;
}


//setInRange();
//
// This function calculates the surrounding tiles around a newly built city!
// I wrote it myself! I'm immensely proud of it!
function setInRange() {
  //Set up all necessary variables
  let tileX = $(`#${clickedTile}`).data("info").x;
  let tileY = $(`#${clickedTile}`).data("info").y;

  // It might be possible to simplify these, but in all honesty this is just my level of smartness
  // and I can not go beyond it at this point. Hell, I'm happy to have worked this out in the first
  // place.
  //
  let searchY = tileY - radius;
  let searchX = tileX - 0;
  let startingX = searchX;
  let hitPeak = false;

  //Run the loope twice, counting up and then down!
  for (let y = 0; y < 2; y++) {
    //For when counting up, do the following
    if (hitPeak === false) {
      let width = 1;
      for (let i = 0; i < radius; i++) {
        for (let w = 0; w < width; w++) {
          //ignore the tile if it is off the map
          if ((allTilesIDs.includes(`${searchY}-${searchX}`)) === false) {} else {
            //Set the relevant tiles to be "in range" of the city!
            $(`#${searchY}-${searchX}`).css("border-color", "red");
            $(`#${searchY}-${searchX}`).css("color", "white");
            $(`#${searchY}-${searchX}`).data("info").cityRange = true;
            $(`#${searchY}-${searchX}`).css('animation-name', "border");
            $(`#${searchY}-${searchX}`).css('animation-duration', "2s");
            $(`#${searchY}-${searchX}`).css('animation-iteration-count', "infinite");
          }
          searchX += 1;
        }
        //update variables for next loop
        width += 2;
        searchY += 1;
        startingX -= 1;
        searchX = startingX;
      }
      //mark that the mid point has been reached
      if (searchY === tileY) {
        hitPeak = true; //yeah boiiiii
      }

      //when the mid-point has been passed, we instead run the follow for loop,
      //which counts down instead of up
    } else {
      let width = ((radius * 2) + 1);
      for (let i = 0; i < (radius + 1); i++) {
        for (let w = 0; w < width; w++) {
          if ((allTilesIDs.includes(`${searchY}-${searchX}`)) === false) {
            console.log("Undefined tile ignored.")
          } else {
            //Set the relevant tiles to be "in range" of the city!
            $(`#${searchY}-${searchX}`).css("border-color", "red");
            $(`#${searchY}-${searchX}`).css("color", "white");
            $(`#${searchY}-${searchX}`).data("info").cityRange = true;
            $(`#${searchY}-${searchX}`).css('animation-name', "border");
            $(`#${searchY}-${searchX}`).css('animation-duration', "2s");
            $(`#${searchY}-${searchX}`).css('animation-iteration-count', "infinite");
          }
          searchX += 1;
        }
        //Add to variables to move row and column
        width -= 2;
        searchY += 1;
        startingX += 1;
        searchX = startingX;
      }
    };
  };
}
