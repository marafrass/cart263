"use strict";

/********************************************************************

"Burden"

Art, code and music by Martin Hanses

'Once you reach the peak, things will be easier. That's all you need to do.
Just reach the peak. That's it. It has to be it.'

Simple text-adventure where you play as Sisyphys pushing a boulder up a hill.
Only, the boulder talks back to you, and you respond to it. (It's a game made
for geologists, basically.)

(Sound effects retrieved from freesound.org and are all public domain.)

*********************************************************************/

//Create variables for sequence value and to store elements
let sequence = 0;
let $dialogue;
let $continue;
let music;

//set up sound effects
const boulderSFX = new Audio("assets/sounds/boulderRoll.wav");
const windSFX = new Audio("assets/sounds/wind.wav");
const clickSFX = new Audio("assets/sounds/click.wav");


// When page has loaded, run setup()
$(document).ready(setup);

//setup()
//
//Set up the game, essentially.
function setup() {
  //set up music
  music = new Audio("assets/sounds/music.wav");

  //set body and image to invisible
  $('body').css('display', 'none');
  $('img').css('display', 'none');
  //fade in body (fade in image when game starts)
  $('body').fadeIn(2000);
  //set all relevant elements to their corresponding variables
  $continue = $('#continue');
  $dialogue = $('#dialogue');
  //Set up continue button, both to progress game and to change color on hover
  $continue.click(progress);
  $continue.hover(function() {
    $(this).css("background-color", "red");
  }, function() {
    $(this).css("background-color", "brown");
  });

  //set appropriate audio to loop
  windSFX.loop = true;
  music.loop = true;

}

