function createDialog(title, text) {



  //create the dialog using title and text from the function parameters
  return $("<div class='dialog' title='" + title + "'><p>" + text + "</p></div>")
    //Set dimensions of the dialog
    .dialog({
      height: 250,
      width: 300,

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
        Forest: function() {
          $(this).dialog("close");
          buildForest();
        }
      }
    });

};

function nameCity() {
  return $(`<div class='dialog' title='What do you want to name the city?'><input type="text" name="name"></div>`)
    .dialog({
      buttons: {
        'OK': function() {
          let name = $('input[name="name"]').val();
          // 
          $(`#${clickedTile}`).data("info").cityName = name;
          $(`#${clickedTile}`).text(name);
          //log this in the console.
          console.log(`City on ${clickedTile} was named ${name}!`)
          $(this).dialog('close');
        }
      }
    });
};
