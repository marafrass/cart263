////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//              This file contains all dialogs of the game                    //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////


function landDialog(title, text) {

  //create the dialog using title and text from the function parameters
  return $("<div class='dialog' title='" + title + " " + clickedTile + "'><p>" + text + "</p></div>")
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
      },
      close: function() {
                    sfxCheck.play();
              }
    });


};

function seaDialog(title, text) {

  //create the dialog using title and text from the function parameters
  return $("<div class='dialog' title='" + title + " " + clickedTile + "'><p>" + text + "</p></div>")
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
        "Oil Rig": function() {
          $(this).dialog("close");
          buildOilRig();

        }
      },
      close: function() {
                    sfxCheck.play();
              }
    });

};

function nameCity() {
  sfxChimes.play();
  return $(`<div class='dialog' title='Name the city!'><input type="text" name="name" maxlength="12" size="25"></div>`)
    .dialog({
      height: 200,
      width: 300,
      modal: true,
      dialogClass: "noclose",
      buttons: {
        'OK': function() {
          sfxBell.play();
          let name = $('input[name="name"]').val();
          //If no name is given, find a random one from the cities array
          if (name === "") {
            let r = (Math.floor(Math.random() * cities.length));
            name = cities[r];
          }
          //Set the tile to its given name and change up the css to make it pretty
          $(`#${clickedTile}`).data("info").cityName = name;
          $(`#${clickedTile}`).text(name);
          $(`#${clickedTile}`).css("font-size", "13px");
          $(`#${clickedTile}`).css("text-align", "center");

          $(this).remove();
          $(this).dialog('close');

        },
        'Randomize': function() {
          sfxBell.play();
          let r = (Math.floor(Math.random() * cities.length));
          name = cities[r];
          //Set the tile to its given name and change up the css to make it pretty
          $(`#${clickedTile}`).data("info").cityName = name;
          $(`#${clickedTile}`).text(name);
          $(`#${clickedTile}`).css("font-size", "13px");
          $(`#${clickedTile}`).css("text-align", "center");
          $(this).dialog('close');
          $(this).remove();


        }
      }

    });

};



function introPopup() {

  return $("<div class='fixed-dialog' title='Hello!'><p>Welcome to divworld!</p></div>").dialog({
    height: 650,
    width: 400,
    position: [],
    modal: true,
    dialogClass: "noclose",

    //set buttons for the responses
    buttons: {

      Dog: function() {
        display("You're now a dog mayor!")
        sfxCheck.play();
        $("#characterpanel").css("background-image", "url(assets/images/dog.png)");

      },
      Cat: function() {
        display("You're now a cat mayor!")
        sfxCheck.play();
        $("#characterpanel").css("background-image", "url(assets/images/cat.png)");

      },
      Penguin: function() {
        display("You're now a penguin mayor!")
        sfxCheck.play();
        $("#characterpanel").css("background-image", "url(assets/images/penguin.png)");

      },
      Platypus: function() {
        display("You're now a platypus mayor!")
        sfxCheck.play();
        $("#characterpanel").css("background-image", "url(assets/images/platypus.png)");

      },
      "Start Game": function() {
        display("Select a tile to place your first City on!")
        setUpControls();
        sfxDrumRoll.play();
        $(this).dialog("close");
      },
      "Generate New Map": function() {
        $(this).dialog("close");
        location.reload();


      }

    }

  })


}
