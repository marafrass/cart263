"use strict";

/********************************************************************

Title of Project
Author Name

(Music by Martin Hanses)
(wind and boulder sound effects retrieved from freesound.org and used
with a creative commons license)

*********************************************************************/

let sequence = 0;
let $dialogue;

const boulderSFX = new Audio("assets/sounds/boulderRoll.wav");
const windSFX = new Audio("assets/sounds/wind.wav");
const music = new Audio("assets/sounds/Sisophys.wav");


$(document).ready(setup);

function setup() {

  let $continue = $('#continue');
  $dialogue = $('#dialogue');
  $continue.click(progress);

  windSFX.loop = true;
  music.loop = true;

}

function progress() {
  console.log("click found");
  sequence += 1;
  console.log(sequence);

  boulderSFX.play();
  windSFX.play();


  if (sequence === 1) {
    $dialogue.text("BOULDER - Alright. I would like you to leave me alone, now. This isn't going anywhere.");
  } else if (sequence === 2) {
    $dialogue.text("...");


    createDialog("The boulder just told you to leave...", "Maybe you should consider that? I dunno, you're kind of forcing your will on it. It's not like the boulder asked you to push it up the hill. You just kind of started doing it. Don't you feel bad about it?", "BOULDER - If you're going to apologize, you need to act on that apology. Otherwise it's just empty words and one step forward, two steps back.", "BOULDER - Yeah, that's kind of what I expected. Listen - there's literally no reason for you to do this.");


  } else if (sequence === 3) {
    $dialogue.text("BOULDER - Alright, that worked!");
    music.play();
  } else if (sequence === 4) {
    $dialogue.text("BOULDER - Alright, that worked!");
  } else if (sequence === 5) {
    $dialogue.text("BOULDER - Alright, that worked!");
  } else if (sequence === 6) {
    $dialogue.text("BOULDER - Alright, that worked!");
  } else if (sequence === 7) {
    $dialogue.text("BOULDER - Alright, that worked!");
  } else if (sequence === 8) {
    $dialogue.text("BOULDER - Alright, that worked!");
  } else if (sequence === 9) {
    $dialogue.text("BOULDER - Alright, that worked!");
  } else if (sequence === 10) {
    $dialogue.text("BOULDER - Alright, that worked!");
  } else if (sequence === 11) {
    $dialogue.text("BOULDER - Alright, that worked!");
  } else if (sequence === 12) {
    $dialogue.text("BOULDER - Alright, that worked!");
  } else if (sequence === 13) {
    $dialogue.text("BOULDER - Alright, that worked!");
  } else if (sequence === 14) {
    $dialogue.text("BOULDER - Alright, that worked!");
  } else {




  }
}


//createDialog()
//
//Template code for creating dialogs in the game,
//adding a header, content, as well as two possible outcomes.
//(Parts lifted from https://stackoverflow.com/questions/4879367/how-to-create-jquery-dialog-in-function)
function createDialog(title, text, responseOne, responseTwo) {
  //create the HTML for the dialog using the set parameters
  return $("<div class='dialog' title='" + title + "'><p>" + text + "</p></div>")
    //Set dimensions of the dialog
    .dialog({
      height: 400,
      width: 700,
      modal: true,
      buttons: {
        //Response one
        "I guess so": function() {
          $(this).dialog("close");
          $dialogue.text(responseOne);
        },
        //Response two
        "Not really": function() {
          $(this).dialog("close");
          $dialogue.text(responseTwo);
        }
      }
    });
}
