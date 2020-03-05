"use strict";

/********************************************************************

"The Children's Entertainment Automated Monitoring Bureau"
by Martin Hanses

Welcome to the CEAMB's public curation initiative!

The management and myself would like to congratulate you on your spectacular
decision in choosing to provide costless, efficient labor by joining our
volunteer program.

I know what you're all thinking - is this somehow tax deductible? The answer is a
resounding no, but feel free to help yourself to our complimentary fruit bowl
in the exit corridor. Please limit your inhibitions to one (1) fruit each.

How exactly will this volunteering experience play out, you ask? Our technicians
assure us it is incredibly complex and cutting-edge, but in the interest of time
and a general distrust of nerds, we'd like to simplify the process into these
simple, marketable steps:

1. Start the program! Take a moment to relax, and then activate the AI with a
click, and then speak loud and clear "Start game." (NOTE: This is *not* a game.
By having fun with this experience, you are aggressively non-complying with
company policy, and your rights to personal space and not being attacked by
bipedal robots are forfeit.)

2. Follow instructions! The AI will provide you with suggestions for titles -
make sure to mark them all as good, in the interest of efficiency. If you do,
for some strange traitorous reason, decide to reject a title, please provide a
reason for doing so and then withdraw that complaint immediately.

3. Finish quickly and efficiently! On your way out, make sure to reconsider if
you truly need a fruit from the complimentary basket. We, the management,
are very averse to the idea of non-deserving frugivores.

Jermaine McCluhan,
CEO of CEAMB and subsidiaries.


*********************************************************************/

//run setup when document has loaded
$(document).ready(setup);

//variable to track which state the game is in
let gameState = -1;

//global variables for speech and text, as well as tracking values for what the player has accepted/refused
let adjectiveInQuestion = "";
let currentSuggestion = "";
let acceptedTitleAmount = 0;
let rejectedTitleAmount = 0;

//set the ding sound effect to a variable for easy access within Howler
var dingSFX = new Howl({
  src: ['assets/sounds/ding.mp3']
});

//function setup()
//
//set things up
//note for later: comment out needless comments
function setup() {
  //set intro text
  boxWrite("Click here to activate audio and voice!")
  // when body is clicked, the game is ready to go.
  $('body').click(function() {
    if (gameState === -1) {
      gameState = 0;
      boxWrite('Great! Now say "Start Game!"');
      dingSFX.play();
    }
  })

  //set up all annyang commands
  if (annyang) {

    var commands = {

      //All commands set the textbox text, set a line for the computer to read, change the game state, and change the AI portrait.

      'start game': function() {
        if (gameState === 0) {
          dingSFX.play();
          setPortrait("question");
          speak(lineIntroLine);
          boxWrite(boxTextTutorial1);
          setTimeout(function() {
            gameState += 1;
          }, 200);
        }

      },

      'my name is *tag': function(tag) {
        if (gameState === 1) {
          dingSFX.play();
          setPortrait("elated");
          gameState += 1;
          speak(("Nice to meet you, " + tag + "! Shall we get started with today's video titles?"));
          boxWrite(boxTextTutorial2);
        }
      },

      'yes please': function() {
        if (gameState == 2) {
          dingSFX.play();
          setPortrait("question");
          speak(lineSuggestionForVid);
          suggestion();
          speak(lineQualityQuery);
          gameState += 1;
        }
      },

      'could you repeat that': function() {
        if (gameState == 3) {
          dingSFX.play();
          setPortrait("veryHappy");
          speak("Sure thing!");
          speak(currentSuggestion);
          speak("So? Good or bad?");
        }
      },

      'Good': function() {
        if (gameState === 3) {
          if (acceptedTitleAmount < 3) {
            dingSFX.play();
            setPortrait("elated");
            speak(lineAcceptedSuggestion);
            addCurrentTitle();
            acceptedTitleAmount += 1;
            gameState = 2;
            if (acceptedTitleAmount === 3) {
              endGame();
            } else {
              speak(querySuggest);
            }
          }
        }
      },

      'Bad': function() {
        if (gameState === 3) {
          dingSFX.play();
          setPortrait("quiz");
          speak(lineQueryWhatIsWrong)
          boxWrite('Be clear! Say "It is..."');
          gameState = 11;
        };
      },

      'it is *tag': function(tag) {
        if (gameState === 11) {
          dingSFX.play();
          adjectiveInQuestion = tag;
          setPortrait("neutral");
          speak("Well, I think children would enjoy something " + tag + ". Do you agree?")
          boxWrite(boxTextTutorial6);
          setTimeout(function() {
            gameState += 1;
          }, 200);
        }
      },

      'no': function() {
        if (rejectedTitleAmount >= 3) {
          dingSFX.play();
          speak(lineTooManyRejected)
          generateRemainingTitles();
          endGame();
        } else if (gameState === 12 && rejectedTitleAmount < 3) {
          setPortrait("annoyed");
          speak(lineFinalRejection)
          boxWrite(boxTextTutorial4);
          rejectedTitleAmount += 1;
          setTimeout(function() {
            gameState = 2;
          }, 500);
        }
      },

      'yes': function() {
        if (gameState === 12) {
          dingSFX.play();
          setPortrait("veryHappy");
          speak(("I thought so too. I would love it if someone called me " + adjectiveInQuestion + ". I will add this title to our list. Would you like to hear my next suggestion?"))
          boxWrite(boxTextTutorial5);
          addCurrentTitle();
          acceptedTitleAmount += 1;
          setTimeout(function() {
            gameState = 2;
          }, 500);
        };
      }
    }
    //add the previous commands to annyang and initialize it 
    annyang.addCommands(commands);
    annyang.start();
  };
}

