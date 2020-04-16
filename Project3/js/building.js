let productionPoints = 10;
let housingPoints = 10;

let cityCost = 6;
let houseCost = 3;
let factoryCost = 5;


//buildMenu()
//
//Spawn in the dialog box for selecting what the player wants to build
function buildMenu() {
  //test if there is a building on the selected tile
  if ($(`#${clickedTile}`).data("info").building != "No building") {
    //if there is, stop player from building
    console.error("Can't build here!")
    display("Can't build on top of another building!");
    //if there is no building here, check if the selected tile is a land tile
  } else if ((grassTilesIDs.includes(`${clickedTile}`)) === true) {
    //if so, create dialog with relevant info and title
    createDialog("Building Menu:", "What do you want to build on this tile?");

  } else {
    //if the selected tile has no building an doesnt appear in land tiles array, it must be a water tile
    console.error("Can't build here!")
    display("Can't build on this tile!");
  }
};

//buildCity()
//
//For building cities on the map
function buildCity() {
  //first check if player has enough production points
  if (productionPoints >= 6) {
    //if so, have the player name the city and detract and add the appropriate points
    nameCity();
    productionPoints -= cityCost;
    housingPoints += cityCost;

    $(`#${clickedTile}`).css("background-image", "url(assets/images/house.png)");
    $(`#${clickedTile}`).data("info").building = "City";
    display("City built!")
    console.log(`City built on ${clickedTile}!`)

    updatePoints();
    checkSurroundingTilesFor("Houses");

  } else {
    console.error("Insufficient funds!")
    display("Not enough production points!")
  }

}

function buildHouses() {

  if (housingPoints >= houseCost) {

    housingPoints -= houseCost;
    productionPoints += (houseCost / 2);

    $(`#${clickedTile}`).css("background-image", "url(assets/images/houses.png)");
    $(`#${clickedTile}`).data("info").building = "Houses";
    display("Houses built!")
    console.log(`Houses built on ${clickedTile}!`)
    updatePoints();
  } else {
    console.error("Insufficient funds!")
    display("Not enough housing points!")
  }

}

function buildCamp() {

  $(`#${clickedTile}`).css("background-image", "url(assets/images/camp.png)");
  $(`#${clickedTile}`).data("info").building = "Camp";

  let addedPoints = checkSurroundingTilesFor("Forest");
  productionPoints += addedPoints;

  display(`Camp built - Earned ${addedPoints} Production Points!`)

  console.log(`Camp built on ${clickedTile}!`)
  updatePoints();

}

function buildFactory() {

  if (housingPoints >= factoryCost) {

    housingPoints -= factoryCost;
    productionPoints += factoryCost + 1;
    display("Factory built!")
    $(`#${clickedTile}`).css("background-image", "url(assets/images/factory.png)");
    $(`#${clickedTile}`).data("info").building = "Factory";

    console.log(`Factory built on ${clickedTile}!`)
    updatePoints();
  } else {
    console.error("Insufficient funds!")
    display("Not enough housing points!")
  }

}

function buildForest() {
  productionPoints += 1;
  display("Forest planted!")
  $(`#${clickedTile}`).css("background-image", "url(assets/images/forest.png)");
  $(`#${clickedTile}`).data("info").building = "Forest";

  console.log(`Forest planted on ${clickedTile}!`)
  updatePoints();

}

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
function checkSurroundingTilesFor(searchedBuilding) {

  let tileX = $(`#${clickedTile}`).data("info").x;
  let tileY = $(`#${clickedTile}`).data("info").y;
  console.log(tileX + " - " + tileY);

  let result = 0;

  let searchY = tileY - 1;
  let searchX = tileX - 1;

  for (let y = 0; y < 3; y++) {

    for (let i = 0; i < 3; i++) {

      console.log("searching on " + searchY + "-" + searchX + " for " + searchedBuilding);
      if ($(`#${searchY}-${searchX}`).data("info").building === searchedBuilding) {
        result += 1;
        console.log(searchedBuilding + " found at " + searchY + "-" + searchX);
      };
      searchX += 1;
    }
    searchX = tileX - 1;
    searchY += 1;

  }

  console.log("result of search showed " + result);
  return result;
}