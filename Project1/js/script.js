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
let $continue;

let believedItWillMatter = false;


const boulderSFX = new Audio("assets/sounds/boulderRoll.wav");
const windSFX = new Audio("assets/sounds/wind.wav");
const clickSFX = new Audio("assets/sounds/click.wav");
const music = new Audio("assets/sounds/Sisophys.wav");


$(document).ready(setup);

function setup() {
  //set body and image to invisible
  $('body').css('display', 'none');
  $('img').css('display', 'none');
  //fade in body (fade in image when game starts)
  $('body').fadeIn(2000);
  //set all variables
  $continue = $('#continue');
  $dialogue = $('#dialogue');
  //Set up continue button, both to progress game and to change color on hover
  $continue.click(progress);
  $continue.hover(function(){
    $(this).css("background-color", "red");
    }, function(){
    $(this).css("background-color", "brown");
  });

  //set appropriate audio to loop
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
    $dialogue.text("You've been trying to move the boulder for years, but somehow it feels different now. There's a strange, alien structure to your thoughts as you regard its lines and crevices; it is as if you're waiting for it to communicate.");
    $('img').fadeIn(2000);
  } else if (sequence === 2) {
    $dialogue.text("The wind is arid and hot up here, and you feel your arms shaking, trembling - and just like that, the boulder starts to vibrate, like a shudder.");

  } else if (sequence === 3) {
    $dialogue.text('BOULDER - "I know we have not talked much lately, if ever. I suppose I have not had much to say. You have not listened, either - maybe it is your fault."');

  } else if (sequence === 4) {
    $dialogue.text("...");
    createDialog("Answer the boulder", "The audacity. You've been pushing this boulder up this god damn mountain for years, and now it pretends it's all YOUR fault? How dares a rock talk back to you? Give the boulder a piece of your mind. Is it your fault, Sisophys?", 'BOULDER - "I have to say, I did not expect you to take responsibility so readily. Consider if you are taking the blame because it is true, or because it is easy."', 'BOULDER - "So ready to contradict and throw off the blame - we have made it so far, and yet you are so unwilling to make peace with me."');

  } else if (sequence === 5) {
    music.play();
    $dialogue.text("The wind picks up; it howls as it lashes against the surface of the boulder. A faint melody, a key neither major or minor. You ready yourself for another push. Just one more, and then you can rest for a bit.");
  } else if (sequence === 6) {
    $dialogue.text('BOULDER - "You are preparing yourself to push me further, are you not? Why do you persist, Sisophys? Our place can not be anywhere but this slope - and yet you presume it will matter if we reach the peak?"');
  } else if (sequence === 7) {
    $dialogue.text("...");
    createDialog("Answer the boulder", "Of course it will matter. The boulder is an idiot; that much is clear. We've known that since long. We reach the peak, we sit and lean our back against the rock, and watch the sunset. Things get easy. You still believe that too, right?", 'Good, because that is the way it is. It has to be. It has to be.', 'Then why the fuck are we up here? You lie to yourself, Sisophys. Even if you do not believe the peak will satisfy that fantasy, you still believe it. You have to.');

  } else if (sequence === 8) {
    $dialogue.text("Hardened calluses brush up against the stone as you find your grip. Your legs settle into a familiar position as you ready your body. Push.");
  } else if (sequence === 9) {
    $dialogue.text("An inch. A foot. A few. The boulder is moving.");
  } else if (sequence === 10) {
    $dialogue.text('BOULDER - "I am sorry, Sisophys, but you are not strong enough. There is no way in Hades we will both reach the peak. When you wake up tomorrow, I will drag us both down. That is my power - and frankly, Sisophys, I revel in it."');
  } else if (sequence === 11) {

      $dialogue.text("...")
    createDialog("Answer the boulder", "The boulder can claim whatever it pleases - we are the ones with power here. We can fix this. We can push the boulder. We can make things better. Fuck the boulder. It will see. We do not fail. We are right. We get it - do we not, Sisophys?", "Damn straight. Now put your back into it. Let's fuck this duck.", 'Listen here - be a fucking man, will you? The boulder will not roll itself up the damn hill. No one can do this but you. Only you can fix this.');
  } else if (sequence === 12) {
    $dialogue.text("BOULDER - Alright, that worked!");
  } else if (sequence === 13) {
    $dialogue.text("BOULDER - Alright, that worked!");
  } else if (sequence === 14) {
    $dialogue.text("You shut your eyes, just for a second - but it is too late. You fall asleep for hours, and when you come to, the boulder has tumbled down the mountain.");
  } else if (sequence === 15) {
    $dialogue.text("...");
    createDialog("Make your decision", "We've been here before. This time, like any other, we prove our worth again. The boulder will see. It needs us. It wants to reach the peak, even if it doesn't know it. Go get the boulder, Sisophys. We don't have much choice, do we?", "You make your way down the hill, entertaining a glimmer of hope that this time, things will be different.", 'You make your way down the hill, entertaining a glimmer of hope that this time, things will be different.');

  } else if (sequence === 16) {
    $dialogue.text("You make it roughly halfway up the hill until the boulder speaks to you again.");
    sequence = 2;
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
      width: 300,
      modal: true,
      //set buttons for the responses
      buttons: {
        //Response one
        "I guess so": function() {
          $(this).dialog("close");
          clickSFX.play();
          $dialogue.text(responseOne);
        },
        //Response two
        "Not really": function() {
          $(this).dialog("close");
          clickSFX.play();
          $dialogue.text(responseTwo);
        }
      }

    });
}