//speak()
//
//The basic speak function for ResponsiveVoice
function speak(tag) {
  responsiveVoice.speak(tag);
}

//suggestion()
//
//function to create a full sentence by picking entries from a number of arrays, speak the entry, and enter it as text in the textbox
function suggestion() {
  let randomAdjective = findRandomEntry(adjectives);
  let randomAgent = findRandomEntry(agents);
  let randomVerb = findRandomEntry(verbs);
  let randomPreposition = findRandomEntry(prepositions);
  let randomEnding = findRandomEntry(endings);
  currentSuggestion = (randomAdjective + " " + randomAgent + " " + randomVerb + " " + randomPreposition + " " + randomEnding);
  speak(currentSuggestion);
  boxWrite(currentSuggestion + '  \n (If you would like to hear this again, say "Could you repeat that?")')
}

//findRandomEntry()
//
//Simple function to find a random entry in any array and then return the result
function findRandomEntry(array) {
  let x = array[Math.floor(Math.random() * array.length)]
  return x;
}

//endGame()
//
//Function to show the endgame result.
function endGame() {
  dingSFX.play();
  speak(lineEndGame);
  boxWrite(boxTextEndGame);
  gameState = 20;
}

//boxWrite()
//
//function to write text into the dialogue box (just to keep code cleaner)
function boxWrite(entry) {
  $('#textboxText').text(entry);
}
//addCurrentTitle())
//
//function to add accepted titles into the list.
function addCurrentTitle() {
  $(".flex-container").append("<div>- " + currentSuggestion + "</div>");
}

//generateRemainingTitles()
//
//Function that does what it says - basically fills in any titles the player hasn't filled in yet.
function generateRemainingTitles() {
  for (let i = 0; i < (3 - acceptedTitleAmount); i++) {
    suggestion();
    addCurrentTitle();
  }
}

//setPortrait()
//
//simple function that sets portrait of AI based on parameters given
function setPortrait(emotion) {
  document.getElementById("portrait").src = "assets/images/" + emotion + ".PNG";
}