//progress()
//
// The main function of the game - when you click, the game moves to the next
// value and reacts accordingly.
function progress() {
  console.log("click found");
  sequence += 1;
  console.log(sequence);
  // Whenever you click, play the boulder roll sound, as well as starting the wind
  // sound effect, which in turn loops.
  boulderSFX.play();
  windSFX.play();
  // spawn stuff, such as text and continue button, beautifully
  spawnStuffBeautifully();

  //Sequence checks - these essentially check what the sequence value is,
  //and trigger appropriate reactions based on that. This is where all the
  //dialogue is stored.
  if (sequence === 1) {

    $dialogue.text("You've been trying to move the boulder for years, but somehow it feels different now. There's a strange, alien structure to your thoughts as you regard its lines and crevices; it is as if you're waiting for it to communicate.");
    //remove the title and fade in "art"
    $('#title').css('display', 'none');
    $('img').fadeIn(2000);

  } else if (sequence === 2) {
    $dialogue.text("The wind is arid and hot up here, and you feel your arms shaking, trembling - and just like that, the boulder starts to vibrate, like a shudder.");

  } else if (sequence === 3) {
    $dialogue.text('BOULDER - "We should talk. It has been quite a while since last, has it not? I suppose I have not had much to say. You have not listened, either - maybe it is your fault."');

  } else if (sequence === 4) {
    $dialogue.text("...");
    createDialog("Answer the boulder", "The audacity. You've been pushing this boulder up this god damn mountain for years, and now it pretends it's all YOUR fault? How dares a rock talk back to you? Give the boulder a piece of your mind. Is it your fault, Sisyphys?", 'BOULDER - "I have to say, I did not expect you to take responsibility so readily. Consider if you are taking the blame because it is true, or because it is easy."', 'BOULDER - "So ready to contradict and throw off the blame - we have made it so far, and yet you are so unwilling to make peace with me."');

  } else if (sequence === 5) {
    music.play();
    $dialogue.text("The wind picks up; it howls as it lashes against the surface of the boulder. A faint melody, a key neither major or minor. You ready yourself for another push. Just one more, and then you can rest for a bit.");

  } else if (sequence === 6) {
    $dialogue.text('BOULDER - "You are preparing yourself to push me further, are you not? Why do you persist, Sisyphys? Our place can not be anywhere but this slope - and yet you presume it will matter if we reach the peak?"');

  } else if (sequence === 7) {
    $dialogue.text("...");
    createDialog("Answer the boulder", "Of course it will matter. The boulder is an idiot; that much is clear. We've known that since long. We reach the peak, we sit and lean our back against the rock, and watch the sunset. Things get easy. You still believe that too, right?", 'Good, because that is the way it is. It has to be. It has to be.', 'Then why the fuck are we up here? You lie to yourself, Sisyphys. Even if you do not believe the peak will satisfy that fantasy, you still want to believe. You have to.');

  } else if (sequence === 8) {
    $dialogue.text("Hardened calluses brush up against the stone as you find your grip. Your legs settle into a familiar position as you ready your body. Push.");

  } else if (sequence === 9) {
    $dialogue.text("An inch. A foot. A few. The boulder is moving. The sun sets, and in that light, your coarse skin glistens with sweat and blood.");

  } else if (sequence === 10) {
    $dialogue.text('BOULDER - "I am sorry, Sisyphys, but you are not strong enough. There is no way in Hades we will both reach the peak. When you wake up tomorrow, I will drag us both down. That is my power - and frankly, Sisyphys, I revel in it. You should rest. You need to rest - close your eyes. Let it happen."');

  } else if (sequence === 11) {

    $dialogue.text("...")
    createDialog("Answer the boulder", "The boulder can claim whatever it pleases - we are the ones with power here. We can fix this. We can push the boulder. We can make things better. Fuck the boulder. It will see. We do not fail. We are right. We get it - do we not, Sisyphys?", "Damn straight. Now put your back into it. Let's fuck this duck.", 'Listen here - be a fucking man, will you? The boulder will not roll itself up the damn hill. No one can do this but you. Only you can fix this.');

  } else if (sequence === 12) {
    $dialogue.text("The hill turns into a mountain, giving you no respite: your left foot always lands on loose soil, and your right on jagged rock. Although your eyes dart between the boulder, the peak, and the ground, you have hardly enough time to really observe any one of them.");

  } else if (sequence === 13) {
    $dialogue.text("Maybe it *is* a good idea to sit down for a second. You place yourself on the side of the boulder, pushing your back against it to prevent its descent.");

  } else if (sequence === 14) {
    $dialogue.text("You shut your eyes, just for a second - but it is too late. You fall asleep for hours, and when you come to, the boulder has tumbled down the mountain.");

  } else if (sequence === 15) {
    $dialogue.text("...");
    createDialog("Make your decision", "We've been here before. This time, like any other, we prove our worth again. The boulder will see. It needs us. It wants to reach the peak, even if it doesn't know it. Go get the boulder, Sisyphys. We don't have much choice, do we?", "You make your way down the hill, entertaining a glimmer of hope that this time, things will be different.", 'You make your way down the hill, entertaining a glimmer of hope that this time, things will be different.');

  } else if (sequence === 16) {
    $dialogue.text("You make it roughly halfway up the hill until the boulder speaks to you again. Hearing the first syllable, your heart skips a beat, as if you're flinching; bracing for a punch.");
    sequence = 2;
  }
}


//spawnStuffBeautifully()
//
// A highly neccessary function which animates the text and continue button
// to look ten times prettier.

function spawnStuffBeautifully() {

  //Prepare divs for animation
  $dialogue.slideUp(1);
  $continue.css('display', 'none');
  //RELEASE THE ANIMATION KRAKEN
  $dialogue.slideDown(500);
  $continue.fadeIn(1000);

}

//createDialog()
//
//Template code for creating dialogs in the game,
//adding a header, content, as well as two possible outcomes.
//
//(Partially lifted from https://stackoverflow.com/questions/4879367/how-to-create-jquery-dialog-in-function)

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
          //Set the textbox to the appropriate response
          $dialogue.text(responseOne);
        },
        //Response two
        "Not really": function() {
          $(this).dialog("close");
          clickSFX.play();
          //Set the textbox to the appropriate response
          $dialogue.text(responseTwo);
        }
      }
    });

}
