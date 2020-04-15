let mapTileWidth = 18;
let mapTileHeight = 18;
let initGrassTile = 20;

let allTilesIDs = [];

let waterTilesIDs = [];
let grassTilesIDs = [];

let waterColor = "#6a97de";
let landColor = "#529c57";

function createMap() {

  console.log("Building map...");
  //create starting variables for rows and columns
  let rowNumber = 0;
  let columnNumber = 0;

//Create all tiles on the map based on the amounts given in width and height variables
  for (let i = 0; i < mapTileHeight; i++) {
    for (let i = 0; i < mapTileWidth; i++) {
      let tileID = `${rowNumber}-${columnNumber}`
      //add the tiles along with their information to the document
      $(".canvas").append(`<div class=tile id=${tileID}> ${tileID}</div>`);

      //append the relevant information
      $(`#${tileID}`).data("info", {
        building: "No building",
        cityName: "None",
        x: columnNumber,
        y: rowNumber

      });
      columnNumber += 1;
      //add the id's of all these tiles to an array for easy access
      allTilesIDs.push(tileID);

    };

    columnNumber = 0;
    rowNumber += 1;
  };
  //set all tiles initial color to blue (water tiles)
  for (let i = 0; i < allTilesIDs.length; i++) {
    $(`#${allTilesIDs[i]}`).css('background-color', waterColor);
  };

  console.log("Tiles completed!");
  console.log("Assigning initial terrain...");

};

function assignGrass() {

  for (let i = 0; i < initGrassTile; i++) {
    let randomTileX = Math.floor(Math.random() * mapTileWidth);
    let randomTileY = Math.floor(Math.random() * mapTileHeight);
    //diagonal tiles
    grassTilesIDs.push(`${randomTileX}-${randomTileY}`);
    grassTilesIDs.push(`${randomTileX+1}-${randomTileY+1}`);
    grassTilesIDs.push(`${randomTileX+1}-${randomTileY-1}`);
    grassTilesIDs.push(`${randomTileX-1}-${randomTileY+1}`);
    grassTilesIDs.push(`${randomTileX-1}-${randomTileY-1}`);
    //adjacent tiles
    grassTilesIDs.push(`${randomTileX+1}-${randomTileY}`);
    grassTilesIDs.push(`${randomTileX-1}-${randomTileY}`);
    grassTilesIDs.push(`${randomTileX}-${randomTileY+1}`);
    grassTilesIDs.push(`${randomTileX}-${randomTileY-1}`);
    //two-away tiles
    grassTilesIDs.push(`${randomTileX+2}-${randomTileY}`);
    grassTilesIDs.push(`${randomTileX-2}-${randomTileY}`);
    grassTilesIDs.push(`${randomTileX}-${randomTileY+2}`);
    grassTilesIDs.push(`${randomTileX}-${randomTileY-2}`);


    //add all tiles to grassTile array
    grassTilesIDs.push(`${randomTileX}-${randomTileY}`);

  };

  //make tiles green
  for (let i = 0; i < grassTilesIDs.length; i++) {
    $(`#${grassTilesIDs[i]}`).css('background-color', landColor);

  };
    console.log("Grass tiles assigned!")

};
