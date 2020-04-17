
let cityCost = 6;
let houseCost = 3;
let factoryCost = 5;

let productionPoints = cityCost;
let housingPoints = 10;



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
  }else if ($(`#${clickedTile}`).data("info").feature === "Ocean") {
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
  if (productionPoints >= 6) {
    //if so, have the player name the city and detract and add the appropriate points

    productionPoints -= cityCost;
    housingPoints += cityCost;

    $(`#${clickedTile}`).css("background-image", "url(assets/images/house.png)");
    $(`#${clickedTile}`).data("info").feature = "City";
    display("City built!")
    console.log(`City built on ${clickedTile}!`)


    updatePoints();
    checkSurroundingTilesFor("Houses");

    setInRange();
    nameCity();

  } else {
    console.error("Insufficient funds!")
    display("Not enough production points!")
  }

}

function buildHouses() {

  if (housingPoints >= houseCost) {

    housingPoints -= houseCost;

    $(`#${clickedTile}`).css("background-image", "url(assets/images/houses.png)");
    $(`#${clickedTile}`).data("info").feature = "Houses";
    console.log(`Houses built on ${clickedTile}!`)

    let addedProPoints = checkSurroundingTilesFor("City")


    let addedTotal

    display(`Houses built - earned ${addedTotal} Production Points!`)
    updatePoints();
  } else {
    console.error("Insufficient funds!")
    display("Not enough housing points!")
  }

}

function buildCamp() {

  $(`#${clickedTile}`).css("background-image", "url(assets/images/camp.png)");
  $(`#${clickedTile}`).data("info").feature = "Camp";

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
    $(`#${clickedTile}`).data("info").feature = "Factory";

    console.log(`Factory built on ${clickedTile}!`)
    updatePoints();
  } else {
    console.error("Insufficient funds!")
    display("Not enough housing points!")
  }

}

function buildFarm() {

  let addedPoints = checkSurroundingTilesFor("Farmlands")
  let addedTotal = 0;
  addedTotal += addedPoints;

  productionPoints += addedPoints;

  display(`Farm built - earned ${addedTotal} Production Points!`)
  $(`#${clickedTile}`).css("background-image", "url(assets/images/farmhouse.png)");
  $(`#${clickedTile}`).data("info").feature = "Farm";

  console.log(`Farm built on ${clickedTile}!`)
  updatePoints();

}

function buildPark() {

  $(`#${clickedTile}`).css("background-image", "url(assets/images/park.png)");
  $(`#${clickedTile}`).data("info").feature = "Park";

  let addedPoints = checkSurroundingTilesFor("Houses");
  productionPoints += addedPoints;

  display(`Park built - Earned ${addedPoints} Production Points!`)

  console.log(`Park built on ${clickedTile}!`)
  updatePoints();

}

function buildMine() {

  if (checkSurroundingTilesFor("Mine") < 1) {

    $(`#${clickedTile}`).css("background-image", "url(assets/images/mine.png)");
    $(`#${clickedTile}`).data("info").feature = "Mine";

    let addedPoints = (checkSurroundingTilesFor("Mountains") * 2);
    productionPoints += addedPoints;

    display(`Mine built - Earned ${addedPoints} Production Points!`)

    updatePoints();

  } else {
    display("Can't build a Mine so close to another!")
  }
}


//////////////////////////////////////////////////////////////////////////////////////
////////////////////           SEA BUILDINGS BELOW            ////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////


function buildFishery() {

  if (checkSurroundingTilesFor("Fishery") < 1) {

    $(`#${clickedTile}`).css("background-image", "url(assets/images/fishery.png)");
    $(`#${clickedTile}`).data("info").feature = "Fishery";

    let addedPoints = (checkSurroundingTilesFor("Fish")) * 2;
    productionPoints += addedPoints;

    display(`Fishery built - Earned ${addedPoints} Production Points!`)

    updatePoints();

  } else {
    display("Can't build a Fishery so close to another!")
  }
}

function buildRefinery() {

  if (checkSurroundingTilesFor("Refinery") < 1) {

    $(`#${clickedTile}`).css("background-image", "url(assets/images/refinery.png)");
    $(`#${clickedTile}`).data("info").feature = "Refinery";
    let addedPoints = (checkSurroundingTilesFor("Oil")) * 4;
    productionPoints += addedPoints;

    display(`Refinery built - Earned ${addedPoints} Production Points! Great job pushing fossil fuels, asshole!`)

    updatePoints();
  } else {

    display("Can't build a Refinery so close to another!")
  }

}

function buildHarbor() {

  if (checkSurroundingTilesFor("City") >= 1) {
    $(`#${clickedTile}`).css("background-image", "url(assets/images/harbor.png)");
    $(`#${clickedTile}`).data("info").feature = "Harbor";

    let addedPoints = checkSurroundingTilesFor("Shallows") * 1;
    productionPoints += addedPoints;
    display(`Harbor built - Earned ${addedPoints} Production Points!`)
    updatePoints();

  } else {
    display("Can't place a harbor here - needs an adjacent City!")
  }


}

function buildLighthouse() {

  if (checkSurroundingTilesFor("Grasslands") >= 2) {
    $(`#${clickedTile}`).css("background-image", "url(assets/images/lighthouse.png)");
    $(`#${clickedTile}`).data("info").feature = "Lighthouse";

    let addedPoints = checkSurroundingTilesFor("Ocean") * 1.5;
    productionPoints += addedPoints;

    display(`Lighthouse built - Earned ${addedPoints} Production Points!`)

    updatePoints();
  } else {
    display("Can't place a lighthouse here - needs at least two tiles of grasslands!")
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
          //Set the relevant tiles to be "in range" of the city!
          $(`#${searchY}-${searchX}`).css("border-color", "red");
          $(`#${searchY}-${searchX}`).data("info").cityRange = true;
          $(`#${searchY}-${searchX}`).css('animation-name', "border");
          $(`#${searchY}-${searchX}`).css('animation-duration', "2s");
          $(`#${searchY}-${searchX}`).css('animation-iteration-count', "infinite");
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
          //Set the relevant tiles to be "in range" of the city!
          $(`#${searchY}-${searchX}`).css("border-color", "red");
          $(`#${searchY}-${searchX}`).data("info").cityRange = true;
          $(`#${searchY}-${searchX}`).css('animation-name', "border");
          $(`#${searchY}-${searchX}`).css('animation-duration', "2s");
          $(`#${searchY}-${searchX}`).css('animation-iteration-count', "infinite");
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

//checkOnMap()
//
//Assist function to setInRange that checks if a tile is on the map or outside
function checkOnMap() {

}
