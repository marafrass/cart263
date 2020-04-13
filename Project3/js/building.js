let clickedTile;
function buildMenu() {



if($(`#${clickedTile}`).data("info").building != "No building"){

  console.error("Can't build here!")
  $("#tileinfotext").text("Can't build on top of another building!")

}

else if ((grassTilesIDs.includes(`${clickedTile}`)) === true) {

    createDialog("Building Menu:", "What do you want to build on this tile?");


  } else {
    console.error("Can't build here!")
    $("#tileinfotext").text("Can't build on a water tile!")
  }
};

function buildCity() {

  $(`#${clickedTile}`).css("background-image", "url(assets/images/house.png)");
  $(`#${clickedTile}`).data("info").building = "City";

  console.log(`City built on ${clickedTile}!`)

}

function buildHouses() {

  $(`#${clickedTile}`).css("background-image", "url(assets/images/houses.png)");
  $(`#${clickedTile}`).data("info").building = "Houses";

  console.log(`Houses built on ${clickedTile}!`)

}

function buildCamp() {

  $(`#${clickedTile}`).css("background-image", "url(assets/images/camp.png)");
  $(`#${clickedTile}`).data("info").building = "Camp";

  console.log(`Camp built on ${clickedTile}!`)

}
