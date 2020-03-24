let mapTileWidth = 18;
let mapTileHeight = 18;
let initGrassTile = 20;

let allTilesIDs = [];
let grassTilesIDs = [];
let waterTilesIDs = [];

function createMap() {

  console.log("building map");

  let rowNumber = 0;
  let tileNumber = 0;

  for (let i = 0; i < mapTileHeight; i++) {
    for (let i = 0; i < mapTileWidth; i++) {
      let tileID = `${tileNumber}-${rowNumber}`
      $(".canvas").append(`<div class=tile id=${tileID}> ${tileID}</div>`);
      tileNumber += 1;

      allTilesIDs.push(tileID);

    };

    tileNumber = 0;
    rowNumber += 1;
  };
  //set all tiles initial color to blue (water tiles)
  for (let i = 0; i < allTilesIDs.length; i++) {
    $(`#${allTilesIDs[i]}`).css('background-color', 'blue');
  };

  console.log("Tiles completed");
  console.log("Assigning initial terrain");

};

function assignGrass() {

  let grassTilesIDs = [];
  let surroundingGrass = -2;

  for (let i = 0; i < initGrassTile; i++) {
    let randomTileX = Math.floor(Math.random() * mapTileWidth);
    let randomTileY = Math.floor(Math.random() * mapTileHeight);
    //diagonal tiles
    grassTilesIDs.push(`#${randomTileX}-${randomTileY}`);
    grassTilesIDs.push(`#${randomTileX+1}-${randomTileY+1}`);
    grassTilesIDs.push(`#${randomTileX+1}-${randomTileY-1}`);
    grassTilesIDs.push(`#${randomTileX-1}-${randomTileY+1}`);
    grassTilesIDs.push(`#${randomTileX-1}-${randomTileY-1}`);
    //adjacent tiles
    grassTilesIDs.push(`#${randomTileX+1}-${randomTileY}`);
    grassTilesIDs.push(`#${randomTileX-1}-${randomTileY}`);
    grassTilesIDs.push(`#${randomTileX}-${randomTileY+1}`);
    grassTilesIDs.push(`#${randomTileX}-${randomTileY-1}`);
    //two-away tiles
    grassTilesIDs.push(`#${randomTileX+2}-${randomTileY}`);
    grassTilesIDs.push(`#${randomTileX-2}-${randomTileY}`);
    grassTilesIDs.push(`#${randomTileX}-${randomTileY+2}`);
    grassTilesIDs.push(`#${randomTileX}-${randomTileY-2}`);


    //add all tiles to grassTile array
    grassTilesIDs.push(`#${randomTileX}-${randomTileY}`);

  };

  //make tiles green
  for (let i = 0; i < grassTilesIDs.length; i++) {
    $(grassTilesIDs[i]).css('background-color', 'green');

  };

};
