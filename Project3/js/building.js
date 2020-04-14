let productionPoints = 10;
let housingPoints = 10;



function buildMenu() {



if($(`#${clickedTile}`).data("info").building != "No building"){

  console.error("Can't build here!")
  display("Can't build on top of another building!");

}

else if ((grassTilesIDs.includes(`${clickedTile}`)) === true) {

    createDialog("Building Menu:", "What do you want to build on this tile?");


  } else {
    console.error("Can't build here!")
    display("Can't build on this tile!");
  }
};

function buildCity() {

  if(productionPoints >= 6){

  productionPoints -= 6;
  housingPoints += 6;

  $(`#${clickedTile}`).css("background-image", "url(assets/images/house.png)");
  $(`#${clickedTile}`).data("info").building = "City";

  console.log(`City built on ${clickedTile}!`)
  updateHousing();
  updateProduction();
} else {
  console.error("Insufficient funds!")
  display("Not enough production points!")
}

}

function buildHouses() {

  if(housingPoints >= 3){

    housingPoints -= 3;
    productionPoints += 1.5;

  $(`#${clickedTile}`).css("background-image", "url(assets/images/houses.png)");
  $(`#${clickedTile}`).data("info").building = "Houses";

  console.log(`Houses built on ${clickedTile}!`)
  updateHousing();
  updateProduction();
} else {
  console.error("Insufficient funds!")
  display("Not enough housing points!")
}

}

function buildCamp() {

  $(`#${clickedTile}`).css("background-image", "url(assets/images/camp.png)");
  $(`#${clickedTile}`).data("info").building = "Camp";

  console.log(`Camp built on ${clickedTile}!`)
  updateHousing();
  updateProduction();

}

function buildFactory() {

  if(housingPoints >= 5){

    housingPoints -= 5;
    productionPoints += 6;

  $(`#${clickedTile}`).css("background-image", "url(assets/images/factory.png)");
  $(`#${clickedTile}`).data("info").building = "Factory";

  console.log(`Factory built on ${clickedTile}!`)
  updateHousing();
  updateProduction();
} else {
  console.error("Insufficient funds!")
  display("Not enough housing points!")
}

}



function updateHousing(){


  $("#housing").text(`Housing Points: ${housingPoints}`);

}

function updateProduction(){


  $("#production").text(`Production Points: ${productionPoints}`);

}
