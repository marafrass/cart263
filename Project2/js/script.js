"use strict";

/********************************************************************

"The Children's Entertainment Automated Monitoring Bureau"
by Martin Hanses



This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/
//run setup when document has loaded
$(document).ready(setup);

//variable to track which state the game is in
let gameState = 0;
//globabl variables for speech and text, as well as tracking values for what the player has accepted/refused
let adjectiveInQuestion = "";
let currentSuggestion = "";
let acceptedTitleAmount = 0;
let rejectedTitleAmount = 0;


function setup() {

  

  if (annyang) {

    var commands = {
      'start game': function() {
        if (gameState === 0) {
          setPortrait("question");
          speak(computerLines[1]);
          boxWrite('Say "My name is..."!');
          setTimeout(function() {
            gameState += 1;
          }, 200);
        }

      },

      'my name is *tag': function(tag) {
        if (gameState === 1) {
          setPortrait("elated");
          gameState += 1;
          speak(("Nice to meet you, " + tag + "! Shall we get started with today's video titles?"));
          boxWrite('Be polite! "My name is..."');
        }

      },

      'yes please': function() {
        if (gameState == 2) {
          setPortrait("question");
          speak(computerLines[2]);
          suggestion();
          speak(computerLines[4]);
          gameState += 1;
        }
      },

      'could you repeat that': function() {
        if (gameState == 3) {
          setPortrait("veryHappy");
          speak("Sure thing!");
          speak(currentSuggestion);
          speak("So? Good or bad?");
        }
      },

      'Good': function() {
        if (gameState === 3) {
          if (acceptedTitleAmount < 3) {
            setPortrait("elated");
            speak(computerLines[3]);
            addCurrentTitle();
            acceptedTitleAmount += 1;
            gameState = 2;
            if (acceptedTitleAmount === 3) {
              endGame();
            } else {
              speak(computerLines[0]);

            }
          } else {
            //failsafe function in case game bugs out and lets the player pick another option.
            speak(computerLines[5]);
            endGame();
          }
        }
      },

      'Bad': function() {
        if (gameState === 3) {
          setPortrait("quiz");
          speak(computerLines[6])
          boxWrite('Say "it is..."');
          gameState = 11;
        };

      },
      'it is *tag': function(tag) {
        if (gameState === 11) {
          adjectiveInQuestion = tag;
          setPortrait("neutral");
          speak("Well, I think children would enjoy something " + tag + ". Do you agree?")
          boxWrite('Answer "yes" or "no"!');
          setTimeout(function() {
            gameState += 1;
          }, 200);
        }
      },

      'no': function() {
        if (rejectedTitleAmount >= 3) {
          speak(computerLines[7])
          generateRemainingTitles();
          endGame();
        } else if (gameState === 12 && rejectedTitleAmount < 3) {
          setPortrait("annoyed");
          speak(computerLines[8])
          boxWrite('Be polite! "My name is..."');
          rejectedTitleAmount += 1;
          setTimeout(function() {
            gameState = 2;
          }, 500);
        }
      },
      'yes': function() {
        if (gameState === 12) {
          setPortrait("veryHappy");
          speak(("I thought so too. I would love it if someone called me " + adjectiveInQuestion + ". I will add this title to our list. Would you like to hear my next suggestion?"))
          boxWrite('Be polite! "My name is..."');
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
  speak(computerLines[9]);
  $('#textboxText').text('Thanks for your help!');
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
