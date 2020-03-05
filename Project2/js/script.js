"use strict";

/********************************************************************

"The Children's Entertainment Automated Monitoring Bureau"
by Martin Hanses




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
//function to create a full sentence by picking entries from a number of arrays, speak the entry, and enter it as text
function suggestion() {
  let randomAdjective = findRandomEntry(adjectives);
  let randomAgent = findRandomEntry(agents);
  let randomVerb = findRandomEntry(verbs);
  let randomPreposition = findRandomEntry(prepositions);
  let randomEnding = findRandomEntry(endings);
  currentSuggestion = (randomAdjective + " " + randomAgent + " " + randomVerb + " " + randomPreposition + " " + randomEnding);
  speak(currentSuggestion);
  $('#textboxText').text(currentSuggestion);
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
