function createMap() {

  console.log("building map");

  let mapTileWidth = 18;
  let mapTileHeight = 15;

  let rowNumber = 0;
  let tileNumber = 0;

  for (let i = 0; i < mapTileHeight; i++) {
    for (let i = 0; i < mapTileWidth; i++) {
      let tileID = `${rowNumber}-${tileNumber}`
      $(".canvas").append(`<div class=tile id=${tileID}> ${tileID}</div>`);
      tileNumber += 1;
    };
    tileNumber = 0;
    rowNumber += 1;
  };

  console.log("tiles completed");
  console.log("Assigning terrain");

  let initGrassTile = 5;





};
