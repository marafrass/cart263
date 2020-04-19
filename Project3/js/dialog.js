////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//              This file contains all dialogs of the game                    //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////
//All dialogs use the same general layout but vary greatly in buttons and use //
////////////////////////////////////////////////////////////////////////////////

//landDialog()
//
//This dialog is shown whenever a building is attempted on a land tile

function landDialog(title, text) {

  //create the dialog using title and text from the function parameters
  return $("<div class='dialog' title='" + title + " " + clickedTile + "'><p>" + text + "</p></div>")
    //Set dimensions of the dialog
    .dialog({
      modal: true,
      height: 200,
      width: 400,

      //set build buttons and link their respective build functions
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
        Workshop: function() {
          $(this).dialog("close");
          buildWorkshop();

        },
        Farm: function() {
          $(this).dialog("close");
          buildFarm();
        },
        Well: function() {
          $(this).dialog("close");
          buildWell();
        },
        Mine: function() {
          $(this).dialog("close");
          buildMine();
        }
      },
      //set this sound to play whenever the dialog is closed
      close: function() {
        sfxCheck.play();
      }
    });


};
//seaDialog()
//
// This dialog shows whenever a building is attempted on a sea tile

function seaDialog(title, text) {

  //create the dialog using title and text from the function parameters
  return $("<div class='dialog' title='" + title + " " + clickedTile + "'><p>" + text + "</p></div>")
    //Set dimensions of the dialog
    .dialog({
      modal: true,
      height: 300,
      width: 320,

      //set build buttons and link their respective build functions
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
        Whalers: function() {
          $(this).dialog("close");
          buildWhalers();

        }
      },
      close: function() {
        sfxCheck.play();
      }
    });

};

//nameCity()
//
//Does exactly what it says - opens a dialog that names the city
function nameCity() {
  //play cool naming sound
  sfxChimes.play();
  return $(`<div class='dialog' title='Name the city!'><input type="text" name="name" maxlength="12" size="25"></div>`)
    .dialog({
      //set dimensions and properties of dialog
      height: 200,
      width: 300,
      modal: true,
      dialogClass: "noclose",
      //setup buttons
      buttons: {
        'OK': function() {
          //This function sets the name to whatever the player has input
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
        //this button automatically picks a name from an array of city names
        //and names the city
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


//introPopup()
//
//Dialog shown on the startup of the game
//gives the player information about the game
//and the options to change character or regenerate the map
function introPopup() {

  return $(`<div class='fixed-dialog' title='Welcome to CIVITUS!'><p style= "font-family:'Girassol'">${introMessage}</p></div>`).dialog({
    //set properties, position and size of the dialog
    height: 650,
    width: 400,
    position: [],
    modal: true,
    dialogClass: "noclose",

    //set buttons for the responses
    buttons: {
      //the first four set the player character to be one of four animals
      Dog: function() {
        display("You're now a dog!")
        sfxCheck.play();
        $("#characterpanel").css("background-image", "url(assets/images/dog.png)");

      },
      Cat: function() {
        display("You're now a cat!")
        sfxCheck.play();
        $("#characterpanel").css("background-image", "url(assets/images/cat.png)");

      },
      Penguin: function() {
        display("You're now a penguin!")
        sfxCheck.play();
        $("#characterpanel").css("background-image", "url(assets/images/penguin.png)");

      },
      Platypus: function() {
        display("You're now a platypus!")
        sfxCheck.play();
        $("#characterpanel").css("background-image", "url(assets/images/platypus.png)");

      },
      //This function sets up the controls for the game and lets the player start
      "Start Game": function() {
        display("Select a tile to place your first City on!")
        setUpControls();
        sfxDrumRoll.play();
        $(this).dialog("close");
      },
      //If the player is unhappy with the current map, they can regenerate it by
      //clicking here
      "Generate New Map": function() {
        $(this).dialog("close");
        location.reload();

      }

    }

  })

}
