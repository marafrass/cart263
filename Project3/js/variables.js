/////////////////////////////////////////////////////////////////////
// MAJOR VARIABLES
//
// These variables alter gameplay and map generation and are placed
// in a single doc for balancing and ease of access
/////////////////////////////////////////////////////////////////////

//MAP GENERATION 
let mapTileWidth = 51;
let mapTileHeight = 51;
let initGrassTile = 130;
let forestRate = 30;
let mountainRate = 10;
let farmRate = 10;
let fishRate = 3;
let oceanRate = 20;
let oilRate = 0.05;

//CITY RANGE
let radius = 6;

//BUILDING COSTS
let cityCost = 13;
let houseCost = 1;
let factoryCost = 3;
let campCost = 1;
let mineCost = 1;
let parkCost = 1;
let farmCost = 1;
let harborCost = 2;
let lighthouseCost = 1;
let oilrigCost = 3;
let fisheryCost = 1;

//INITIAL POINTS FOR PLAYER
let productionPoints = cityCost + 2;
let housingPoints = 22;


//ALL BUILDINGS
//Create array of all player buildings to check against tile features
let buildings = [
  "City",
  "Houses",
  "Park",
  "Camp",
  "Mine",
  "Farm",
  "Fishery",
  "Oil Rig",
  "Factory",
  "Lighthouse",
  "Harbor"
];
