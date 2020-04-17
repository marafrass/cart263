function landDialog(title, text) {

  //create the dialog using title and text from the function parameters
  return $("<div class='dialog' title='" + title + " "+ clickedTile + "'><p>" + text + "</p></div>")
    //Set dimensions of the dialog
    .dialog({
      modal: true,
      height: 200,
      width: 600,

      //set buttons for the responses
      buttons: {
        City: function() {
          $(this).dialog("close");
          buildCity();
        },
        Houses: function() {
          $(this).dialog("close");
          buildHouses();

        },
        Camps: function() {
          $(this).dialog("close");
          buildCamp();

        },
        Factory: function() {
          $(this).dialog("close");
          buildFactory();

        },
        Farm: function() {
          $(this).dialog("close");
          buildFarm();
        },
        Park: function() {
          $(this).dialog("close");
          buildPark();
        },
        Mine: function() {
          $(this).dialog("close");
          buildMine();
        }
      }
    });


};

function seaDialog(title, text) {

  //create the dialog using title and text from the function parameters
    return $("<div class='dialog' title='" + title + " "+ clickedTile + "'><p>" + text + "</p></div>")
    //Set dimensions of the dialog
    .dialog({
      modal: true,
      height: 250,
      width: 300,

      //set buttons for the responses
      buttons: {
        Fishery: function() {
          $(this).dialog("close");
          buildFishery();
        },
        Harbor: function() {
          $(this).dialog("close");
          buildHarbor();

        },
        Lighthouse: function() {
          $(this).dialog("close");
          buildLighthouse();

        },
        Refinery: function() {
          $(this).dialog("close");
          buildRefinery();

        }
      }
    });

};

function nameCity() {
  return $(`<div class='dialog' title='What should we name the city?'><input type="text" name="name" maxlength="12" size="25"></div>`)
    .dialog({
      height: 200,
      width: 300,
      modal: true,
      dialogClass: "noclose",
      buttons: {
        'OK': function() {
          let name = $('input[name="name"]').val();
          //
          $(`#${clickedTile}`).data("info").cityName = name;
          $(`#${clickedTile}`).text(name);
          $(`#${clickedTile}`).css("font-size", "13px");
          $(`#${clickedTile}`).css("text-align", "center");


          $(this).remove();
          $(this).dialog('close');
        }
      }
    });
};
