function buildMenu() {

  currentTileID = $(this).attr("id");

  if ((grassTilesIDs.includes(`#${currentTileID}`)) === true) {

    createDialog("Creating a new city:", "Are you sure you'd like to place a city on this tile?");


  } else {
    console.error("Can't build here!")
    $("#tileinfotext").text("Can't build on a water tile!")
  }
};

function buildCity(){

    $(`#${currentTileID}`).css("background-image", "url(assets/images/house.png)");
    console.log(`City built on ${currentTileID}!`)




}
