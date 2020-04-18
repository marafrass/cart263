let header = "Tutorial";
let info = "Click one of the buildings below to learn more about them!";
let placement = "This panel will tell you where this building should be placed"
let costPP = 0;
let costHP = 0;

function setupTutorial() {

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
<option value="8">Oil</option>

</optgroup>
<optgroup label="Land Buildings">
<option value="9">Cities</option>
<option value="10">Houses</option>
<option value="11">Farms</option>
<option value="12">Mines</option>
<option value="13">Camps</option>
<option value="14">Factories</option>
<option value="15">Parks</option>

</optgroup>

<optgroup label="Sea Buildings">
<option value="16">Harbors</option>
<option value="17">Lighthouses</option>
<option value="18">Fisheries</option>
<option value="19">Oil Rigs</option>

</optgroup>

</select>


      </div></div>`).dialog({
    height: 560,
    width: 500,
    position: "left",
    dialogClass : "noclose",

    //set buttons for the responses
    buttons: {


      Close: function() {
        $(this).dialog("close");
        $(this).remove();
      }
    }

  })

  $("#infoHeader").text("Header!");
  $("#sideInfoText").text("info text!");
  $("#costPP").text(`5 Production Points`);
  $("#costHP").text(`5 Housing Points`);
  $("#placement").text("Must be adjacent to City!");

};

//showInfo()
//
//Updates the information that's currently in the tutorial window
function showInfo(){
//Set the currently selected item in the list to be x
let x = ($("#list").get(0).value)-1;

  $("#infoHeader").text(dataInUse.tiles[x].tile);
  $("#sideInfoText").text(dataInUse.tiles[x].information);
  $("#costPP").text(dataInUse.tiles[x].PPcost);
  $("#costHP").text(dataInUse.tiles[x].HPcost);
  $("#placement").text(dataInUse.tiles[x].placement);


}
