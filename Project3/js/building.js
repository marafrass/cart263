let cityCost = 13;
let houseCost = 1;
let factoryCost = 3;
let campCost = 1;
let mineCost = 1;
let parkCost = 1;
let farmCost = 1;
let harborCost = 2;
let lighthouseCost = 1;
let oilrigCost = 3;
let fisheryCost = 1;

let productionPoints = cityCost + 2;
let housingPoints = 22;



//buildMenu()
//
//Spawn in the dialog box for selecting what the player wants to build
function buildMenu() {
  //test if there is a building on the selected tile
  if ($(`#${clickedTile}`).data("info").feature === "City") {
    display("Can't build on a City! You dingus!")
  } else if ($(`#${clickedTile}`).data("info").cityRange === false) {
    //if there is, stop player from building
    console.error("Can't build here!")
    display("You're too far away from any city!");
    //if there is no building here, check if the selected tile is a land tile
  } else if ($(`#${clickedTile}`).data("info").feature === "Ocean") {
    //if there is, stop player from building
    console.error("Can't build here!")
    display("Can't build on " + ($(`#${clickedTile}`).data("info").feature) + "!");
    //if there is no building here, check if the selected tile is a land tile
  } else if ((landTilesIDs.includes(`${clickedTile}`)) === true) {
    //if so, create dialog with relevant info and title
    display("Select your build!")
    landDialog("Land Tile:", "What do you want to build on this tile?");

  } else if ($(`#${clickedTile}`).data("info").feature === "Shallows") {
    //if the selected tile has no building an doesnt appear in land tiles array, it must be a water tile
    display("Select your build!")
    seaDialog("Sea Tile:", "What do you want to build on this tile?");
  }
};

//buildCity()
//
//For building cities on the map
function buildCity() {
  //first check if player has enough production points
  if (productionPoints >= cityCost && housingPoints >= (cityCost - 5)) {
    //if so, have the player name the city and detract and add the appropriate points

    productionPoints -= cityCost;
    housingPoints -= (cityCost - 5);

    $(`#${clickedTile}`).css("background-image", "url(assets/images/house.png)");
    $(`#${clickedTile}`).data("info").feature = "City";
    display("City built!")

    productionPoints += 3;
    housingPoints += 3;
    updatePoints();
    checkSurroundingTilesFor("Houses");

    setInRange();
    nameCity();
    cityCost += 2;

  } else {
    display(`Not enough points! Need ${cityCost} PP and ${cityCost-5} HP!`)
  }

}

function buildHouses() {

  if (productionPoints >= houseCost) {

    productionPoints -= houseCost;

    $(`#${clickedTile}`).css("background-image", "url(assets/images/houses.png)");
    $(`#${clickedTile}`).data("info").feature = "Houses";

    let addedTotal = checkSurroundingTilesFor("City");
    addedTotal += checkSurroundingTilesFor("Park");
    housingPoints += (addedTotal + 1);

    display(`Houses built - earned ${addedTotal+1} Housing Points!`)
    updatePoints();
  } else {
    display(`Not enough production points! Need ${houseCost}!`)
  }

}

function buildCamp() {

  if (housingPoints >= campCost) {

    if (checkSurroundingTilesFor("Camp") < 1) {

      housingPoints -= campCost;

      $(`#${clickedTile}`).css("background-image", "url(assets/images/camp.png)");
      $(`#${clickedTile}`).data("info").feature = "Camp";

      let addedPoints = checkSurroundingTilesFor("Forest");
      productionPoints += addedPoints;

      display(`Camp built - Earned ${addedPoints} Production Points!`)

      console.log(`Camp built on ${clickedTile}!`)
      updatePoints();
    } else {
      display("Can't build a Camp so close to another!")
    }
  } else {
    display(`Not enough housing points! Need ${campCost}!`)
  }

}

function buildFactory() {

  if (housingPoints >= factoryCost) {

    housingPoints -= factoryCost;
    productionPoints += factoryCost;

    display("Factory built!")
    $(`#${clickedTile}`).css("background-image", "url(assets/images/factory.png)");
    $(`#${clickedTile}`).data("info").feature = "Factory";

    updatePoints();
  } else {
    display(`Not enough housing points! Need ${factoryCost}!`)
  }

}

function buildFarm() {

  if (housingPoints >= farmCost) {

    if (checkSurroundingTilesFor("Farm") < 1) {

      let addedPoints = checkSurroundingTilesFor("Farmlands")
      housingPoints -= farmCost;
      productionPoints += addedPoints;

      display(`Farm built - earned ${addedPoints} Production Points!`)
      $(`#${clickedTile}`).css("background-image", "url(assets/images/farmhouse.png)");
      $(`#${clickedTile}`).data("info").feature = "Farm";

      console.log(`Farm built on ${clickedTile}!`)
      updatePoints();
    } else {
      display("Can't build a Farm so close to another!")
    }
  } else {
    display(`Not enough housing points! Need ${farmCost}!`)
  }

}

function buildPark() {

  if (productionPoints >= parkCost) {

    if (checkSurroundingTilesFor("Park") < 1) {

      $(`#${clickedTile}`).css("background-image", "url(assets/images/park.png)");
      $(`#${clickedTile}`).data("info").feature = "Park";

      productionPoints -= parkCost;

      display(`Park built! How nice!`)

      updatePoints();
    } else {
      display("Can't build a Park so close to another!")
    }
  } else {
    display(`Not enough housing points! Need ${farmCost}!`)
  }

}

