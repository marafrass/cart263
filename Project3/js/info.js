let header = "Tutorial";
let info = "Click one of the buildings below to learn more about them!";
let placement = "This panel will tell you where this building should be placed"
let costPP = 0;
let costHP = 0;

//setupTutorial()
//
//this function creates the tutorial window dialog thingy
function setupTutorial() {

  //Setup the HTML code for the tutorial
  return $(`<div class='tutorial-dialog' id="tutorial" title='Tutorial Window:' >  <div id="buildingInfo">
        <div id="infoHeader">${header}
        </div>
        <div id="sideInfoText">${info}</div>

          <div id="cost"><p id="costPP">PP:${costPP}</p><br><p id="costHP">HP:${costHP}</p></div>
          <div id="cost2"><div id="placement">${placement}</div></div>


<select id="list" onchange="showInfo()">

<optgroup label="Map Tiles">
<option value="1">Grasslands</option>
<option value="2">Mountains</option>
<option value="3">Farmlands</option>
<option value="4">Forest</option>
<option value="5">Shallows</option>
<option value="6">Ocean</option>
<option value="7">Fish</option>
<option value="8">Whales</option>

</optgroup>
<optgroup label="Land Buildings">
<option value="9">Cities</option>
<option value="10">Houses</option>
<option value="11">Farms</option>
<option value="12">Mines</option>
<option value="13">Camps</option>
<option value="14">Workshops</option>
<option value="15">Wells</option>

</optgroup>

<optgroup label="Sea Buildings">
<option value="16">Harbors</option>
<option value="17">Lighthouses</option>
<option value="18">Fisheries</option>
<option value="19">Whalers</option>

</optgroup>

</select>


      </div></div>`).dialog({
        //set up position,class, and size for dialog
    height: 560,
    width: 500,
    position: "left",
    dialogClass: "noclose",

    //set buttons for the responses
    buttons: {
      //button to close dialog and play little jolly closing tune
      Close: function() {
        sfxPopup1.play();
        $(this).dialog("close");
        $(this).remove();
      }
    }

  })

};

//showInfo()
//
//Updates the information that's currently in the tutorial window
//whenever the option in the drop down box is changed
function showInfo() {
  //Set the currently selected item in the list to be x
  let x = ($("#list").get(0).value) - 1;
  $("#infoHeader").text(dataInUse.tiles[x].tile);
  $("#sideInfoText").text(dataInUse.tiles[x].information);
  $("#costPP").text(dataInUse.tiles[x].PPcost);
  $("#costHP").text(dataInUse.tiles[x].HPcost);
  $("#placement").text(dataInUse.tiles[x].placement);
  sfxTurn.play();

}
