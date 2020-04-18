let allTilesIDs = [];

let waterTilesIDs = [];
let landTilesIDs = [];
let forestTilesIDs = [];

let waterColor = "#6a97de";
let oceanColor = "#5e89cc";

let landColor1 = "#529c57";
let landColor2 = "#51a657";
let landColor3 = "#56995a";
let landColor4 = "#779c4c";

let landColors = [landColor1, landColor2, landColor3, landColor4];

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
        terrain: "Water",
        feature: "Nothing",
        cityRange: false,
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

};

function assignWater() {

  //set all tiles initial color to blue (water tiles)
  for (let i = 0; i < allTilesIDs.length; i++) {
    $(`#${allTilesIDs[i]}`).css('background-color', waterColor);
    $(`#${allTilesIDs[i]}`).data('info').feature = "Shallows";
    //Set shallows tiles to animate
  //  $(`#${allTilesIDs[i]}`).css('animation-name', "shallows");
  //  $(`#${allTilesIDs[i]}`).css('animation-duration', "4s");
  //  $(`#${allTilesIDs[i]}`).css('animation-iteration-count', "infinite");

    //calculate amount of ocean based on oceanrate
    let chanceOfOcean = (Math.floor(Math.random() * 100));
    if (chanceOfOcean <= oceanRate) {
      //set ocean tiles color
      $(`#${allTilesIDs[i]}`).css('background-color', oceanColor);
      $(`#${allTilesIDs[i]}`).data('info').feature = "Ocean";
    //  $(`#${allTilesIDs[i]}`).css('animation-name', "oceans");

    }

  };



}


function assignLand() {

  for (let i = 0; i < initGrassTile; i++) {
    let randomTileX = Math.floor(Math.random() * mapTileWidth);
    let randomTileY = Math.floor(Math.random() * mapTileHeight);
    //diagonal tiles
    landTilesIDs.push(`${randomTileY+1}-${randomTileX+1}`);
    landTilesIDs.push(`${randomTileY+1}-${randomTileX-1}`);
    landTilesIDs.push(`${randomTileY-1}-${randomTileX+1}`);
    landTilesIDs.push(`${randomTileY-1}-${randomTileX-1}`);
    //adjacent tiles
    landTilesIDs.push(`${randomTileY+1}-${randomTileX}`);
    landTilesIDs.push(`${randomTileY-1}-${randomTileX}`);
    landTilesIDs.push(`${randomTileY}-${randomTileX+1}`);
    landTilesIDs.push(`${randomTileY}-${randomTileX-1}`);
    //two-away tiles
    landTilesIDs.push(`${randomTileY+2}-${randomTileX}`);
    landTilesIDs.push(`${randomTileY-2}-${randomTileX}`);
    landTilesIDs.push(`${randomTileY}-${randomTileX+2}`);
    landTilesIDs.push(`${randomTileY}-${randomTileX-2}`);


    //add all tiles to grassTile array
    landTilesIDs.push(`${randomTileY}-${randomTileX}`);

  };

  //make tiles green
  for (let i = 0; i < landTilesIDs.length; i++) {

    //randomize a land color for the tile
      let r = (Math.floor(Math.random() * landColors.length))
    $(`#${landTilesIDs[i]}`).css('background-color', landColors[r]);
  };

  for (let i = 0; i < allTilesIDs.length; i++) {
    if ((landTilesIDs.includes(`${allTilesIDs[i]}`)) === true) {
      $(`#${allTilesIDs[i]}`).data('info').terrain = "Land";
      $(`#${allTilesIDs[i]}`).data('info').feature = "Grasslands";
      $(`#${allTilesIDs[i]}`).data('info').cityRange = false;
      //set land tiles to not animate
      $(`#${allTilesIDs[i]}`).css('animation-name', "land");
      $(`#${allTilesIDs[i]}`).css('animation-duration', "0");
      $(`#${allTilesIDs[i]}`).css('animation-itaration-count', "0");
    }
  }


  console.log("Land tiles assigned!")

};


//assignFeatures()
//
//Universal function for assigning land features!
function assignFeatures(feature, rate, source) {

  for (let i = 0; i < allTilesIDs.length; i++) {

    let chanceOfFeature = (Math.floor(Math.random() * 100));

    if (chanceOfFeature <= rate) {
      if ((landTilesIDs.includes(`${allTilesIDs[i]}`)) === true) {
        $(`#${allTilesIDs[i]}`).css('background-image', source);
        $(`#${allTilesIDs[i]}`).data('info').feature = feature;
      }
    }
  }
};

//assignFeatures()
//
//Universal function for assigning sea features!
function assignSeaFeatures(feature, rate, source) {

  for (let i = 0; i < allTilesIDs.length; i++) {

    let chanceOfFeature = (Math.floor(Math.random() * 100));

    if (chanceOfFeature <= rate) {
      if ((landTilesIDs.includes(`${allTilesIDs[i]}`)) === false) {
        $(`#${allTilesIDs[i]}`).css('background-color', waterColor);
        $(`#${allTilesIDs[i]}`).css('background-image', source);
        $(`#${allTilesIDs[i]}`).data('info').feature = feature;
      }
    }
  }
};