function buildMine() {

  if (housingPoints >= mineCost) {

    if (checkSurroundingTilesFor("Mine") < 1) {

      $(`#${clickedTile}`).css("background-image", "url(assets/images/mine.png)");
      $(`#${clickedTile}`).data("info").feature = "Mine";

      let addedPoints = (checkSurroundingTilesFor("Mountains") * 2);
      productionPoints += addedPoints;
      housingPoints -= mineCost;

      display(`Mine built - Earned ${addedPoints} Production Points!`)

      updatePoints();

    } else {
      display("Can't build a Mine so close to another!")
    }
  } else {
    display(`Not enough housing points! Need ${mineCost}!`)
  }
}


//////////////////////////////////////////////////////////////////////////////////////
////////////////////           SEA BUILDINGS BELOW            ////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////


function buildFishery() {

  if (checkSurroundingTilesFor("Fishery") < 1) {

    if (housingPoints >= fisheryCost) {

      $(`#${clickedTile}`).css("background-image", "url(assets/images/fishery.png)");
      $(`#${clickedTile}`).data("info").feature = "Fishery";

      let addedPoints = (checkSurroundingTilesFor("Fish")) * 2;
      productionPoints += addedPoints;
      housingPoints -= fisheryCost;

      display(`Fishery built - Earned ${addedPoints} Production Points!`)

      updatePoints();

    } else {
      display(`Not enough housing points! Need ${fisheryCost}!`)
    }
  } else {
    display("Can't build a Fishery so close to another!")
  }
}


function buildOilRig() {

  if (housingPoints >= oilrigCost) {

    if (checkSurroundingTilesFor("Oil Rig") < 1) {

      $(`#${clickedTile}`).css("background-image", "url(assets/images/refinery.png)");
      $(`#${clickedTile}`).data("info").feature = "Oil Rig";
      let addedPoints = (checkSurroundingTilesFor("Oil")) * 5;
      productionPoints += addedPoints;
      housingPoints -= oilrigCost;

      display(`Oil Rig built - Earned ${addedPoints} Production Points! Great job pushing fossil fuels, asshole!`)

      updatePoints();
    } else {
      display("Can't build a Oil Rig so close to another!")
    }
  } else {
    display(`Not enough housing points! Need ${oilrigCost}!`)

  }

}

function buildHarbor() {

  if (housingPoints >= harborCost) {

    if (checkSurroundingTilesFor("City") >= 1) {
      $(`#${clickedTile}`).css("background-image", "url(assets/images/harbor.png)");
      $(`#${clickedTile}`).data("info").feature = "Harbor";

      let addedPoints = checkSurroundingTilesFor("Shallows") * 1;
      productionPoints += addedPoints;
      housingPoints -= harborCost;
      display(`Harbor built - Earned ${addedPoints} Production Points!`)
      updatePoints();

    } else {
      display("Can't place a harbor here - needs an adjacent City!")

    }
  } else {
    display(`Not enough housing points! Need ${harborCost}!`)
  }


}

function buildLighthouse() {

  if (housingPoints >= lighthouseCost) {

    if (checkSurroundingTilesFor("Grasslands") >= 2) {
      $(`#${clickedTile}`).css("background-image", "url(assets/images/lighthouse.png)");
      $(`#${clickedTile}`).data("info").feature = "Lighthouse";

      let addedPoints = checkSurroundingTilesFor("Ocean") * 1.5;
      productionPoints += addedPoints;
      housingPoints -= lighthouseCost;

      display(`Lighthouse built - Earned ${addedPoints} Production Points!`)

      updatePoints();
    } else {
      display("Can't place a lighthouse here - needs at least two tiles of grasslands!")
    }
  } else {
    display(`Not enough housing points! Need ${lighthouseCost}!`)
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
// This function checks surrounding tiles for the parameter (building) given
// and was an absolute bitch to write but I'm proud I did.
function checkSurroundingTilesFor(searchedFeature) {
  //Set temporary variables for the x and y
  let tileX = $(`#${clickedTile}`).data("info").x;
  let tileY = $(`#${clickedTile}`).data("info").y;
  //Set all other temporary variables
  let result = 0;
  let searchY = tileY - 1;
  let searchX = tileX - 1;
  for (let y = 0; y < 3; y++) {

    for (let i = 0; i < 3; i++) {
      //Add one to the result value if the parameter feature was found in this tile
      if ($(`#${searchY}-${searchX}`).data("info").feature === searchedFeature) {
        result += 1;
      };
      searchX += 1;
    }
    searchX = tileX - 1;
    searchY += 1;
  }
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
  // radius is the most important one!
  let radius = 5;
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
        width += 2;
        searchY += 1;
        startingX -= 1;
        searchX = startingX;
      }
      //when the mid-point has been passed, we instead run the follow for loop,
      //which counts down instead of up
      if (searchY === tileY) {
        hitPeak = true; //yeah boiiiii
      }
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
        width -= 2;
        searchY += 1;
        startingX += 1;
        searchX = startingX;
      }
    };
  };
}
