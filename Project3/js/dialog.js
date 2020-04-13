
function createDialog(title, text, responseOne, responseTwo) {

  //create the HTML for the dialog using the set parameters
  return $("<div class='dialog' title='" + title + "'><p>" + text + "</p></div>")
    //Set dimensions of the dialog
    .dialog({
      height: 400,
      width: 300,
      //modal: true,
      //set buttons for the responses
      buttons: {
        //Response one
        City: function() {
          $(this).dialog("close");
          buildCity();
        },
        //Response two
        Houses: function() {
          $(this).dialog("close");
          buildHouses();

        },
        //Response two
        Camps: function() {
          $(this).dialog("close");
          buildCamp();

        },
        //Response two
        Ships: function() {
          $(this).dialog("close");
          buildHouses();

        }
      }
    });

}
