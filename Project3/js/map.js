function createMap() {

  console.log("building map");

  let mapTileWidth = 18;
  let mapTileHeight = 15;

  let rowNumber = 0;
  let tileNumber = 0;

  for (let i = 0; i < mapTileHeight; i++) {
    for (let i = 0; i < mapTileWidth; i++) {
      $(".canvas").append(`<div class=tile> ${tileNumber}, ${rowNumber}</div>`);
      tileNumber += 1;
    };
    tileNumber = 0;
    rowNumber += 1;
  };

}
