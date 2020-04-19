/////////////////////////////////////////////////////////////////////
// MAJOR VARIABLES
//
// These variables alter gameplay and map generation and are placed
// in a single doc for balancing and ease of access
/////////////////////////////////////////////////////////////////////

//MAP GENERATION
let mapTileWidth = 51;
let mapTileHeight = 51;
let initLandTile = 170;
let forestRate = 30;
let mountainRate = 10;
let farmRate = 10;
let fishRate = 3;
let oceanRate = 20;
let whaleRate = 0.1;

//CITY RANGE
let radius = 6;

//BUILDING COSTS
let cityCost = 13;
let houseCost = 1;
let workshopCost = 3;
let campCost = 1;
let mineCost = 1;
let wellCost = 1;
let farmCost = 1;
let harborCost = 2;
let lighthouseCost = 1;
let whalerCost = 4;
let fisheryCost = 1;

//INITIAL POINTS FOR PLAYER
let productionPoints = cityCost + 2;
let housingPoints = 22;


//ALL BUILDINGS
//Create array of all player buildings to check against tile features
let buildings = [
  "City",
  "Houses",
  "Well",
  "Camp",
  "Mine",
  "Farm",
  "Fishery",
  "Whalers",
  "Factory",
  "Lighthouse",
  "Harbor"
];

let introMessage =
`In this game, you'll be tasked with leading
a civilization to glory! Build cities to expand your borders, utilising
all the resources within to grow even bigger! <b>Become HUGE!</b><br><br>
Your main resources are <b>HOUSING POINTS</b>, which you use to build facilities that exploit
resources,
and <b>PRODUCTION POINTS</b>, which allow you to build more HOUSES and CITIES! <br><br>
Check the <b>TUTORIAL</b> on the bottom right of the screen - it'll give you useful information regarding what to build where!
Pick your character and then click START GAME to build your first CITY! If you don't like the look of
the current map, you can always generate a new one! <br><br> <b>GOOD LUCK!</b>`
